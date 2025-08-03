import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/data/jobs";
import { JobDetailView } from "@/components/careers/job-detail";

interface JobDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobDetailView job={job} locale={locale as 'en' | 'br'} />;
}

export async function generateStaticParams() {
  const jobs = await import("@/lib/data/jobs").then(m => m.getAllJobs());
  
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}