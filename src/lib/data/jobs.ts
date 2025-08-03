import { ComponentType } from "react";

export interface JobPosition {
  id: string;
  slug: string;
  title: {
    en: string;
    br: string;
  };
  department: {
    en: string;
    br: string;
  };
  location: {
    en: string;
    br: string;
  };
  type: {
    en: string;
    br: string;
  };
  salary: {
    en: string;
    br: string;
  };
  experience: {
    en: string;
    br: string;
  };
  description: {
    en: string;
    br: string;
  };
  responsibilities: {
    en: string[];
    br: string[];
  };
  requirements: {
    en: string[];
    br: string[];
  };
  benefits: {
    en: string[];
    br: string[];
  };
  skills: {
    en: string[];
    br: string[];
  };
  posted: string; // ISO date string
  applicationDeadline: string; // ISO date string
  featured: boolean;
  remote: boolean;
}

export const mockJobPositions: JobPosition[] = [
  {
    id: "1",
    slug: "senior-full-stack-developer",
    title: {
      en: "Senior Full Stack Developer",
      br: "Desenvolvedor Full Stack Sênior",
    },
    department: {
      en: "Development",
      br: "Desenvolvimento",
    },
    location: {
      en: "Remote",
      br: "Remoto",
    },
    type: {
      en: "Full Time",
      br: "Tempo Integral",
    },
    salary: {
      en: "$80,000 - $120,000",
      br: "R$ 15.000 - R$ 22.000",
    },
    experience: {
      en: "5+ years",
      br: "5+ anos",
    },
    description: {
      en: "We're looking for an experienced full stack developer to lead the development of complex enterprise solutions. You'll work with modern technologies and have autonomy to propose architectural improvements.",
      br: "Procuramos um desenvolvedor full stack experiente para liderar o desenvolvimento de soluções enterprise complexas. Você trabalhará com tecnologias modernas e terá autonomia para propor melhorias arquiteturais.",
    },
    responsibilities: {
      en: [
        "Lead development of scalable web applications using React and Node.js",
        "Design and implement RESTful APIs and microservices architecture",
        "Collaborate with product and design teams to deliver high-quality features",
        "Mentor junior developers and conduct code reviews",
        "Optimize application performance and ensure security best practices",
        "Participate in technical decision-making and architecture discussions",
      ],
      br: [
        "Liderar o desenvolvimento de aplicações web escaláveis usando React e Node.js",
        "Projetar e implementar APIs RESTful e arquitetura de microsserviços",
        "Colaborar com equipes de produto e design para entregar funcionalidades de alta qualidade",
        "Mentorar desenvolvedores júnior e conduzir revisões de código",
        "Otimizar performance de aplicações e garantir boas práticas de segurança",
        "Participar de decisões técnicas e discussões de arquitetura",
      ],
    },
    requirements: {
      en: [
        "5+ years of experience with React, Next.js and Node.js",
        "Strong experience with TypeScript and relational databases",
        "Knowledge of Docker, CI/CD and microservices architecture",
        "Experience with automated testing and agile methodologies",
        "Excellent problem-solving and communication skills",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
      ],
      br: [
        "5+ anos de experiência com React, Next.js e Node.js",
        "Experiência sólida com TypeScript e bancos de dados relacionais",
        "Conhecimento em Docker, CI/CD e arquitetura de microsserviços",
        "Experiência com testes automatizados e metodologias ágeis",
        "Excelentes habilidades de resolução de problemas e comunicação",
        "Experiência com plataformas cloud (AWS, Azure ou GCP)",
      ],
    },
    benefits: {
      en: [
        "Remote or hybrid work",
        "Health and dental insurance",
        "Flexible hours",
        "Career plan and development",
        "Annual bonus",
        "Learning budget",
        "Top-tier equipment",
      ],
      br: [
        "Trabalho remoto ou híbrido",
        "Plano de saúde e odontológico",
        "Horários flexíveis",
        "Plano de carreira e desenvolvimento",
        "Bônus anual",
        "Orçamento para aprendizado",
        "Equipamento de primeira linha",
      ],
    },
    skills: {
      en: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Git",
        "Jest",
        "Agile",
      ],
      br: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Git",
        "Jest",
        "Agile",
      ],
    },
    posted: "2025-01-15",
    applicationDeadline: "2025-03-15",
    featured: true,
    remote: true,
  },
  {
    id: "2",
    slug: "devops-engineer",
    title: {
      en: "DevOps Engineer",
      br: "Engenheiro DevOps",
    },
    department: {
      en: "Infrastructure",
      br: "Infraestrutura",
    },
    location: {
      en: "Remote",
      br: "Remoto",
    },
    type: {
      en: "Full Time",
      br: "Tempo Integral",
    },
    salary: {
      en: "$75,000 - $110,000",
      br: "R$ 14.000 - R$ 20.000",
    },
    experience: {
      en: "4+ years",
      br: "4+ anos",
    },
    description: {
      en: "We're seeking a DevOps engineer to optimize our infrastructure and deployment processes. You'll be responsible for implementing automation and monitoring solutions in cloud environments.",
      br: "Buscamos um engenheiro DevOps para otimizar nossa infraestrutura e processos de deploy. Você será responsável por implementar soluções de automação e monitoramento em ambientes cloud.",
    },
    responsibilities: {
      en: [
        "Design and maintain CI/CD pipelines for multiple applications",
        "Manage cloud infrastructure using Infrastructure as Code",
        "Implement monitoring, logging, and alerting systems",
        "Automate deployment processes and reduce manual interventions",
        "Ensure security compliance across all environments",
        "Collaborate with development teams to optimize application performance",
      ],
      br: [
        "Projetar e manter pipelines CI/CD para múltiplas aplicações",
        "Gerenciar infraestrutura cloud usando Infrastructure as Code",
        "Implementar sistemas de monitoramento, logging e alertas",
        "Automatizar processos de deploy e reduzir intervenções manuais",
        "Garantir conformidade de segurança em todos os ambientes",
        "Colaborar com equipes de desenvolvimento para otimizar performance",
      ],
    },
    requirements: {
      en: [
        "Experience with AWS, Azure or Google Cloud Platform",
        "Proficiency in Terraform, Kubernetes and Docker",
        "Knowledge of CI/CD pipelines and GitOps",
        "Experience with monitoring and observability",
        "Strong scripting skills (Python, Bash, or Go)",
        "Understanding of security best practices",
      ],
      br: [
        "Experiência com AWS, Azure ou Google Cloud Platform",
        "Domínio de Terraform, Kubernetes e Docker",
        "Conhecimento em pipelines CI/CD e GitOps",
        "Experiência com monitoramento e observabilidade",
        "Habilidades sólidas em scripting (Python, Bash ou Go)",
        "Entendimento de boas práticas de segurança",
      ],
    },
    benefits: {
      en: [
        "Remote or hybrid work",
        "Health and dental insurance",
        "Flexible hours",
        "Career plan and development",
        "Certification budget",
        "Conference attendance",
      ],
      br: [
        "Trabalho remoto ou híbrido",
        "Plano de saúde e odontológico",
        "Horários flexíveis",
        "Plano de carreira e desenvolvimento",
        "Orçamento para certificações",
        "Participação em conferências",
      ],
    },
    skills: {
      en: [
        "AWS",
        "Terraform",
        "Kubernetes",
        "Docker",
        "CI/CD",
        "Python",
        "Monitoring",
        "Security",
        "GitOps",
      ],
      br: [
        "AWS",
        "Terraform",
        "Kubernetes",
        "Docker",
        "CI/CD",
        "Python",
        "Monitoramento",
        "Segurança",
        "GitOps",
      ],
    },
    posted: "2025-01-10",
    applicationDeadline: "2025-03-10",
    featured: false,
    remote: true,
  },
  {
    id: "3",
    slug: "product-manager",
    title: {
      en: "Product Manager",
      br: "Gerente de Produto",
    },
    department: {
      en: "Product",
      br: "Produto",
    },
    location: {
      en: "Hybrid",
      br: "Híbrido",
    },
    type: {
      en: "Full Time",
      br: "Tempo Integral",
    },
    salary: {
      en: "$90,000 - $130,000",
      br: "R$ 16.000 - R$ 24.000",
    },
    experience: {
      en: "3+ years",
      br: "3+ anos",
    },
    description: {
      en: "We're looking for a strategic product manager to lead enterprise product development. You'll be responsible for defining roadmaps, working with stakeholders and ensuring value delivery.",
      br: "Procuramos um gerente de produto estratégico para liderar o desenvolvimento de produtos enterprise. Você será responsável por definir roadmaps, trabalhar com stakeholders e garantir a entrega de valor.",
    },
    responsibilities: {
      en: [
        "Define product strategy and roadmap for enterprise solutions",
        "Conduct market research and competitive analysis",
        "Collaborate with engineering, design, and sales teams",
        "Gather and prioritize customer requirements",
        "Define and track key product metrics",
        "Lead product launches and go-to-market strategies",
      ],
      br: [
        "Definir estratégia e roadmap de produto para soluções enterprise",
        "Conduzir pesquisa de mercado e análise competitiva",
        "Colaborar com equipes de engenharia, design e vendas",
        "Coletar e priorizar requisitos de clientes",
        "Definir e acompanhar métricas-chave do produto",
        "Liderar lançamentos de produtos e estratégias go-to-market",
      ],
    },
    requirements: {
      en: [
        "3+ years experience in B2B product management",
        "Knowledge of agile methodologies and design thinking",
        "Experience with data analysis and product metrics",
        "Communication and leadership skills",
        "Understanding of enterprise software markets",
        "Experience with product management tools",
      ],
      br: [
        "3+ anos de experiência em gestão de produtos B2B",
        "Conhecimento de metodologias ágeis e design thinking",
        "Experiência com análise de dados e métricas de produto",
        "Habilidades de comunicação e liderança",
        "Entendimento de mercados de software enterprise",
        "Experiência com ferramentas de gestão de produto",
      ],
    },
    benefits: {
      en: [
        "Hybrid work model",
        "Health and dental insurance",
        "Flexible hours",
        "Career plan and development",
        "Stock options",
        "Product conference budget",
      ],
      br: [
        "Modelo de trabalho híbrido",
        "Plano de saúde e odontológico",
        "Horários flexíveis",
        "Plano de carreira e desenvolvimento",
        "Opções de ações",
        "Orçamento para conferências de produto",
      ],
    },
    skills: {
      en: [
        "Product Strategy",
        "Market Research",
        "Data Analysis",
        "Agile",
        "Stakeholder Management",
        "B2B",
        "Roadmapping",
        "User Research",
      ],
      br: [
        "Estratégia de Produto",
        "Pesquisa de Mercado",
        "Análise de Dados",
        "Agile",
        "Gestão de Stakeholders",
        "B2B",
        "Roadmapping",
        "Pesquisa de Usuário",
      ],
    },
    posted: "2025-01-12",
    applicationDeadline: "2025-03-12",
    featured: true,
    remote: false,
  },
];

// Utility functions
export function getJobById(id: string): JobPosition | undefined {
  return mockJobPositions.find((job) => job.id === id);
}

export function getJobBySlug(slug: string): JobPosition | undefined {
  return mockJobPositions.find((job) => job.slug === slug);
}

export function getFeaturedJobs(): JobPosition[] {
  return mockJobPositions.filter((job) => job.featured);
}

export function getJobsByDepartment(
  department: string,
  locale: "en" | "br" = "en"
): JobPosition[] {
  return mockJobPositions.filter(
    (job) => job.department[locale].toLowerCase() === department.toLowerCase()
  );
}

export function getRemoteJobs(): JobPosition[] {
  return mockJobPositions.filter((job) => job.remote);
}

export function getAllJobs(): JobPosition[] {
  return mockJobPositions;
}

const jobsService = {
  getJobById,
  getJobBySlug,
  getFeaturedJobs,
  getJobsByDepartment,
  getRemoteJobs,
  getAllJobs,
};

export default jobsService;
