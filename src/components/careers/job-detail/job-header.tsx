'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeftIcon, Share1Icon, HeartIcon } from "@radix-ui/react-icons";
import { JobPosition } from "@/lib/data/jobs";
import Link from "next/link";

interface JobHeaderProps {
  job: JobPosition;
  locale: 'en' | 'br';
  onApply: () => void;
  onSave: () => void;
  onShare: () => void;
}

export function JobHeader({ job, locale, onApply, onSave, onShare }: JobHeaderProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'br' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link 
          href={`/${locale}/careers`}
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {locale === 'br' ? 'Voltar para vagas' : 'Back to jobs'}
        </Link>
      </div>

      {/* Main Header */}
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{job.department[locale]}</Badge>
                <Badge variant="outline">{job.location[locale]}</Badge>
                <Badge variant="outline">{job.type[locale]}</Badge>
                {job.featured && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {locale === 'br' ? 'Destaque' : 'Featured'}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {job.title[locale]}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span>
                  <strong className="text-white">{locale === 'br' ? 'Salário:' : 'Salary:'}</strong> {job.salary[locale]}
                </span>
                <span>
                  <strong className="text-white">{locale === 'br' ? 'Experiência:' : 'Experience:'}</strong> {job.experience[locale]}
                </span>
                <span>
                  <strong className="text-white">{locale === 'br' ? 'Publicado em:' : 'Posted:'}</strong> {formatDate(job.posted)}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {job.description[locale]}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={onApply}
            >
              {locale === 'br' ? 'Candidatar-se' : 'Apply Now'}
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1"
                onClick={onSave}
              >
                <HeartIcon className="w-4 h-4 mr-2" />
                {locale === 'br' ? 'Salvar' : 'Save'}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={onShare}
              >
                <Share1Icon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}