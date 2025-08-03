'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Particles } from "@/components/magicui/particles";
import { Meteors } from "@/components/magicui/meteors";
import { Card } from "@/components/ui/card";
import { Phone, Calendar, MessageCircle } from "lucide-react";

export function CTASection() {
  const t = useTranslations("company");

  const contactOptions = [
    {
      icon: Phone,
      title: "Quick Call",
      description: "15 min discovery",
      action: "Ligar Agora"
    },
    {
      icon: Calendar,
      title: "Full Consultation",
      description: "60 min deep dive",
      action: "Agendar Demo"
    },
    {
      icon: MessageCircle,
      title: "Message Us",
      description: "Get in touch",
      action: "Enviar Mensagem"
    }
  ];

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-32 mb-16 sm:mb-24 relative">
      <Particles className="absolute inset-0 opacity-40" />
      <Meteors number={5} />
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
        {/* Main CTA */}
        <div className="lg:col-span-3 relative bg-card border-border rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-50" />
          <div className="relative z-10">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                <TextAnimate animation="slideUp">
                  {t("ctaTitle")}
                </TextAnimate>
              </h2>
              
              <p className="text-muted-foreground text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
                <TextAnimate animation="blurIn" delay={0.2}>
                  {t("ctaSubtitle")}
                </TextAnimate>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <ShimmerButton className="text-white text-base sm:text-lg px-8 py-4">
                  <TextAnimate animation="slideUp" delay={0.3}>
                    {t("ctaButton")}
                  </TextAnimate>
                </ShimmerButton>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-border text-foreground hover:bg-accent text-base sm:text-lg px-8 py-4"
                >
                  <TextAnimate animation="slideUp" delay={0.4}>
                    {t("ctaSecondary")}
                  </TextAnimate>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Options Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-center lg:text-left mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              <TextAnimate animation="slideLeft" delay={0.1}>
                Como Prefere Conversar?
              </TextAnimate>
            </h3>
            <p className="text-muted-foreground text-sm">
              <TextAnimate animation="blurIn" delay={0.2}>
                Escolha a melhor forma para você
              </TextAnimate>
            </p>
          </div>

          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card 
                key={index} 
                className="bg-card border-border p-4 hover:bg-accent/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">{option.title}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                  <div className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {option.action}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-primary/20 blur-xl opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-primary/15 blur-2xl opacity-50"></div>
    </section>
  );
}