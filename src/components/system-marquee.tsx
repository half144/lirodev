import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import {
  CodeIcon,
  RocketIcon,
  LightningBoltIcon,
  GearIcon,
  MobileIcon,
  ArchiveIcon,
  LockClosedIcon,
  DesktopIcon,
} from "@radix-ui/react-icons";

const systemCapabilities = [
  {
    icon: CodeIcon,
    name: "Clean Architecture",
    description: "SOLID principles and maintainable code structure",
    metric: "99.9% uptime",
  },
  {
    icon: ArchiveIcon,
    name: "Database Optimization",
    description: "High-performance data layer with smart indexing",
    metric: "< 100ms queries",
  },
  {
    icon: LockClosedIcon,
    name: "Security First",
    description: "Enterprise-grade security and compliance",
    metric: "Zero breaches",
  },
  {
    icon: LightningBoltIcon,
    name: "Performance",
    description: "Optimized for speed and efficiency",
    metric: "< 2s load time",
  },
  {
    icon: DesktopIcon,
    name: "Real-time Monitoring",
    description: "24/7 system health and performance tracking",
    metric: "100% visibility",
  },
  {
    icon: RocketIcon,
    name: "Auto Scaling",
    description: "Elastic infrastructure that grows with demand",
    metric: "10x capacity",
  },
  {
    icon: GearIcon,
    name: "DevOps Pipeline",
    description: "Automated testing, deployment, and rollbacks",
    metric: "5 min deploys",
  },
  {
    icon: MobileIcon,
    name: "Multi-Platform",
    description: "Cross-platform compatibility and responsiveness",
    metric: "All devices",
  },
];

const firstRow = systemCapabilities.slice(0, systemCapabilities.length / 2);
const secondRow = systemCapabilities.slice(systemCapabilities.length / 2);

const SystemCard = ({
  icon: Icon,
  name,
  description,
  metric,
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
  metric: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 sm:w-72 md:w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-6",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 sm:gap-3 mb-3">
        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20 dark:bg-primary/10">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-primary" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <figcaption className="text-sm sm:text-base font-semibold dark:text-white truncate">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-primary dark:text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-full w-fit">
            {metric}
          </p>
        </div>
      </div>
      <blockquote className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {description}
      </blockquote>
    </figure>
  );
};

export function SystemMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden py-6 sm:py-8 px-4",
        className
      )}
    >
      <div className="mb-6 sm:mb-8 text-center max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mb-2">
          System Architecture
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
          Built with industry-leading practices and technologies
        </p>
      </div>

      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((capability) => (
          <SystemCard key={capability.name} {...capability} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:30s] mt-4">
        {secondRow.map((capability) => (
          <SystemCard key={capability.name} {...capability} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
