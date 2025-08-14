'use client';

import { Meteors } from "@/components/magicui/meteors";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useTranslations } from "next-intl";

import {
  CodeIcon,
  RocketIcon,
  LightningBoltIcon,
  GearIcon,
  MobileIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { SystemMarquee } from "@/components/system-marquee";
import { Particles } from "@/components/magicui/particles";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Spotlight } from "@/components/ui/spotlight-new";
import { TextReveal } from "@/components/magicui/text-reveal";

function BentoDemo() {
  const t = useTranslations("features");

  const features = [
    {
      Icon: CodeIcon,
      name: t("customDevelopment.name"),
      description: t("customDevelopment.description"),
      href: "/",
      cta: t("customDevelopment.cta"),
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: RocketIcon,
      name: t("rapidDeployment.name"),
      description: t("rapidDeployment.description"),
      href: "/",
      cta: t("rapidDeployment.cta"),
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GearIcon,
      name: t("systemIntegration.name"),
      description: t("systemIntegration.description"),
      href: "/",
      cta: t("systemIntegration.cta"),
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: LightningBoltIcon,
      name: t("performanceOptimization.name"),
      description: t("performanceOptimization.description"),
      href: "/",
      cta: t("performanceOptimization.cta"),
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: MobileIcon,
      name: t("crossPlatformApps.name"),
      description: t("crossPlatformApps.description"),
      href: "/",
      cta: t("crossPlatformApps.cta"),
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
    },
  ];

  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default function Home() {
  const t = useTranslations("hero");
  const tReveal = useTranslations("textReveal");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center pt-6 sm:pt-12 gap-6 sm:gap-8 px-4">
        <div className="bg-card border border-border text-xs sm:text-sm rounded-full font-bold p-0.5 flex items-center gap-2 pr-2 sm:pr-3 max-w-full">
          <div className="bg-primary rounded-full p-1 px-2 text-primary-foreground whitespace-nowrap">
            {t("badge")}
          </div>
          <div className="text-card-foreground text-center sm:text-left">
            {t("badgeText")}
          </div>
        </div>
        <section className="flex flex-col items-center gap-6 sm:gap-10 w-full">
          <Meteors />
          <div className="max-w-5xl w-full">
            <SparklesText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center font-bold font-sans leading-tight">
              {t("title")}
            </SparklesText>
          </div>
          <div className="text-center text-base sm:text-lg font-sans max-w-xl text-muted-foreground px-4">
            <TextAnimate animation="blurIn" as="p">
              {t("subtitle")}
            </TextAnimate>
          </div>
          <div className="w-full flex justify-center">
            <button className="bg-primary text-primary-foreground font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base whitespace-nowrap">
              {t("cta")}
            </button>
          </div>
        </section>

        <div className="w-full max-w-7xl mt-12 sm:mt-20 px-4">
          <BentoDemo />
        </div>

        <div className="mt-16 sm:mt-32 w-full">
          <div className="relative w-full">
            <Particles className="absolute inset-0" />
            <SystemMarquee />
          </div>
        </div>

        <div className="mt-16 relative sm:mt-32 relative w-full">
          <div className="max-w-screen-lg mx-auto">
            {/* <Meteors className="" /> */}
          </div>
          <TextHoverEffect text="LIRO" />
        </div>
      </main>

      <TextReveal>{tReveal("content")}</TextReveal>

      <Footer />
    </div>
  );
}
