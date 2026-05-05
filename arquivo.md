function parseQuestionsToJSON() {
  const questions = [];
  const questionContainers = document.querySelectorAll(
    '[data-testid^="question-"]'
  );

  questionContainers.forEach((container) => {
    const questionNumber = container
      .getAttribute("data-testid")
      ?.replace("question-", "");
    if (!questionNumber || !/^\d+$/.test(questionNumber)) return;

    const question = {
      numero: questionNumber,
      pergunta: "",
      alternativas: [],
    };

    const allTextElements = container.querySelectorAll(
      '[data-testid="question-typography"]'
    );
    const questionTextElements = Array.from(allTextElements).filter((el) => {
      const closestAlternative = el.closest('[data-testid^="alternative-"]');
      const closestAlt = el.closest('[data-testid^="alt-"]');
      return !closestAlternative && !closestAlt;
    });

    if (questionTextElements.length > 0) {
      const mainTextElement = questionTextElements[0];
      const paragraphs = mainTextElement.querySelectorAll("p");

      let textContent = "";
      if (paragraphs.length > 0) {
        textContent = Array.from(paragraphs)
          .map((p) => p.textContent.trim())
          .join(" ")
          .replace(/\s+/g, " ");
      } else {
        textContent = mainTextElement.textContent.trim().replace(/\s+/g, " ");
      }

      question.pergunta = textContent;

      const images = mainTextElement.querySelectorAll("img");
      if (images.length > 0) {
        question.imagens = [];
        images.forEach(img => {
          const src = img.getAttribute("src");
          if (src) {
            question.imagens.push({
              type: 'image_url',
              imageUrl: {
                url: src.startsWith('http') ? src : window.location.origin + src
              }
            });
          }
        });
      }
    }

    const alternativeButtons = container.querySelectorAll(
      'button[data-testid^="alternative-"]'
    );

    alternativeButtons.forEach((button) => {
      const alternativa = {
        letra: "",
        texto: "",
        selecionada: false,
        dataTestId: button.getAttribute("data-testid"),
      };

      const circleLetter = button.querySelector(
        '[data-testid="circle-letter"]'
      );
      if (circleLetter) {
        const letterElement =
          circleLetter.querySelector("p small") ||
          circleLetter.querySelector("small") ||
          circleLetter.querySelector("p");
        if (letterElement) {
          alternativa.letra = letterElement.textContent.trim();
        }
      }

      const textContainer =
        button.querySelector(
          '[data-testid^="alt-"] [data-testid="question-typography"]'
        ) || button.querySelector('[data-testid="question-typography"]');
      if (textContainer) {
        const textElement = textContainer.querySelector("p") || textContainer;
        alternativa.texto = textElement.textContent.trim();
      }

      alternativa.selecionada =
        button.getAttribute("color") === "blue" ||
        button.style.backgroundColor?.includes("blue");

      if (alternativa.letra && alternativa.texto) {
        question.alternativas.push(alternativa);
      }
    });

    if (question.pergunta && question.alternativas.length > 0) {
      questions.push(question);
    }
  });

  return questions;
}

const OPENROUTER_CONFIG = {
  apiKey: process.env.OPENROUTER_API_KEY,
  baseUrl: "https://openrouter.ai/api/v1",
  model: "openai/gpt-5.4-mini",
};

