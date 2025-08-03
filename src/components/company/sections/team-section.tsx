'use client';

import { useTranslations } from "next-intl";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function TeamSection() {
  const t = useTranslations("company");

  const team = [
    "ceo",
    "cto", 
    "coo"
  ] as const;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-500/20 to-purple-500/20",
      "from-green-500/20 to-blue-500/20", 
      "from-purple-500/20 to-pink-500/20"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="w-full max-w-7xl mt-16 sm:mt-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <TextAnimate animation="slideUp">
            {t("teamTitle")}
          </TextAnimate>
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          <TextAnimate animation="blurIn" delay={0.2}>
            {t("teamSubtitle")}
          </TextAnimate>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {team.map((member, index) => {
          const name = t(`team.${member}.name`);
          const initials = getInitials(name);
          
          return (
            <Card 
              key={member}
              className="p-6 sm:p-8 text-center bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 mb-4 group-hover:scale-105 transition-transform">
                  <AvatarFallback className={`text-xl sm:text-2xl font-bold bg-gradient-to-br ${getGradient(index)} text-white border-2 border-primary/20`}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  <TextAnimate animation="slideUp" delay={0.1 * (index + 1)}>
                    {name}
                  </TextAnimate>
                </h3>
                
                <div className="text-primary font-medium mb-2">
                  <TextAnimate animation="blurIn" delay={0.2 * (index + 1)}>
                    {t(`team.${member}.role`)}
                  </TextAnimate>
                </div>
                
                <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                  <TextAnimate animation="slideLeft" delay={0.3 * (index + 1)}>
                    {t(`team.${member}.experience`)}
                  </TextAnimate>
                </Badge>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  <TextAnimate animation="blurIn" delay={0.4 * (index + 1)}>
                    {t(`team.${member}.bio`)}
                  </TextAnimate>
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}