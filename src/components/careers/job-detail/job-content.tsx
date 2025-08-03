import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobPosition } from "@/lib/data/jobs";

interface JobContentProps {
  job: JobPosition;
  locale: 'en' | 'br';
}

export function JobContent({ job, locale }: JobContentProps) {
  const sections = [
    {
      title: locale === 'br' ? 'Responsabilidades' : 'Responsibilities',
      items: job.responsibilities[locale],
      icon: '🎯'
    },
    {
      title: locale === 'br' ? 'Requisitos' : 'Requirements',
      items: job.requirements[locale],
      icon: '✅'
    },
    {
      title: locale === 'br' ? 'Benefícios' : 'Benefits',
      items: job.benefits[locale],
      icon: '🎁'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Skills */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span>🛠️</span>
          {locale === 'br' ? 'Habilidades Técnicas' : 'Technical Skills'}
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.skills[locale].map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Main Sections */}
      {sections.map((section, index) => (
        <Card key={index} className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>{section.icon}</span>
            {section.title}
          </h2>
          <ul className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-3">
                <span className="text-primary mt-1.5 text-sm">•</span>
                <span className="text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}

      {/* Application Deadline */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <div>
            <h3 className="font-semibold text-primary">
              {locale === 'br' ? 'Prazo para Candidatura' : 'Application Deadline'}
            </h3>
            <p className="text-gray-300">
              {new Date(job.applicationDeadline).toLocaleDateString(
                locale === 'br' ? 'pt-BR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}