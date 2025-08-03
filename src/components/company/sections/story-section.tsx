'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";
import { Meteors } from "@/components/magicui/meteors";
import { Calendar, TrendingUp, Users, Globe } from "lucide-react";

export function StorySection() {
  const t = useTranslations("company");

  const milestones = [
    {
      icon: Calendar,
      title: "2020",
      description: "Fundação",
      detail: "Início da jornada"
    },
    {
      icon: Users,
      title: "500+",
      description: "Clientes",
      detail: "Empresas transformadas"
    },
    {
      icon: TrendingUp,
      title: "R$ 2B+",
      description: "Valor Gerado",
      detail: "Em 5 anos de operação"
    },
    {
      icon: Globe,
      title: "15+",
      description: "Países",
      detail: "Presença global"
    }
  ];

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24 relative">
      <Particles className="absolute inset-0 opacity-30" />
      
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
          <TextAnimate animation="slideUp">
            {t("storyTitle")}
          </TextAnimate>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2} as="span">
            {t("storySubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="text-lg sm:text-xl text-foreground leading-relaxed">
            <TextAnimate animation="blurIn" delay={0.3}>
              {t("storyContent")}
            </TextAnimate>
          </div>
          
          <Card className="bg-card border-border p-6 relative overflow-hidden">
            <Meteors number={3} />
            <div className="text-lg sm:text-xl font-semibold text-foreground relative z-10">
              <TextAnimate animation="slideLeft" delay={0.4}>
                {t("storyHighlight")}
              </TextAnimate>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <Card key={index} className="bg-card border-border p-4 text-center group hover:bg-accent/50 transition-colors">
                <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-lg font-bold text-foreground">{milestone.title}</div>
                <div className="text-xs text-primary font-medium">{milestone.description}</div>
                <div className="text-xs text-muted-foreground mt-1">{milestone.detail}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}