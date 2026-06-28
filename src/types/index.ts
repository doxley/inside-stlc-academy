export type UserRole = 'student' | 'admin' | 'tutor';

export type CourseStatus = 'draft' | 'published';
export type ModuleStatus = 'draft' | 'published' | 'coming_soon';
export type EnrolmentStatus = 'active' | 'suspended' | 'completed';
export type ModuleProgressStatus = 'not_started' | 'in_progress' | 'completed';
export type SubmissionStatus = 'submitted' | 'reviewed' | 'passed' | 'needs_changes';
export type CertificateStatus = 'pending' | 'eligible' | 'issued';

export interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  status: CourseStatus;
  drip_enabled: boolean;
  drip_type: 'none' | 'days_after_enrolment' | 'manual';
  default_module_gap_days: number;
  created_at: string;
  updated_at: string;
}

export interface ModuleUnlock {
  id: string;
  user_id: string;
  module_id: string;
  unlocked_by: string | null;
  unlocked_at: string;
  note: string | null;
}

export interface Module {
  id: string;
  course_id: string;
  module_number: number;
  title: string;
  slug: string;
  description: string | null;
  learning_objectives: string[] | null;
  estimated_duration: string | null;
  // Guided written-lesson content. Courses are practical written programmes;
  // video_url is OPTIONAL and disabled by default — no video renders unless a
  // module has a real video_url value.
  lesson_overview: string | null;
  guided_notes: string | null;
  practical_task: string | null;
  reflection_question: string | null;
  completion_checklist: string[] | null;
  video_url: string | null;
  status: ModuleStatus;
  unlock_day: number;
  created_at: string;
  updated_at: string;
}

export type LessonStatus = 'draft' | 'published';

export interface Lesson {
  id: string;
  module_id: string;
  lesson_number: number;
  title: string;
  estimated_time: string | null;
  lesson_overview: string | null;
  learning_objectives: string[] | null;
  lesson_notes: string | null;
  completion_checklist: string[] | null;
  worked_example: string | null;
  common_mistakes: string | null;
  real_world_tip: string | null;
  exercise: string | null;
  reflection_question: string | null;
  knowledge_check: string | null;
  video_url: string | null;
  status: LessonStatus;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  status: ModuleProgressStatus;
  started_at: string | null;
  completed_at: string | null;
}

export interface Resource {
  id: string;
  course_id: string | null;
  module_id: string | null;
  title: string;
  description: string | null;
  category: string;
  file_url: string;
  file_type: string | null;
  file_size_bytes: number | null;
  visible_to_students: boolean;
  sort_order: number;
  created_at: string;
}

export interface Enrolment {
  id: string;
  user_id: string;
  course_id: string;
  status: EnrolmentStatus;
  enrolled_at: string;
  completed_at: string | null;
}

export interface ModuleProgress {
  id: string;
  user_id: string;
  course_id: string;
  module_id: string;
  status: ModuleProgressStatus;
  started_at: string | null;
  completed_at: string | null;
}

export type SubmissionType = 'file' | 'url';

export interface Assignment {
  id: string;
  module_id: string;
  title: string;
  instructions: string | null;
  required: boolean;
  // 'url' = learner submits a link (e.g. a GitHub repo for the portfolio
  // project) instead of uploading a file.
  submission_type: SubmissionType;
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  file_url: string;
  original_filename: string;
  submission_url: string | null;
  status: SubmissionStatus;
  feedback: string | null;
  reviewed_by: string | null;
  submitted_at: string;
  reviewed_at: string | null;
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  pass_mark: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  sort_order: number;
  quiz_answers: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  passed: boolean;
  attempted_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  status: CertificateStatus;
  issued_at: string | null;
}

export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Payment {
  id: string;
  user_id: string;
  course_id: string | null;
  provider: string;
  provider_payment_id: string | null;
  stripe_session_id: string | null;
  amount: number | null;
  currency: string;
  status: PaymentStatus;
  created_at: string;
}

// Composite types used in the UI
export interface ModuleWithProgress extends Module {
  progress?: ModuleProgress;
  quiz_passed?: boolean;
  assignment_passed?: boolean;
}

export interface DashboardData {
  profile: Profile;
  enrolment: Enrolment;
  course: Course;
  modules: ModuleWithProgress[];
  overall_progress_percent: number;
  current_module: Module | null;
  certificate: Certificate | null;
}
