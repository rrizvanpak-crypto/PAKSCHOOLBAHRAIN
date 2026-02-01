
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ThemeMode, AppearanceMode, FontSize, SchoolData, CalendarEvent, NewsItem, PolicyItem, FAQItem, StaffMember, InternalCircular } from './types';
import { INITIAL_SCHOOL_DATA, ACADEMIC_CALENDAR_DATA, GALLERY_IMAGES, LEADERSHIP_DATA, FONT_SIZE_MAP } from './constants';
import { fetchMasterData } from './services/sheetService';

interface LeadershipMember {
  name: string;
  role: string;
  message: string;
  image: string;
}

interface LeadershipData {
  chairman: LeadershipMember;
  principal: LeadershipMember;
  board_members: { name: string; role: string; image: string }[];
}

interface ThemeContextType {
  theme: ThemeMode;
  appearance: AppearanceMode;
  fontSize: FontSize;
  schoolData: SchoolData;
  calendarData: CalendarEvent[];
  galleryImages: { url: string; title: string }[];
  leadershipData: LeadershipData;
  newsItems: NewsItem[];
  policies: PolicyItem[];
  faqItems: FAQItem[];
  staffMembers: StaffMember[];
  internalCirculars: InternalCircular[];
  isSheetLoading: boolean;
  staffUser: { name: string; role: string } | null;
  setTheme: (theme: ThemeMode) => void;
  setAppearance: (mode: AppearanceMode) => void;
  setFontSize: (size: FontSize) => void;
  setStaffUser: (user: { name: string; role: string } | null) => void;
  refreshFromSheet: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('green');
  const [appearance, setAppearance] = useState<AppearanceMode>('light');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [schoolData, setSchoolData] = useState<SchoolData>(INITIAL_SCHOOL_DATA);
  const [calendarData, setCalendarData] = useState<CalendarEvent[]>(ACADEMIC_CALENDAR_DATA);
  const [galleryImages, setGalleryImages] = useState<{ url: string; title: string }[]>(GALLERY_IMAGES);
  const [leadershipData, setLeadershipData] = useState<LeadershipData>(LEADERSHIP_DATA);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [internalCirculars, setInternalCirculars] = useState<InternalCircular[]>([]);
  const [isSheetLoading, setIsSheetLoading] = useState(true);
  const [staffUser, setStaffUser] = useState<{ name: string; role: string } | null>(null);

  const refreshFromSheet = async () => {
    setIsSheetLoading(true);
    try {
      const result = await fetchMasterData();
      if (result.settings) setSchoolData(prev => ({ ...prev, ...result.settings }));
      if (result.calendar && result.calendar.length > 0) setCalendarData(result.calendar);
      if (result.gallery && result.gallery.length > 0) setGalleryImages(result.gallery);
      if (result.leadership) setLeadershipData(result.leadership);
      if (result.news) setNewsItems(result.news);
      if (result.policies) setPolicies(result.policies);
      if (result.faq) setFaqItems(result.faq);
      if (result.staff) setStaffMembers(result.staff);
      if (result.internalCirculars) setInternalCirculars(result.internalCirculars);
    } finally {
      setIsSheetLoading(false);
    }
  };

  useEffect(() => {
    refreshFromSheet();
    const savedAppearance = localStorage.getItem('appearance') as AppearanceMode;
    if (savedAppearance) {
      setAppearance(savedAppearance);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setAppearance('dark');
    }
    
    const savedFontSize = localStorage.getItem('fontSize') as FontSize;
    if (savedFontSize) setFontSize(savedFontSize);

    const savedStaff = localStorage.getItem('staffUser');
    if (savedStaff) setStaffUser(JSON.parse(savedStaff));
  }, []);

  useEffect(() => {
    localStorage.setItem('appearance', appearance);
    localStorage.setItem('fontSize', fontSize);
    if (staffUser) localStorage.setItem('staffUser', JSON.stringify(staffUser));
    else localStorage.removeItem('staffUser');
    
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appearance, fontSize, staffUser]);

  const fontSizeClass = FONT_SIZE_MAP[fontSize];

  return (
    <ThemeContext.Provider value={{ 
      theme, setTheme, 
      appearance, setAppearance,
      fontSize, setFontSize, 
      schoolData, calendarData,
      galleryImages, leadershipData,
      newsItems, policies, faqItems,
      staffMembers, internalCirculars,
      isSheetLoading,
      staffUser, setStaffUser,
      refreshFromSheet
    }}>
      <div className={`
        min-h-screen 
        ltr font-inter
        ${fontSizeClass} 
        ${appearance === 'dark' ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} 
        transition-colors duration-500
      `}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
