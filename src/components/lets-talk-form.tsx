'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Clock, TrendingUp } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  projectType: z.string().min(1, 'Please select a project type'),
  companySize: z.string().min(1, 'Please select company size'),
  budget: z.string().min(1, 'Please select budget range'),
  timeline: z.string().min(1, 'Please select timeline'),
  message: z.string().min(10, 'Please provide more details about your project'),
});

type FormData = z.infer<typeof formSchema>;

export function LetsTalkForm() {
  const t = useTranslations('LetsTalk');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      companySize: '',
      budget: '',
      timeline: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            {t('form.success')}
          </h3>
          <p className="text-gray-400 mb-6">
            We'll contact you within 24 hours to schedule your strategic assessment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">24h Response</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Zero Risk</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-gray-300">300% ROI</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            {t('form.title')}
          </CardTitle>
          <CardDescription className="text-gray-400 max-w-lg mx-auto">
            {t('form.subtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.fullName.label')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('form.fields.fullName.placeholder')} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.email.label')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={t('form.fields.email.placeholder')} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.phone.label')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('form.fields.phone.placeholder')} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.company.label')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('form.fields.company.placeholder')} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.projectType.label')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.fields.projectType.placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="custom">{t('form.fields.projectType.options.custom')}</SelectItem>
                          <SelectItem value="integration">{t('form.fields.projectType.options.integration')}</SelectItem>
                          <SelectItem value="performance">{t('form.fields.projectType.options.performance')}</SelectItem>
                          <SelectItem value="other">{t('form.fields.projectType.options.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.companySize.label')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.fields.companySize.placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">{t('form.fields.companySize.options.1-10')}</SelectItem>
                          <SelectItem value="11-50">{t('form.fields.companySize.options.11-50')}</SelectItem>
                          <SelectItem value="51-200">{t('form.fields.companySize.options.51-200')}</SelectItem>
                          <SelectItem value="201-1000">{t('form.fields.companySize.options.201-1000')}</SelectItem>
                          <SelectItem value="1000+">{t('form.fields.companySize.options.1000+')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.budget.label')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.fields.budget.placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10k-50k">{t('form.fields.budget.options.10k-50k')}</SelectItem>
                          <SelectItem value="50k-100k">{t('form.fields.budget.options.50k-100k')}</SelectItem>
                          <SelectItem value="100k-250k">{t('form.fields.budget.options.100k-250k')}</SelectItem>
                          <SelectItem value="250k+">{t('form.fields.budget.options.250k+')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.timeline.label')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('form.fields.timeline.placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="asap">{t('form.fields.timeline.options.asap')}</SelectItem>
                          <SelectItem value="1-3">{t('form.fields.timeline.options.1-3')}</SelectItem>
                          <SelectItem value="3-6">{t('form.fields.timeline.options.3-6')}</SelectItem>
                          <SelectItem value="6+">{t('form.fields.timeline.options.6+')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Details */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.fields.message.label')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('form.fields.message.placeholder')}
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <Badge variant="secondary" className="mb-3">
            <Shield className="w-4 h-4 mr-2" />
            {t('trustIndicators.guarantee')}
          </Badge>
          <p className="text-sm text-gray-400">
            {t('trustIndicators.guaranteeText')}
          </p>
        </div>
        
        <div className="text-center">
          <Badge variant="secondary" className="mb-3">
            <Clock className="w-4 h-4 mr-2" />
            {t('trustIndicators.response')}
          </Badge>
          <p className="text-sm text-gray-400">
            {t('trustIndicators.responseText')}
          </p>
        </div>
        
        <div className="text-center">
          <Badge variant="secondary" className="mb-3">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t('trustIndicators.results')}
          </Badge>
          <p className="text-sm text-gray-400">
            {t('trustIndicators.resultsText')}
          </p>
        </div>
      </div>
    </div>
  );
}