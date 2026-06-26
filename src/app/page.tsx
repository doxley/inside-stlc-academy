import Link from 'next/link';
import {
  Users,
  FileText,
  Briefcase,
  Sparkles,
  Award,
  Target,
  Compass,
  Bot,
  MessagesSquare,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { CourseCard } from '@/components/marketing/CourseCard';
import { ComingSoonCard } from '@/components/marketing/ComingSoonCard';

const stats = [
  { value: '3', label: 'Courses' },
  { value: '20+', label: 'Modules' },
  { value: '100+', label: 'Resources' },
  { value: 'Certificates', label: 'Available' },
];

const courses = [
  {
    title: '90-Day Software Testing Career Roadmap',
    badge: 'Beginner Path',
    description:
      'A structured 12-module programme to take you from beginner to job-ready QA professional.',
    stats: ['12 Modules', '90 Days', 'Certificate'],
    price: '£99',
    href: '/course/90-day-software-testing-career-roadmap',
    enrolSlug: '90-day-software-testing-career-roadmap',
    cta: 'View Course',
  },
  {
    title: 'AI for QA Testers',
    badge: 'New',
    description:
      'Learn how to use AI tools professionally across test design, documentation, automation support, defect analysis, and QA workflows.',
    stats: ['12 Modules', '6 Assignments', 'Portfolio Project'],
    price: '£99',
    href: '/course/ai-for-qa-testers',
    enrolSlug: 'ai-for-qa-testers',
    cta: 'View Course',
  },
  {
    title: 'QA Interview Accelerator',
    badge: 'Career',
    description:
      'Prepare for QA interviews with real questions, answer structures, CV guidance, test task preparation, and a final readiness pack.',
    stats: ['8 Modules', '50+ Questions', 'Certificate'],
    price: '£49',
    href: '/course/qa-interview-accelerator',
    enrolSlug: 'qa-interview-accelerator',
    cta: 'View Course',
  },
];

const comingSoon = [
  { title: 'Modern Test Automation Bootcamp', description: 'Hands-on automation with modern frameworks and real projects.' },
  { title: 'API Testing Masterclass', description: 'Go deep on REST, Postman, contract testing, and API quality.' },
  { title: 'ISTQB Foundation Masterclass', description: 'Structured preparation for the ISTQB Foundation certification.' },
  { title: 'QA Leadership Academy', description: 'Grow into test lead and QA management roles with confidence.' },
  { title: 'Performance Testing Essentials', description: 'Learn load, stress, and performance testing fundamentals.' },
  { title: 'Mobile Testing Essentials', description: 'Master the essentials of testing modern mobile applications.' },
];

const paths = [
  {
    icon: Compass,
    title: 'New to QA',
    course: '90-Day Software Testing Career Roadmap',
    href: '/course/90-day-software-testing-career-roadmap',
    description: 'Start here if you want to learn software testing from the ground up.',
  },
  {
    icon: Bot,
    title: 'Want to Use AI in Testing',
    course: 'AI for QA Testers',
    href: '/course/ai-for-qa-testers',
    description: 'For testers who want to become more productive and future-ready with AI.',
  },
  {
    icon: MessagesSquare,
    title: 'Preparing for Interviews',
    course: 'QA Interview Accelerator',
    href: '/course/qa-interview-accelerator',
    description: 'For learners applying for QA roles and preparing for real interview scenarios.',
  },
];

const whyUs = [
  { icon: Users, title: 'Built by experienced QA professionals' },
  { icon: FileText, title: 'Practical templates and resources' },
  { icon: Briefcase, title: 'Career-focused learning' },
  { icon: Sparkles, title: 'Modern AI-aware testing skills' },
  { icon: Award, title: 'Certificate on completion' },
  { icon: Target, title: 'Designed for real QA work' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Professional QA Training
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Inside <span className="text-gold-500">STLC Academy</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Practical software testing courses for beginners, working testers, and future QA leaders.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#courses"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Explore Courses
          </Link>
          <Link
            href="/login"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-gold-500 mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your QA Learning Path</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Learn through structured written lessons, practical exercises, templates, checklists, and
          portfolio-building tasks — designed for every stage of your QA career.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Coming Soon</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            More QA courses are on the way. Register your interest to be the first to know.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoon.map((c) => (
              <ComingSoonCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Find the Right Path For You</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Not sure where to begin? Pick the path that matches where you are right now.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map(({ icon: Icon, title, course, href, description }) => (
            <div key={title} className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="w-11 h-11 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Recommended course</div>
                <Link href={href} className="text-gold-400 font-semibold text-sm hover:text-gold-500 transition-colors">
                  {course}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Inside STLC Academy */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Inside STLC Academy</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-4 bg-navy-900 border border-white/10 rounded-xl p-5">
                <div className="w-11 h-11 flex-shrink-0 bg-brand-500/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="font-medium text-gray-200">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Building Your QA Career Today</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Choose the course that matches where you are now and start building practical software
          testing skills with Inside STLC Academy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#courses"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Explore Courses
          </Link>
          <Link
            href="/login"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Log In
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
