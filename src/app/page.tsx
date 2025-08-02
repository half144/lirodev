import { Meteors } from "@/components/magicui/meteors";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { TextAnimate } from "@/components/magicui/text-animate";
import Image from "next/image";

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

const features = [
  {
    Icon: CodeIcon,
    name: "Custom Development",
    description:
      "Tailored software solutions built from the ground up to meet your exact business needs.",
    href: "/",
    cta: "Get Started",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: RocketIcon,
    name: "Rapid Deployment",
    description:
      "Fast, reliable deployment pipeline that gets your software live in record time.",
    href: "/",
    cta: "Learn How",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GearIcon,
    name: "System Integration",
    description:
      "Seamlessly connect your existing tools and platforms for maximum efficiency.",
    href: "/",
    cta: "Explore",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LightningBoltIcon,
    name: "Performance Optimization",
    description:
      "Supercharge your applications with advanced optimization techniques.",
    href: "/",
    cta: "Optimize Now",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: MobileIcon,
    name: "Cross-Platform Apps",
    description:
      "Build once, deploy everywhere. Native performance across all devices and platforms.",
    href: "/",
    cta: "Start Building",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen pt-12 gap-8">
      <Meteors />
      <div className="bg-white text-sm rounded-full font-bold p-0.5 flex items-center gap-2 pr-3">
        <div className="bg-lime-300 rounded-full p-1 px-2 text-black">
          Software
        </div>
        <div className="text-black">Let the hard work be done for you</div>
      </div>
      <section className="flex flex-col items-center gap-10">
        <div className="max-w-3xl">
          <SparklesText className="text-7xl text-center font-bold font-sans">
            Deliver Your Software with Confidence
          </SparklesText>
        </div>
        <div className="text-center text-lg font-sans max-w-xl text-gray-400">
          <TextAnimate animation="blurIn" as="p">
            Effortlessly build for your business, because we know how to build
            software.
          </TextAnimate>
        </div>
        <div>
          <button className="bg-lime-300 text-black font-bold px-8 py-3 rounded-full">
            Contact Us - Make it happen
          </button>
        </div>
      </section>

      <div className="max-w-screen-lg mt-20">
        <BentoDemo />
      </div>

      <div className="mt-32">
        <div className="relative">
          <Particles className="absolute inset-0" />
          <SystemMarquee className="relative z-10" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