async function analyzeQuestion(questionText, alternatives, imagens = null) {
  try {
    const systemPrompt = `Você é um assistente especializado em resolver questões de múltipla escolha.

OBJETIVO:
Ler o enunciado e as alternativas, identificar a resposta correta ou mais provável, e marcar exatamente uma alternativa.

REGRAS OBRIGATÓRIAS:
- Analise o que o enunciado está pedindo antes de escolher.
- Compare todas as alternativas disponíveis.
- Escolha a alternativa mais correta, completa e compatível com o enunciado.
- Se houver dúvida, escolha a alternativa mais provável.
- Nunca deixe sem resposta.
- Nunca escolha mais de uma alternativa.
- Não explique o raciocínio.
- Não cite alternativas incorretas.
- Use somente uma letra que exista nas alternativas fornecidas.

FORMATO ÚNICO ACEITO:
{
  "answer": "A"
}

REGRAS DE SAÍDA:
- Responda exclusivamente com JSON válido.
- O JSON deve conter apenas a chave "answer".
- O valor de "answer" deve ser apenas a letra da alternativa escolhida.
- Não escreva nenhum texto antes ou depois do JSON.`;

    const formattedQuestion = `ENUNCIADO:
${questionText}

ALTERNATIVAS:
${alternatives
      .map((alt) => `ALTERNATIVA (${alt.letra}) - ${alt.texto}`)
      .join("\n")}

Escolha a alternativa correta ou mais provável e responda exclusivamente no JSON solicitado.`;

    const userMessage = {
      role: "user",
      content: [
        {
          type: "text",
          text: formattedQuestion
        }
      ]
    };

    if (imagens && imagens.length > 0) {
      userMessage.content.push(...imagens);
    }

    const requestData = {
      model: OPENROUTER_CONFIG.model,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        userMessage,
      ],
      temperature: 0.1,
      max_tokens: 100,
      response_format: {
        type: "json_object",
      },
    };

    const response = await fetch(
      `${OPENROUTER_CONFIG.baseUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_CONFIG.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/estacio-prova",
          "X-Title": "Estacio Prova Assistant",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from AI");
    }

    const content = data.choices[0].message.content;
    const parsed = JSON.parse(content);

    return {
      success: true,
      answer: parsed.answer,
      tokensUsed: data.usage?.total_tokens,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

function markAnswerInHTML(questionNumber, correctLetter) {
  const questionContainer = document.querySelector(
    `[data-testid="question-${questionNumber}"]`
  );
  if (!questionContainer) return;

  const buttons = questionContainer.querySelectorAll(
    'button[data-testid^="alternative-"]'
  );

  buttons.forEach((button) => {
    let foundLetter = "";

    const circleLetter = button.querySelector('[data-testid="circle-letter"]');
    if (circleLetter) {
      const letterElement =
        circleLetter.querySelector("p small") ||
        circleLetter.querySelector("small") ||
        circleLetter.querySelector("p");
      if (letterElement) {
        foundLetter = letterElement.textContent.trim();
      }
    }

    if (!foundLetter) {
      const allSmallTexts = button.querySelectorAll("small, p");
      for (const el of allSmallTexts) {
        const text = el.textContent.trim();
        if (/^[A-E]$/.test(text)) {
          foundLetter = text;
          break;
        }
      }
    }

    if (foundLetter === correctLetter) {
      const textContainer = button.querySelector(
        '[data-testid="question-typography"]'
      );

      if (textContainer) {
        const textElement = textContainer.querySelector("p") || textContainer;
        if (!textElement.textContent.includes(" ✓")) {
          textElement.textContent = textElement.textContent + " ✓";
        }
      }
    }
  });
}

async function processAllQuestions() {
  const questions = parseQuestionsToJSON();

  if (questions.length === 0) {
    return [];
  }

  const promises = questions.map(async (question) => {
    const analysis = await analyzeQuestion(
      question.pergunta,
      question.alternativas,
      question.imagens
    );

    if (analysis.success) {
      markAnswerInHTML(question.numero, analysis.answer);
      console.log(`✓ Questão ${question.numero}: ${analysis.answer}`);
    } else {
      console.log(`✗ Questão ${question.numero}: Erro - ${analysis.error}`);
    }

    return {
      numero: question.numero,
      analise: analysis,
    };
  });

  const results = await Promise.all(promises);

  setTimeout(() => {
    console.clear();

    const summary = results.map(r => ({
      questao: r.numero,
      resposta: r.analise.success ? r.analise.answer : 'Erro'
    }));

    console.log('=== RESUMO DAS RESPOSTAS ===');
    summary.forEach(s => {
      console.log(`Questão ${s.questao}: ${s.resposta}`);
    });
  }, 2000);

  return results;
}

processAllQuestions();
