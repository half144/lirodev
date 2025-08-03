'use client';

import { Footer } from "@/components/footer";
import { JobPosition } from "@/lib/data/jobs";
import { JobHeader } from "./job-header";
import { JobContent } from "./job-content";
import { RelatedJobs } from "./related-jobs";

interface JobDetailViewProps {
  job: JobPosition;
  locale: 'en' | 'br';
}

export function JobDetailView({ job, locale }: JobDetailViewProps) {
  const handleApply = () => {
    // TODO: Implement application logic
    console.log('Apply to job:', job.title[locale]);
    // Could open a modal, redirect to application form, etc.
  };

  const handleSave = () => {
    // TODO: Implement save job logic
    console.log('Save job:', job.title[locale]);
    // Could save to localStorage, user favorites, etc.
  };

  const handleShare = () => {
    // TODO: Implement share logic
    if (navigator.share) {
      navigator.share({
        title: job.title[locale],
        text: job.description[locale],
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <JobHeader 
            job={job}
            locale={locale}
            onApply={handleApply}
            onSave={handleSave}
            onShare={handleShare}
          />
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <JobContent job={job} locale={locale} />
            </div>
            
            <div className="lg:col-span-1">
              <RelatedJobs currentJob={job} locale={locale} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}