
import { SchoolData, CalendarEvent, NewsItem, PolicyItem } from './types';

export const INITIAL_SCHOOL_DATA: SchoolData = {
  school_name: "Pakistan School Bahrain",
  phone: "+973 1768 2212",
  email: "info@pakistanschool.org",
  address: "Block 804, Isa Town, Bahrain",
  timing: "Sun-Thu: 7:30 AM - 2:00 PM",
  about_text: "Pakistan School Bahrain is a leading community school dedicated to excellence.", 
  vision: "To empower students with knowledge and values.",
  mission: "Providing quality education in a multicultural environment.",
  about_detailed: "",
  facebook_url: "https://facebook.com/pakistanschool",
  instagram_url: "https://instagram.com/pakistanschool",
  youtube_url: "https://youtube.com/pakistanschool",
  whatsapp: "97317682212",
  last_updated: "2024",
  urgent_message: "", 
  marquee_text: "Welcome to Pakistan School Bahrain Official Website.",
};

export const FONT_SIZE_MAP = {
  small: 'text-xs md:text-sm',
  medium: 'text-sm md:text-base',
  large: 'text-base md:text-lg'
};

export const LEADERSHIP_DATA = {
  chairman: {
    name: "Mr. Sami ur Rehman",
    role: "Chairman, Board of Management",
    message: "Our vision is to empower our students with knowledge and character.",
    image: "https://i.pravatar.cc/300?u=chairman"
  },
  principal: {
    name: "Prof. Attiq-ur-Rehman",
    role: "Principal",
    message: "Education is not just about academic excellence but about holistic development.",
    image: "https://i.pravatar.cc/300?u=principal"
  },
  board_members: []
};

export const ACADEMIC_CALENDAR_DATA: CalendarEvent[] = [];
export const GALLERY_IMAGES = [];

export const THEME_CONFIG = {
  green: {
    primary: 'bg-[#004d3d]',
    primaryText: 'text-[#004d3d]',
    primaryBorder: 'border-[#004d3d]',
    gradient: 'from-[#004d3d] to-[#006652]',
    button: 'bg-[#004d3d] hover:bg-[#00362b]',
    nav: 'bg-white',
    footer: 'bg-[#002e24]'
  },
  red: {
    primary: 'bg-[#b91c1c]',
    primaryText: 'text-[#b91c1c]',
    primaryBorder: 'border-[#b91c1c]',
    gradient: 'from-[#b91c1c] to-[#dc2626]',
    button: 'bg-[#b91c1c] hover:bg-[#991b1b]',
    nav: 'bg-white',
    footer: 'bg-[#7f1d1d]'
  },
  blue: {
    primary: 'bg-[#0369a1]',
    primaryText: 'text-[#0369a1]',
    primaryBorder: 'border-[#0369a1]',
    gradient: 'from-[#0369a1] to-[#0284c7]',
    button: 'bg-[#0369a1] hover:bg-[#075985]',
    nav: 'bg-white',
    footer: 'bg-[#0c4a6e]'
  },
  amber: {
    primary: 'bg-[#b45309]',
    primaryText: 'text-[#b45309]',
    primaryBorder: 'border-[#b45309]',
    gradient: 'from-[#b45309] to-[#d97706]',
    button: 'bg-[#b45309] hover:bg-[#92400e]',
    nav: 'bg-white',
    footer: 'bg-[#78350f]'
  },
  rose: {
    primary: 'bg-[#be123c]',
    primaryText: 'text-[#be123c]',
    primaryBorder: 'border-[#be123c]',
    gradient: 'from-[#be123c] to-[#e11d48]',
    button: 'bg-[#be123c] hover:bg-[#9f1239]',
    nav: 'bg-white',
    footer: 'bg-[#881337]'
  },
  lavender: {
    primary: 'bg-[#4338ca]',
    primaryText: 'text-[#4338ca]',
    primaryBorder: 'border-[#4338ca]',
    gradient: 'from-[#4338ca] to-[#4f46e5]',
    button: 'bg-[#4338ca] hover:bg-[#3730a3]',
    nav: 'bg-white',
    footer: 'bg-[#312e81]'
  },
  teal: {
    primary: 'bg-[#0f766e]',
    primaryText: 'text-[#0f766e]',
    primaryBorder: 'border-[#0f766e]',
    gradient: 'from-[#0f766e] to-[#0d9488]',
    button: 'bg-[#0f766e] hover:bg-[#115e59]',
    nav: 'bg-white',
    footer: 'bg-[#134e4a]'
  }
};

export const FONT_SIZES = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-xl'
};

export const HEADER_FONT_SIZES = {
  small: 'text-2xl',
  medium: 'text-4xl',
  large: 'text-6xl'
};
