'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobPosition, getAllJobs } from "@/lib/data/jobs";
import Link from "next/link";

interface RelatedJobsProps {
  currentJob: JobPosition;
  locale: 'en' | 'br';
}

export function RelatedJobs({ currentJob, locale }: RelatedJobsProps) {
  const allJobs = getAllJobs();
  
  // Get related jobs from same department, excluding current job
  const relatedJobs = allJobs
    .filter(job => 
      job.id !== currentJob.id && 
      job.department[locale] === currentJob.department[locale]
    )
    .slice(0, 3);

  // If no jobs from same department, get other featured jobs
  if (relatedJobs.length === 0) {
    relatedJobs.push(
      ...allJobs
        .filter(job => job.id !== currentJob.id && job.featured)
        .slice(0, 3)
    );
  }

  // If still no jobs, get any other jobs
  if (relatedJobs.length === 0) {
    relatedJobs.push(
      ...allJobs
        .filter(job => job.id !== currentJob.id)
        .slice(0, 3)
    );
  }

  if (relatedJobs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {locale === 'br' ? 'Outras Vagas' : 'Other Opportunities'}
      </h2>
      
      <div className="grid gap-6">
        {relatedJobs.map((job) => (
          <Card key={job.id} className="p-6 hover:bg-neutral-800/20 transition-colors">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{job.department[locale]}</Badge>
                <Badge variant="outline">{job.location[locale]}</Badge>
                {job.featured && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {locale === 'br' ? 'Destaque' : 'Featured'}
                  </Badge>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{job.title[locale]}</h3>
                <p className="text-gray-400 line-clamp-2">{job.description[locale]}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="text-sm text-gray-400">
                  <span className="text-white font-medium">{job.salary[locale]}</span>
                  <span className="mx-2">•</span>
                  <span>{job.experience[locale]}</span>
                </div>
                
                <Button asChild variant="outline">
                  <Link href={`/${locale}/careers/${job.slug}`}>
                    {locale === 'br' ? 'Ver Detalhes' : 'View Details'}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href={`/${locale}/careers`}>
            {locale === 'br' ? 'Ver Todas as Vagas' : 'View All Jobs'}
          </Link>
        </Button>
      </div>
    </div>
  );
}