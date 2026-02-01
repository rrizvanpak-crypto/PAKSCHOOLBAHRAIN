
export type ThemeMode = 'green' | 'red' | 'blue' | 'amber' | 'rose' | 'lavender' | 'teal';
export type AppearanceMode = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';

export interface SchoolData {
  school_name: string;
  phone: string;
  email: string;
  address: string;
  timing: string;
  about_text: string;
  vision: string;
  mission: string;
  about_detailed: string;
  facebook_url: string;
  instagram_url?: string;
  youtube_url?: string;
  whatsapp: string;
  last_updated?: string;
  urgent_message?: string;
  marquee_text?: string;
  // Attendance Links
  attendance_junior?: string;
  attendance_middle?: string;
  attendance_senior?: string;
  attendance_manama?: string;
  admission_procedure?: string;
}

export interface StaffMember {
  name: string;
  username: string;
  password?: string;
  role: string;
}

export interface InternalCircular {
  date: string;
  title: string;
  content: string;
}

export interface CalendarEvent {
  date: string;
  month: string;
  event: string;
  type: 'holiday' | 'exam' | 'event' | 'academic';
}

export interface NewsItem {
  date: string;
  title: string;
  content: string;
  image?: string;
  downloadUrl?: string;
}

export interface PolicyItem {
  id: string;
  title: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface GroundedContent {
  text: string;
  sources: GroundingSource[];
}
