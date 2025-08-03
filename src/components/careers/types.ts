import { ComponentType } from "react";

export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface CompanyValue {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface CareersPageProps {
  locale: string;
}

export interface JobCardProps {
  position: JobPosition;
  onApply?: (position: JobPosition) => void;
  onLearnMore?: (position: JobPosition) => void;
}

export interface ValueCardProps {
  value: CompanyValue;
  index: number;
}