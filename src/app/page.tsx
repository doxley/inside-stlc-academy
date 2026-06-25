import Link from 'next/link';
import { BookOpen, Award, Users } from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { CourseCard } from '@/components/marketing/CourseCard';

const courses = [
  {
    title: 'AI for QA Testers',
    badge: 'New',
    description:
      'Learn how to use AI tools professionally across test design, documentation, automation support, defect analysis, and QA workflows.',
    price: '£99',
    href: '/course/ai-for-qa-testers',
    cta: 'View Course',
  },
  {
    title: 'QA Interview Accelerator',
    badge: 'Career',
    description:
      'Prepare for QA interviews with real questions, model answer structures, CV guidance, test task preparation and a final interview readiness pack.',
    price: '£49',
    href: '/course/qa-interview-accelerator',
    cta: 'View Course',
  },
];

const modules = [
  'Introduction to Software Testing',
  'Test Design Techniques',
  'Defect Management',
  'Agile & Scrum for Testers',
  'Jira & Test Management',
  'API Testing with Postman',
  'SQL for Testers',
  'Automation Fundamentals',
  'AI for Software Testing',
  'Portfolio Building',
  'CV & LinkedIn Mastery',
  'Interview Mastery & Job Search',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium mb-8">
          Professional Edition
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          90-Day Software Testing<br />
          <span className="text-gold-500">Career Roadmap</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          A structured 12-module training programme to take you from beginner to job-ready QA professional — in just 90 days.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            Enrol Now
          </Link>
          <Link href="/login" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            Log In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '12', label: 'Modules' },
            { value: '90', label: 'Days' },
            { value: '100+', label: 'Resources' },
            { value: 'Certificate', label: 'On Completion' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-gold-500 mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">What You&apos;ll Learn</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          12 professionally designed modules covering everything you need to start your QA career.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((title, i) => (
            <div key={title} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-500/30 text-brand-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-gray-200 font-medium pt-0.5">{title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid sm:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: 'Structured Learning', desc: 'Video lessons, workbooks, and downloadable resources for every module.' },
            { icon: Users, title: 'Expert Feedback', desc: 'Submit assignments and receive personalised feedback from your tutor.' },
            { icon: Award, title: 'Certificate', desc: 'Earn a professional certificate upon completing all modules and assessments.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Our Courses</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Professional, practical training designed to advance your QA career.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start your QA career?</h2>
        <p className="text-gray-400 mb-8">Join Inside STLC Academy and transform your career in 90 days.</p>
        <Link href="/register" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-block">
          Get Started Today
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
