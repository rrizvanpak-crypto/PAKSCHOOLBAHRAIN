
import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SettingsPanel from './components/SettingsPanel';
import LiveChat from './components/LiveChat';
import GlobalBanner from './components/GlobalBanner';
import Home from './pages/Home';
import Policies from './pages/Policies';
import Forms from './pages/Forms';
import Leadership from './pages/Leadership';
import Gallery from './pages/Gallery';
import ParentPortal from './pages/ParentPortal';
import AcademicCalendar from './pages/AcademicCalendar';
import Events from './pages/Events';
import Admission from './pages/Admission';
import { THEME_CONFIG, HEADER_FONT_SIZES } from './constants';

/**
 * STAFF PORTAL COMPONENT
 */
const StaffPortal = () => {
  const { theme, staffUser, setStaffUser, staffMembers, internalCirculars, schoolData } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const styles = THEME_CONFIG[theme];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Authenticate against staff members from the sheet
    setTimeout(() => {
      const foundUser = staffMembers.find(m => 
        m.username.toLowerCase() === username.toLowerCase() && 
        String(m.password) === String(password)
      );

      if (foundUser) {
        setStaffUser({ name: foundUser.name, role: foundUser.role });
      } else {
        setError('Invalid credentials. Please check your username and password.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setStaffUser(null);
  };

  if (staffUser) {
    return (
      <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Staff Portal</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Signed in as: <span className="text-slate-900 dark:text-white font-bold">{staffUser.name} ({staffUser.role})</span></p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold hover:bg-red-50 hover:text-red-600 transition-all text-xs uppercase tracking-widest"
            >
              Sign Out <i className="fas fa-sign-out-alt ml-2"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
               {/* Attendance Section */}
               <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 mb-8">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <i className="fas fa-user-check text-blue-500"></i>
                    Student Attendance Links
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Junior Wing', link: schoolData.attendance_junior, icon: 'fa-child' },
                      { label: 'Middle Wing', link: schoolData.attendance_middle, icon: 'fa-school' },
                      { label: 'Senior Wing', link: schoolData.attendance_senior, icon: 'fa-user-graduate' },
                      { label: 'Manama Wing', link: schoolData.attendance_manama, icon: 'fa-city' }
                    ].map((wing) => (
                      <a 
                        key={wing.label}
                        href={wing.link || '#'} 
                        target={wing.link ? "_blank" : "_self"}
                        className={`p-6 rounded-2xl border-2 border-slate-50 dark:border-slate-800 flex items-center justify-between group transition-all ${wing.link ? 'hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10' : 'opacity-50 cursor-not-allowed'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all`}>
                            <i className={`fas ${wing.icon}`}></i>
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{wing.label}</h3>
                            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Mark Attendance</p>
                          </div>
                        </div>
                        <i className="fas fa-external-link-alt text-slate-300 group-hover:text-blue-500 transition-colors"></i>
                      </a>
                    ))}
                  </div>
                  {!schoolData.attendance_junior && (
                    <p className="mt-4 text-xs text-slate-400 italic">Links are currently being updated in the master sheet.</p>
                  )}
               </div>

               {/* Resources Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center text-xl mb-4">
                      <i className="fas fa-book"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Academic Resources</h3>
                    <p className="text-sm text-slate-500 mb-6">Access lesson plans, syllabus templates, and teacher resources.</p>
                    <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">View Drive</button>
                 </div>
                 <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center text-xl mb-4">
                      <i className="fas fa-id-card"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Payroll & ID</h3>
                    <p className="text-sm text-slate-500 mb-6">Manage your digital staff profile and download salary slips.</p>
                    <button className="text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">Open Portal</button>
                 </div>
               </div>
            </div>

            {/* Sidebar: Internal Circulars */}
            <div className="lg:col-span-4">
               <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl h-full border border-white/5">
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-amber-400">
                    <i className="fas fa-shield-alt"></i>
                    Internal Circulars
                  </h3>
                  <div className="space-y-8">
                    {internalCirculars.length > 0 ? internalCirculars.map((circ, i) => (
                      <div key={i} className="group cursor-pointer border-b border-white/10 pb-6 hover:border-white/30 transition-all">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 block">{circ.date}</span>
                        <h4 className="text-md font-bold text-white group-hover:text-amber-400 transition-colors mb-2">{circ.title}</h4>
                        <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">{circ.content}</p>
                      </div>
                    )) : (
                      <div className="text-center py-20 opacity-20">
                        <i className="fas fa-folder-open text-4xl mb-4"></i>
                        <p className="text-sm">No internal circulars posted.</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 transition-colors duration-500">
      <div className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] shadow-3xl text-center max-w-xl w-full border border-slate-100 dark:border-slate-800">
         <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl mx-auto mb-8 shadow-2xl">
           <i className="fas fa-lock"></i>
         </div>
         <h1 className="text-3xl font-black mb-2 dark:text-white uppercase tracking-tighter">Staff Access</h1>
         <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm font-medium">Use your school-provided credentials to enter the secure portal.</p>
         
         <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <i className="fas fa-user absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                required
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 pl-14 pr-6 py-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
              />
            </div>
            <div className="relative">
              <i className="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                required
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 pl-14 pr-6 py-4 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold mt-2">{error}</p>}
            <button 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-70 mt-4"
            >
              {isLoading ? <i className="fas fa-circle-notch animate-spin"></i> : 'Secure Login'}
            </button>
         </form>
         
         <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           Kingdom of Bahrain • Pakistan School • IT Support
         </p>
      </div>
    </div>
  );
};

/**
 * CONTACT US PAGE
 */
const ContactPage = () => {
  const { theme, schoolData } = useTheme();
  const styles = THEME_CONFIG[theme];
  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">We are here to help you. Reach out to us via phone, email, or visit our campus in Isa Town.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 flex gap-6 items-center">
              <div className={`w-16 h-16 rounded-3xl ${styles.primary} text-white flex items-center justify-center text-2xl shadow-lg`}>
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-slate-400 mb-1">Call Us</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{schoolData.phone}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 flex gap-6 items-center">
              <div className={`w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-2xl shadow-lg`}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-slate-400 mb-1">Email Support</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{schoolData.email}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 flex gap-6 items-center">
              <div className={`w-16 h-16 rounded-3xl bg-orange-500 text-white flex items-center justify-center text-2xl shadow-lg`}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-slate-400 mb-1">Visit Campus</h3>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{schoolData.address}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white dark:border-slate-700 min-h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.082717019803!2d50.54284841452445!3d26.161324398188164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af7968466e3f%3A0x673400537be704a4!2sPakistan%20School%2C%20Bahrain!5e0!3m2!1sen!2sbh!4v1625573428345!5m2!1sen!2sbh" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * RECRUITMENT PAGE
 */
const RecruitmentPage = () => {
  const { theme } = useTheme();
  const styles = THEME_CONFIG[theme];
  return (
    <div className="min-h-screen py-24 px-6 bg-slate-100 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`w-24 h-24 rounded-full ${styles.primary} text-white flex items-center justify-center text-4xl mx-auto mb-10 shadow-2xl`}>
          <i className="fas fa-user-tie"></i>
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Join Our Team</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 font-medium">Become a part of the most prestigious community school in Bahrain. We are always looking for passionate educators and professionals.</p>
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] shadow-2xl text-left border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Current Vacancies</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex justify-between items-center group hover:border-blue-200 transition-all">
               <div>
                 <h4 className="font-bold text-lg dark:text-white">Teaching Staff (Various Subjects)</h4>
                 <p className="text-sm text-slate-400">Isa Town Campus • Full Time</p>
               </div>
               <button className="text-blue-600 font-black text-xs uppercase tracking-widest">Apply Now</button>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex justify-between items-center group hover:border-blue-200 transition-all">
               <div>
                 <h4 className="font-bold text-lg dark:text-white">Administrative Assistant</h4>
                 <p className="text-sm text-slate-400">Manama Wing • Contractual</p>
               </div>
               <button className="text-blue-600 font-black text-xs uppercase tracking-widest">Apply Now</button>
            </div>
          </div>
          <div className="mt-12 p-10 bg-slate-900 rounded-[2.5rem] text-white text-center">
             <h3 className="text-xl font-bold mb-4">Interested in working with us?</h3>
             <p className="text-white/60 mb-8 text-sm">Please send your updated CV and cover letter to our HR department.</p>
             <a href="mailto:careers@pakistanschool.org" className="inline-block bg-white text-slate-900 px-12 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
               Send Your CV
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { theme, fontSize, schoolData } = useTheme();
  const [activeTab, setActiveTab] = useState('intro');
  const styles = THEME_CONFIG[theme];

  const sections = [
    { id: 'intro', label: (schoolData as any).about_detailed_label || 'Introduction', icon: 'fa-info-circle' },
    { id: 'vision', label: (schoolData as any).vision_label || 'Vision', icon: 'fa-eye' },
    { id: 'mission', label: (schoolData as any).mission_label || 'Mission', icon: 'fa-bullseye' }
  ];

  const content = {
    intro: schoolData.about_detailed || "Pakistan School Bahrain history and details are being synchronized from our master records.",
    vision: schoolData.vision || "Our vision statement will appear here once updated in the official sheet.",
    mission: schoolData.mission || "Our mission statement is coming soon. Thank you for your patience."
  };

  const activeLabel = sections.find(s => s.id === activeTab)?.label || activeTab;

  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className={`${styles.primaryText} font-black uppercase tracking-widest text-xs mb-3 block`}>About Us</span>
          <h1 className={`${HEADER_FONT_SIZES[fontSize]} font-black mb-6 uppercase tracking-tighter text-slate-900 dark:text-white leading-none`}>Our Institution</h1>
          
          <div className="flex flex-wrap justify-center gap-3 mt-10 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-[2rem] border border-white dark:border-slate-700 shadow-xl w-fit mx-auto">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === s.id ? `${styles.primary} text-white shadow-lg` : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
              >
                <i className={`fas ${s.icon} opacity-60`}></i>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center gap-5 mb-12">
            <div className={`w-14 h-14 rounded-2xl ${styles.primary} text-white flex items-center justify-center text-2xl shadow-xl`}>
               <i className={`fas ${sections.find(s => s.id === activeTab)?.icon}`}></i>
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">{activeLabel}</h2>
          </div>
          <div className="prose prose-2xl max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line text-lg">
            {content[activeTab as keyof typeof content]}
          </div>
        </div>
      </div>
    </div>
  );
};

const AcademicInfo = () => {
  const { theme, newsItems } = useTheme();
  const [activeTab, setActiveTab] = useState('timing');
  const styles = THEME_CONFIG[theme];

  const getAcademicItem = (keyword: string) => {
    return newsItems.find(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
  };

  const tabs = [
    { id: 'timing', label: 'School Timing', icon: 'fa-clock' },
    { id: 'uniform', label: 'Uniform', icon: 'fa-user-graduate' },
    { id: 'bqa', label: 'BQA Reports', icon: 'fa-medal' }
  ];

  const uniform = getAcademicItem('Uniform');
  const bqa = getAcademicItem('BQA');

  const AcademicSection = ({ title, item, defaultText }: { title: string, item: any, defaultText: string }) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h3 className={`text-3xl font-black text-slate-900 dark:text-white border-l-8 ${styles.primaryBorder} pl-6`}>{title}</h3>
          {item?.downloadUrl && (
            <a href={item.downloadUrl} target="_blank"  rel="noopener noreferrer" className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-100 transition-all shadow-sm">
              <i className="fas fa-file-pdf"></i> Download PDF
            </a>
          )}
        </div>
        
        {item ? (
          <div>
            {item.image && (
              <div className="relative group overflow-hidden rounded-[2.5rem] mb-8 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shadow-inner flex justify-center items-center p-4">
                <img src={item.image} alt={title} className="max-w-full h-auto object-contain max-h-[800px] group-hover:scale-[1.01] transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <a href={item.image} target="_blank"  rel="noopener noreferrer" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-sm shadow-2xl hover:scale-110 transition-transform">
                     <i className="fas fa-expand mr-2"></i> Open Full Image
                   </a>
                </div>
              </div>
            )}
            {item.content && (
              <div className="prose max-w-none text-slate-600 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line">
                {item.content}
              </div>
            )}
            {!item.image && !item.content && (
              <div className="p-20 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                <i className="fas fa-info-circle text-5xl text-slate-200 dark:text-slate-700 mb-6"></i>
                <p className="text-slate-400 dark:text-slate-500 text-lg font-medium">{defaultText}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-20 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
             <i className="fas fa-info-circle text-5xl text-slate-200 dark:text-slate-700 mb-6"></i>
             <p className="text-slate-400 dark:text-slate-500 text-lg font-medium">{defaultText}</p>
          </div>
        )}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen py-24 px-6 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter text-slate-900 dark:text-white">Academic Portal</h1>
          <div className="flex flex-wrap justify-center gap-3 mt-10 p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-[2.5rem] border border-white dark:border-slate-700 shadow-xl w-fit mx-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] font-bold text-sm transition-all duration-300 ${activeTab === tab.id ? `${styles.primary} text-white shadow-lg` : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
              >
                <i className={`fas ${tab.icon}`}></i> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'timing' && <AcademicSection title="School Timing" item={null} defaultText="Regular Hours: 07:30 AM - 01:50 PM. KG Wing: 07:45 AM - 12:30 PM." />}
          {activeTab === 'uniform' && <AcademicSection title="Uniform" item={uniform} defaultText="Standard PSB uniform is mandatory for all students." />}
          {activeTab === 'bqa' && <AcademicSection title="BQA Reports" item={bqa} defaultText="Latest Bahrain Quality Assurance reports are updated periodically." />}
        </div>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showGlobalBanner, setShowGlobalBanner] = useState(true);

  const renderPage = () => {
    switch(currentPage) {
      case 'intro': 
      case 'vision':
      case 'mission':
      case 'about': return <AboutPage />;
      case 'policies': return <Policies />;
      case 'forms': return <Forms />;
      case 'leadership': return <Leadership />;
      case 'gallery': return <Gallery />;
      case 'portal': return <ParentPortal />;
      case 'calendar': return <AcademicCalendar />;
      case 'events': return <Events />;
      case 'staff': return <StaffPortal />;
      case 'academic': return <AcademicInfo />;
      case 'admission': return <Admission />;
      case 'contact': return <ContactPage />;
      case 'recruitment': return <RecruitmentPage />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen">
      {showGlobalBanner && <GlobalBanner onClose={() => setShowGlobalBanner(false)} />}
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <SettingsPanel />
      <LiveChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
};

export default App;
