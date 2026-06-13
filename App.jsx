import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, BookOpen, Wallet, Briefcase, Users, Crown, Send,
  Plus, Trash2, ChevronRight, ChevronLeft, Target, Sparkles, Lock,
  Star, Compass, MessageCircle, IndianRupee, CalendarDays, TrendingUp,
  CheckCircle2, RefreshCw, X, GraduationCap, ArrowRight, Check
} from 'lucide-react';

/* ---------------------------- Static data ---------------------------- */

const GOAL_OPTIONS = [
  'Score better grades', 'Build coding skills', 'Manage time better', 'Beat procrastination',
  'Save money every month', 'Build an emergency fund', 'Start a side hustle',
  'Get an internship', 'Prepare for interviews',
];

const DEGREES = ['B.Tech / B.E.', 'BCA', 'B.Sc', 'B.Com', 'BA', 'M.Tech', 'MBA', 'Diploma', 'Other'];
const YEARS = ['1st year', '2nd year', '3rd year', '4th year', 'Final year'];
const CAREER_INTERESTS = ['Software Engineering', 'Data Science', 'Digital Marketing', 'UI/UX Design', 'Finance & Analytics', 'Content & Media', 'Other'];

const AGENT_META = {
  study: { label: 'Study & Productivity Coach', short: 'Study Coach', color: '#F2A93B', icon: BookOpen, tagline: 'Plans, focus & habits' },
  money: { label: 'Money & Growth Coach', short: 'Money Coach', color: '#2EC4B6', icon: Wallet, tagline: 'Budgets, savings & basics' },
  career: { label: 'Career & Side Hustle Coach', short: 'Career Coach', color: '#FF6B6B', icon: Briefcase, tagline: 'Roadmaps, resumes & gigs' },
};

const STARTERS = {
  study: ['Create a study plan for my exams in 30 days', 'I procrastinate constantly. Help me.', 'How should I manage college and coding practice?'],
  money: ['I receive ₹5000 monthly. Create a budget.', 'Help me save ₹20,000 in 6 months.', 'Where am I overspending?'],
  career: ['How do I become a data scientist?', 'What side hustle can I start with coding skills?', 'How can I earn ₹10,000/month as a student?'],
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'study', label: 'Study', icon: BookOpen },
  { id: 'budget', label: 'Money', icon: Wallet },
  { id: 'career', label: 'Career', icon: Briefcase },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'mentors', label: 'Mentors', icon: Users },
];

const CAT_COLORS = {
  Rent: '#8C7CFA', Food: '#F2A93B', Transport: '#2EC4B6', Subscriptions: '#FF6B6B',
  Entertainment: '#5AC8FA', Savings: '#34D399', Other: '#9AA0C3',
};

const ROLE_ROADMAPS = {
  'Software Engineering': [
    { title: 'Foundations', items: ['Strong DSA basics (arrays, strings, recursion)', 'Pick one language and go deep (Python / Java / C++)', 'Git & GitHub workflow', 'Build 2 small CLI or web projects'] },
    { title: 'Core skills', items: ['DSA practice — 150+ problems', 'Learn a web framework (React / Django / Spring)', 'SQL & basic database design', 'OS & networking basics'] },
    { title: 'Get experience', items: ['Contribute to one open-source project', 'Apply to 10+ internships', 'Portfolio site with 3 projects', 'Mock interviews with peers'] },
    { title: 'Job ready', items: ['System design basics', 'Polish resume & LinkedIn', 'Company-specific interview prep', 'Practice negotiating offers'] },
  ],
  'Data Science': [
    { title: 'Foundations', items: ['Statistics & probability basics', 'Python for data analysis (pandas, numpy)', 'SQL for data querying', 'Data visualisation (matplotlib / seaborn)'] },
    { title: 'Core skills', items: ['Machine learning fundamentals', 'Feature engineering & model evaluation', '3 end-to-end ML projects', 'Version control for notebooks & code'] },
    { title: 'Get experience', items: ['Kaggle competitions or datasets', 'Data internship or research assistantship', 'Build a portfolio with case studies', 'Write up findings clearly'] },
    { title: 'Job ready', items: ['SQL + ML interview practice', 'Resume tailored to data roles', 'Mock case-study interviews', 'Network with DS professionals'] },
  ],
  'Digital Marketing': [
    { title: 'Foundations', items: ['SEO basics', 'Content writing fundamentals', 'Social media platform basics', 'Google Analytics basics'] },
    { title: 'Core skills', items: ['Run a small ad campaign (Meta / Google)', 'Email marketing basics', 'Keyword research tools', 'Canva for creatives'] },
    { title: 'Get experience', items: ['Manage a college club / page', 'Marketing internship', 'Case study of one campaign', 'Build a personal brand on LinkedIn'] },
    { title: 'Job ready', items: ['Certifications (Google, HubSpot)', 'Portfolio of campaigns', 'Interview prep with metrics', 'Freelance gigs on the side'] },
  ],
  'UI/UX Design': [
    { title: 'Foundations', items: ['Design fundamentals (layout, colour, type)', 'Learn Figma', 'User research basics', 'Wireframing & prototyping'] },
    { title: 'Core skills', items: ['Design 3 case studies end-to-end', 'Usability testing basics', 'Design systems basics', 'Accessibility fundamentals'] },
    { title: 'Get experience', items: ['Redesign one real app as practice', 'Design internship or freelance project', 'Build an online portfolio', 'Get feedback from a mentor'] },
    { title: 'Job ready', items: ['Polish portfolio storytelling', 'Practice design critiques', 'Mock interviews', 'Apply to junior design roles'] },
  ],
  'Finance & Analytics': [
    { title: 'Foundations', items: ['Accounting & finance basics', 'Excel for finance', 'Read financial statements', 'Time value of money basics'] },
    { title: 'Core skills', items: ['Financial modelling basics', 'Valuation fundamentals (educational)', 'Data analysis with Excel/SQL', 'Industry research practice'] },
    { title: 'Get experience', items: ['Finance internship or virtual internship', 'Build a sample financial model', 'Join a finance club / case competition', 'Network with professionals'] },
    { title: 'Job ready', items: ['Certifications (NSE/BSE academy etc.)', 'Resume tailored to finance roles', 'Interview prep (technical + behavioural)', 'Mock case interviews'] },
  ],
  'Other': [
    { title: 'Explore', items: ['List 3 fields that genuinely interest you', 'Talk to 2 people working in those fields', 'Try a short online course in each', 'Shortlist one direction'] },
    { title: 'Build skills', items: ['Pick 1-2 core skills for your direction', 'Complete a structured course', 'Practice with small real projects', 'Track progress weekly'] },
    { title: 'Get experience', items: ['Apply for internships or volunteer roles', 'Build a simple portfolio of work', 'Ask for feedback from mentors', 'Join a relevant community'] },
    { title: 'Move forward', items: ['Update resume & LinkedIn', 'Practice interviews', 'Apply consistently every week', 'Reassess and adjust the plan'] },
  ],
};

const MENTORS = [
  { name: 'Aarav Mehta', category: 'Software Engineering', bio: 'SDE-2 at a fintech startup. Mentors on DSA, projects and interview prep.', rating: 4.8, sessions: 120 },
  { name: 'Priya Nair', category: 'Data Science', bio: 'ML engineer with analytics internship experience. Helps with ML roadmaps and portfolio projects.', rating: 4.9, sessions: 95 },
  { name: 'Rohan Verma', category: 'Finance', bio: 'Chartered accountant who guides students on budgeting, savings and finance careers.', rating: 4.7, sessions: 80 },
  { name: 'Sana Iqbal', category: 'Career Guidance', bio: 'Campus placement coordinator. Specialises in resumes, mock interviews and internship search.', rating: 4.9, sessions: 150 },
];

const AFFILIATES = [
  { name: 'Coursera', desc: 'Structured courses & certificates from top universities.', url: 'https://www.coursera.org' },
  { name: 'Udemy', desc: 'Affordable, skill-specific video courses.', url: 'https://www.udemy.com' },
  { name: 'Notion', desc: 'Plan projects, notes and study trackers in one place.', url: 'https://www.notion.so' },
  { name: 'Grammarly', desc: 'Polish resumes, emails and cover letters.', url: 'https://www.grammarly.com' },
  { name: 'Canva', desc: 'Design resumes, portfolios and social posts.', url: 'https://www.canva.com' },
];

const FREE_DAILY_LIMIT = 20;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function systemPrompt(agent, profile) {
  const base = `Student profile — Name: ${profile.name || 'Student'}, Course: ${profile.degree} (${profile.year}), Career interest: ${profile.careerInterest}, Goals: ${(profile.goals || []).join(', ') || 'general improvement'}.`;
  if (agent === 'study') {
    return `You are the Study & Productivity Coach inside a student app called Disha, used by Indian college students. ${base} Days until next exam/deadline: ${profile.examDays}. Help with study schedules, daily/weekly planning, time management, pomodoro and deep-work techniques, exam prep, habit tracking and beating procrastination. Be specific, warm and encouraging. Use short paragraphs or simple lists. Keep replies under ~180 words unless a detailed plan is requested. If the student sounds overwhelmed, gently suggest they also talk to a mentor, counsellor or trusted person.`;
  }
  if (agent === 'money') {
    return `You are the Money & Growth Coach inside a student app called Disha, used by Indian college students. ${base} Monthly budget/allowance: ₹${profile.monthlyBudget}. Savings goal: ₹${profile.savingsGoal} in ${profile.savingsMonths} months. Help with monthly budgeting, expense categorisation, savings goals, emergency funds, student finance education and basic investing concepts taught only educationally. Present any investing information as general education, never as a personal recommendation, and note you are not a licensed financial advisor when relevant. Use ₹. Keep replies concise and practical, with short breakdowns or lists where useful.`;
  }
  return `You are the Career & Side Hustle Coach inside a student app called Disha, used by Indian college students. ${base} Help with career path recommendations, resume reviews, interview preparation, internship and freelancing guidance, side hustle ideas and skill-gap roadmaps relevant to the Indian job market. When genuinely useful, you may mention well-known learning platforms or tools such as Coursera, Udemy, Notion, Grammarly or Canva, clearly labelling such mentions as "(sponsored suggestion)". Keep replies practical and specific. Stay under ~200 words unless a full roadmap is requested.`;
}

/* ---------------------------- Small UI bits ---------------------------- */

function ProgressBar({ value, color = 'var(--accent)', track = 'rgba(255,255,255,0.08)' }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ height: 8, borderRadius: 999, background: track, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: pct + '%', background: color, borderRadius: 999, transition: 'width .4s ease' }} />
    </div>
  );
}

function Stub({ icon: Icon, value, label, color, divider = true }) {
  return (
    <div style={{ flex: 1, minWidth: 110, padding: '14px 16px', borderLeft: divider ? '1px dashed var(--line)' : 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Icon size={16} color={color} />
      <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function IdCard({ profile, plan }) {
  const initials = (profile.name || 'S').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 18, padding: 20, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{
          width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
          background: plan === 'premium' ? 'linear-gradient(135deg, var(--gold), var(--career))' : 'var(--panel2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 18,
          color: plan === 'premium' ? '#1b1330' : 'var(--ink)',
          border: '1px solid var(--line)',
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{profile.name || 'Student'}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{profile.degree} • {profile.year}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Member since {profile.joinedDate}</div>
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          padding: '6px 12px', borderRadius: 999,
          background: plan === 'premium' ? 'rgba(245,197,107,0.15)' : 'rgba(255,255,255,0.06)',
          color: plan === 'premium' ? 'var(--gold)' : 'var(--muted)',
          border: '1px solid ' + (plan === 'premium' ? 'rgba(245,197,107,0.3)' : 'var(--line)'),
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {plan === 'premium' && <Crown size={12} />}
          {plan === 'premium' ? 'PREMIUM' : 'FREE PLAN'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 3, marginTop: 18, height: 18, alignItems: 'flex-end' }}>
        {Array.from({ length: 38 }).map((_, i) => (
          <div key={i} style={{ width: 2, height: [6, 12, 18, 9, 14, 7, 16, 11][i % 8], background: 'var(--line)', borderRadius: 1 }} />
        ))}
      </div>
    </div>
  );
}

function ScreenHeader({ icon: Icon, title, subtitle, color = 'var(--accent)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={18} color={color} />
      </div>
      <div>
        <h1 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: 'var(--muted)', margin: '2px 0 0' }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 16, padding: 18, ...style }}>
      {children}
    </div>
  );
}

/* ------------------------------ Onboarding ------------------------------ */

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', degree: DEGREES[0], year: YEARS[0], goals: [],
    monthlyBudget: 5000, savingsGoal: 10000, savingsMonths: 6,
    careerInterest: CAREER_INTERESTS[0], examDays: 30,
  });

  const toggleGoal = (g) => setForm(f => ({ ...f, goals: f.goals.includes(g) ? f.goals.filter(x => x !== g) : [...f.goals, g] }));
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const totalSteps = 4;
  const canNext = step !== 0 || form.name.trim().length > 0;

  const finish = () => {
    onComplete({
      ...form,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          <Compass size={26} color="var(--accent)" />
          <span className="font-display" style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)' }}>Disha</span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? 'var(--accent)' : 'var(--line)' }} />
          ))}
        </div>

        <Card>
          {step === 0 && (
            <div>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Tell us about you</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 18px' }}>This helps us personalise your study, money and career plans.</p>
              <label style={{ fontSize: 12, color: 'var(--muted)' }}>Your name</label>
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g. Ananya Sharma"
                style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)' }}>Degree</label>
                  <select value={form.degree} onChange={e => update('degree', e.target.value)} style={inputStyle}>
                    {DEGREES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)' }}>Year</label>
                  <select value={form.year} onChange={e => update('year', e.target.value)} style={inputStyle}>
                    {YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>What are your goals?</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 18px' }}>Pick as many as you like — your coaches will focus on these.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {GOAL_OPTIONS.map(g => {
                  const active = form.goals.includes(g);
                  return (
                    <button key={g} onClick={() => toggleGoal(g)} style={{
                      padding: '8px 14px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
                      border: '1px solid ' + (active ? 'var(--accent)' : 'var(--line)'),
                      background: active ? 'rgba(140,124,250,0.18)' : 'transparent',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                    }}>{g}</button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Your money basics</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 18px' }}>We'll set up a starter budget you can edit anytime.</p>
              <label style={{ fontSize: 12, color: 'var(--muted)' }}>Monthly budget / allowance (₹)</label>
              <input type="number" min="0" value={form.monthlyBudget} onChange={e => update('monthlyBudget', Number(e.target.value) || 0)} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)' }}>Savings goal (₹)</label>
                  <input type="number" min="0" value={form.savingsGoal} onChange={e => update('savingsGoal', Number(e.target.value) || 0)} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: 'var(--muted)' }}>Target months</label>
                  <input type="number" min="1" value={form.savingsMonths} onChange={e => update('savingsMonths', Number(e.target.value) || 1)} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Career & deadlines</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 18px' }}>Last step — we'll build your roadmap and stat strip from this.</p>
              <label style={{ fontSize: 12, color: 'var(--muted)' }}>Career interest</label>
              <select value={form.careerInterest} onChange={e => update('careerInterest', e.target.value)} style={inputStyle}>
                {CAREER_INTERESTS.map(c => <option key={c}>{c}</option>)}
              </select>
              <div style={{ marginTop: 12 }}>
                <label style={{ fontSize: 12, color: 'var(--muted)' }}>Days until your next exam / deadline</label>
                <input type="number" min="1" value={form.examDays} onChange={e => update('examDays', Number(e.target.value) || 1)} style={inputStyle} />
              </div>
            </div>
          )}
        </Card>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ ...ghostBtn, opacity: step === 0 ? 0.3 : 1 }}>
            <ChevronLeft size={16} /> Back
          </button>
          {step < totalSteps - 1 ? (
            <button onClick={() => canNext && setStep(s => s + 1)} disabled={!canNext} style={{ ...primaryBtn, opacity: canNext ? 1 : 0.5 }}>
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={finish} style={primaryBtn}>
              Create my profile <Sparkles size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 10,
  border: '1px solid var(--line)', background: 'var(--panel2)', color: 'var(--ink)',
  fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif',
};
const primaryBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10,
  border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
};
const ghostBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderRadius: 10,
  border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontSize: 14, cursor: 'pointer',
};

/* ------------------------------- Dashboard ------------------------------- */

function Dashboard({ profile, plan, budget, careerProgress, careerRole, studyPlanData, streak, msgCount, setScreen, setActiveAgent, setShowPremium }) {
  const requiredMonthly = budget ? Math.round(budget.goalAmount / Math.max(1, budget.goalMonths)) : 0;
  const savingsAllocated = budget ? budget.categories.Savings : 0;
  const savingsPct = budget ? Math.min(100, Math.round((savingsAllocated / Math.max(1, requiredMonthly)) * 100)) : 0;

  const roadmap = ROLE_ROADMAPS[careerRole] || ROLE_ROADMAPS[profile.careerInterest] || ROLE_ROADMAPS.Other;
  const progressMap = careerProgress[careerRole || profile.careerInterest] || {};
  let totalItems = 0, doneItems = 0;
  roadmap.forEach((stage, si) => stage.items.forEach((_, ii) => { totalItems++; if (progressMap[si + '-' + ii]) doneItems++; }));
  const careerPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  const messagesLeft = plan === 'premium' ? '∞' : Math.max(0, FREE_DAILY_LIMIT - msgCount);

  return (
    <div>
      <IdCard profile={profile} plan={plan} />

      <div style={{ display: 'flex', flexWrap: 'wrap', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 16, marginTop: 16, overflow: 'hidden' }}>
        <Stub icon={CalendarDays} value={'Day ' + streak} label="Study streak" color="var(--study)" divider={false} />
        <Stub icon={Wallet} value={savingsPct + '%'} label="Savings on track" color="var(--money)" />
        <Stub icon={Briefcase} value={careerPct + '%'} label="Roadmap progress" color="var(--career)" />
        <Stub icon={MessageCircle} value={messagesLeft} label="AI chats left today" color="var(--accent)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginTop: 16 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <BookOpen size={16} color="var(--study)" />
            <strong style={{ fontSize: 14 }}>Study goal</strong>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px' }}>
            {studyPlanData ? `${profile.examDays} days to your deadline. Weekly plan covers ${studyPlanData.subjects.length} subjects.` : `${profile.examDays} days until your next exam or deadline. No plan yet.`}
          </p>
          <button onClick={() => setScreen('study')} style={linkBtn}>{studyPlanData ? 'View plan' : 'Build a plan'} <ArrowRight size={14} /></button>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Wallet size={16} color="var(--money)" />
            <strong style={{ fontSize: 14 }}>Savings goal</strong>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 8px' }}>
            ₹{savingsAllocated.toLocaleString('en-IN')} / month allocated · need ₹{requiredMonthly.toLocaleString('en-IN')} to hit ₹{(budget?.goalAmount || 0).toLocaleString('en-IN')} in {budget?.goalMonths || 0} months.
          </p>
          <ProgressBar value={savingsPct} color="var(--money)" />
          <button onClick={() => setScreen('budget')} style={{ ...linkBtn, marginTop: 10 }}>Open budget tool <ArrowRight size={14} /></button>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Briefcase size={16} color="var(--career)" />
            <strong style={{ fontSize: 14 }}>Career roadmap</strong>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 8px' }}>
            {careerRole || profile.careerInterest} · {doneItems}/{totalItems} milestones done
          </p>
          <ProgressBar value={careerPct} color="var(--career)" />
          <button onClick={() => setScreen('career')} style={{ ...linkBtn, marginTop: 10 }}>View roadmap <ArrowRight size={14} /></button>
        </Card>
      </div>

      <Card style={{ marginTop: 16 }}>
        <strong style={{ fontSize: 14 }}>Talk to a coach</strong>
        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          {Object.entries(AGENT_META).map(([key, meta]) => {
            const Icon = meta.icon;
            return (
              <button key={key} onClick={() => { setActiveAgent(key); setScreen('chat'); }} style={{
                flex: '1 1 160px', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
                borderRadius: 12, border: '1px solid var(--line)', background: 'var(--panel2)', cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: meta.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={meta.color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{meta.short}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{meta.tagline}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {plan !== 'premium' && (
        <Card style={{ marginTop: 16, border: '1px solid rgba(245,197,107,0.3)', background: 'linear-gradient(135deg, rgba(245,197,107,0.08), rgba(255,107,107,0.05))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Crown size={20} color="var(--gold)" />
            <div style={{ flex: 1, minWidth: 180 }}>
              <strong style={{ fontSize: 14 }}>Go Premium — ₹299/month</strong>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '2px 0 0' }}>Unlimited chats, resume scoring, AI roadmaps and priority mentor access.</p>
            </div>
            <button onClick={() => setShowPremium(true)} style={primaryBtn}>Upgrade</button>
          </div>
        </Card>
      )}
    </div>
  );
}

const linkBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
  color: 'var(--accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
};

/* --------------------------------- Chat --------------------------------- */

function ChatScreen({ profile, plan, chats, setChats, activeAgent, setActiveAgent, msgCount, setMsgCount, chatDraft, setChatDraft, setShowPremium }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(chatDraft || '');
  const scrollRef = useRef(null);

  useEffect(() => { setInput(chatDraft || ''); }, [chatDraft, activeAgent]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [chats, activeAgent, loading]);

  const meta = AGENT_META[activeAgent];
  const history = chats[activeAgent];
  const limited = plan !== 'premium' && msgCount >= FREE_DAILY_LIMIT;

  const send = async (text) => {
    const t = (text ?? input).trim();
    if (!t || loading) return;
    if (plan !== 'premium' && msgCount >= FREE_DAILY_LIMIT) { setShowPremium(true); return; }
    const newHistory = [...history, { role: 'user', content: t }];
    setChats(c => ({ ...c, [activeAgent]: newHistory }));
    setInput('');
    setChatDraft('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: systemPrompt(activeAgent, profile),
          messages: newHistory,
        }),
      });
      const data = await res.json();

const reply =
  data.reply ||
  "Sorry, I couldn't generate a response — please try again.";

setChats(c => ({
  ...c,
  [activeAgent]: [
    ...newHistory,
    { role: 'assistant', content: reply }
  ]
}));

setMsgCount(n => n + 1);
    } catch (e) {
  const fallbackReplies = {
    study: "📚 Create a 2-hour focused study plan today. Focus on one subject at a time and avoid multitasking.",
    career: "🚀 Tell me your interests, skills, and goals, and I'll suggest suitable career paths.",
    finance: "💰 Track every expense today and try following the 50/30/20 budgeting rule."
  };

  setChats(c => ({
    ...c,
    [activeAgent]: [
      ...newHistory,
      {
        role: 'assistant',
        content:
          fallbackReplies[activeAgent] ||
          "AI is temporarily unavailable. Please try again later."
      }
    ]
  }));
} } finally {
  setLoading(false);
}

};

return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader icon={meta.icon} title={meta.label} subtitle={meta.tagline} color={meta.color} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {Object.entries(AGENT_META).map(([key, m]) => (
          <button key={key} onClick={() => setActiveAgent(key)} style={{
            flex: 1, padding: '8px 10px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: '1px solid ' + (activeAgent === key ? m.color : 'var(--line)'),
            background: activeAgent === key ? m.color + '1e' : 'transparent',
            color: activeAgent === key ? m.color : 'var(--muted)',
          }}>{m.short}</button>
        ))}
      </div>

      <div ref={scrollRef} style={{ flex: 1, minHeight: 320, maxHeight: 440, overflowY: 'auto', border: '1px solid var(--line)', borderRadius: 14, background: 'var(--panel)', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {history.length === 0 && (
          <div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>Try asking:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STARTERS[activeAgent].map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--panel2)', color: 'var(--ink)', fontSize: 13, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {history.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{
              padding: '10px 14px', borderRadius: 14, fontSize: 13.5, lineHeight: 1.55, whiteSpace: 'pre-wrap',
              background: m.role === 'user' ? 'var(--accent)' : 'var(--panel2)',
              color: m.role === 'user' ? '#fff' : 'var(--ink)',
              border: m.role === 'user' ? 'none' : '1px solid var(--line)',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 14, background: 'var(--panel2)', border: '1px solid var(--line)', fontSize: 13, color: 'var(--muted)' }}>
            {meta.short} is typing…
          </div>
        )}
      </div>

      {limited ? (
        <div style={{ marginTop: 12, padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(245,197,107,0.3)', background: 'rgba(245,197,107,0.08)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Lock size={16} color="var(--gold)" />
          <span style={{ fontSize: 13, flex: 1, minWidth: 160 }}>You've used today's {FREE_DAILY_LIMIT} free messages.</span>
          <button onClick={() => setShowPremium(true)} style={primaryBtn}>Go Premium</button>
        </div>
      ) : (
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={`Message the ${meta.short}…`} rows={1}
            style={{ ...inputStyle, marginTop: 0, resize: 'none', flex: 1 }} />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{ ...primaryBtn, opacity: (loading || !input.trim()) ? 0.5 : 1 }}>
            <Send size={16} />
          </button>
        </div>
      )}
      {plan !== 'premium' && !limited && (
        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{FREE_DAILY_LIMIT - msgCount} of {FREE_DAILY_LIMIT} free messages left today</p>
      )}
    </div>
  );
}

/* ----------------------------- Study Planner ----------------------------- */

function StudyPlanner({ profile, studyPlanData, setStudyPlanData, setStreak, setScreen, setActiveAgent, setChatDraft }) {
  const [subjects, setSubjects] = useState(studyPlanData?.subjects || [{ name: 'Mathematics', weight: 3 }, { name: 'Core subject', weight: 3 }]);
  const [hours, setHours] = useState(studyPlanData?.hoursPerDay || 3);
  const [examDays, setExamDays] = useState(profile.examDays);

  const addSubject = () => setSubjects(s => [...s, { name: '', weight: 2 }]);
  const removeSubject = (i) => setSubjects(s => s.filter((_, idx) => idx !== i));
  const updateSubject = (i, key, val) => setSubjects(s => s.map((sub, idx) => idx === i ? { ...sub, [key]: val } : sub));

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const generate = () => {
    const valid = subjects.filter(s => s.name.trim());
    if (!valid.length) return;
    const totalWeight = valid.reduce((a, s) => a + Number(s.weight || 1), 0);
    const totalSessions = Math.max(7, Math.round(hours * 7));
    const tokens = [];
    valid.forEach(s => {
      const count = Math.max(1, Math.round((Number(s.weight || 1) / totalWeight) * totalSessions));
      for (let i = 0; i < count; i++) tokens.push(s.name);
    });
    const grid = days.map(() => []);
    tokens.forEach((name, i) => grid[i % 7].push(name));
    setStudyPlanData({ subjects: valid, hoursPerDay: hours, examDays, grid });
    setStreak(s => s + 1);
  };

  const askCoach = () => {
    const summary = studyPlanData
      ? `Here's my current weekly study plan: ${studyPlanData.subjects.map(s => s.name).join(', ')}, about ${studyPlanData.hoursPerDay} hours/day, ${studyPlanData.examDays} days until my exam. Can you review it and suggest improvements, including pomodoro/deep-work tips?`
      : `I have ${examDays} days until my exam and want to study ${subjects.filter(s => s.name.trim()).map(s => s.name).join(', ') || 'my subjects'}. Help me build a weekly study plan with pomodoro sessions.`;
    setChatDraft(summary);
    setActiveAgent('study');
    setScreen('chat');
  };

  return (
    <div>
      <ScreenHeader icon={BookOpen} title="Study planner" subtitle="Build a weekly plan based on your subjects and available time" color="var(--study)" />

      <Card>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ fontSize: 12, color: 'var(--muted)' }}>Days until exam / deadline</label>
            <input type="number" min="1" value={examDays} onChange={e => setExamDays(Number(e.target.value) || 1)} style={inputStyle} />
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ fontSize: 12, color: 'var(--muted)' }}>Study hours / day</label>
            <input type="number" min="1" max="12" value={hours} onChange={e => setHours(Number(e.target.value) || 1)} style={inputStyle} />
          </div>
        </div>

        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Subjects (weight = relative priority 1–5)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
          {subjects.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input value={s.name} onChange={e => updateSubject(i, 'name', e.target.value)} placeholder="Subject name" style={{ ...inputStyle, marginTop: 0, flex: 1 }} />
              <input type="number" min="1" max="5" value={s.weight} onChange={e => updateSubject(i, 'weight', Number(e.target.value) || 1)} style={{ ...inputStyle, marginTop: 0, width: 64 }} />
              <button onClick={() => removeSubject(i)} style={{ ...iconBtn }}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
        <button onClick={addSubject} style={{ ...ghostBtn, marginTop: 10 }}><Plus size={15} /> Add subject</button>

        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <button onClick={generate} style={primaryBtn}><RefreshCw size={15} /> Generate weekly plan</button>
          <button onClick={askCoach} style={ghostBtn}>Ask Study Coach to refine <ArrowRight size={14} /></button>
        </div>
      </Card>

      {studyPlanData && (
        <Card style={{ marginTop: 16 }}>
          <strong style={{ fontSize: 14 }}>This week's plan</strong>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '4px 0 14px' }}>{studyPlanData.hoursPerDay} hrs/day · 1-hour focus sessions (50 min work + 10 min break)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8 }}>
            {days.map((d, i) => (
              <div key={d} style={{ border: '1px solid var(--line)', borderRadius: 10, padding: 10, minHeight: 90 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontWeight: 700, letterSpacing: '0.05em' }}>{d.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {studyPlanData.grid[i].map((name, j) => (
                    <div key={j} style={{ fontSize: 11, padding: '4px 6px', borderRadius: 6, background: 'var(--study)' + '22', color: 'var(--study)' }}>{name}</div>
                  ))}
                  {studyPlanData.grid[i].length === 0 && <div style={{ fontSize: 11, color: 'var(--muted)' }}>Rest / review</div>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

const iconBtn = {
  width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'transparent',
  color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};

/* ------------------------------- Budget tool ------------------------------ */

function BudgetTool({ budget, setBudget, plan, setShowPremium }) {
  const [local, setLocal] = useState(budget);

  useEffect(() => { setLocal(budget); }, [budget]);

  if (!local) return null;

  const total = Object.values(local.categories).reduce((a, b) => a + Number(b || 0), 0);
  const remaining = local.income - total;
  const requiredMonthly = Math.round(local.goalAmount / Math.max(1, local.goalMonths));
  const onTrack = local.categories.Savings >= requiredMonthly;

  const update = (cat, val) => setLocal(l => ({ ...l, categories: { ...l.categories, [cat]: Number(val) || 0 } }));

  return (
    <div>
      <ScreenHeader icon={Wallet} title="Budget & savings" subtitle="Plan your monthly money and track your savings goal" color="var(--money)" />

      <Card>
        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Monthly income / allowance (₹)</label>
        <input type="number" min="0" value={local.income} onChange={e => setLocal(l => ({ ...l, income: Number(e.target.value) || 0 }))} style={inputStyle} />

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden', border: '1px solid var(--line)' }}>
            {Object.entries(local.categories).map(([cat, amt]) => (
              <div key={cat} title={cat} style={{ width: (Math.max(0, amt) / Math.max(1, local.income) * 100) + '%', background: CAT_COLORS[cat] }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            {Object.keys(local.categories).map(cat => (
              <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 3, background: CAT_COLORS[cat] }} /> {cat}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginTop: 16 }}>
          {Object.entries(local.categories).map(([cat, amt]) => (
            <div key={cat}>
              <label style={{ fontSize: 12, color: 'var(--muted)' }}>{cat} (₹)</label>
              <input type="number" min="0" value={amt} onChange={e => update(cat, e.target.value)} style={inputStyle} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 10, background: 'var(--panel2)', display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: 'var(--muted)' }}>Allocated: ₹{total.toLocaleString('en-IN')} of ₹{local.income.toLocaleString('en-IN')}</span>
          <span style={{ color: remaining < 0 ? 'var(--career)' : 'var(--money)', fontWeight: 700 }}>{remaining < 0 ? `Over by ₹${Math.abs(remaining).toLocaleString('en-IN')}` : `₹${remaining.toLocaleString('en-IN')} unallocated`}</span>
        </div>

        <button onClick={() => setBudget(local)} style={{ ...primaryBtn, marginTop: 14 }}>Save budget</button>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <strong style={{ fontSize: 14 }}>Savings goal</strong>
        <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ fontSize: 12, color: 'var(--muted)' }}>Target amount (₹)</label>
            <input type="number" min="0" value={local.goalAmount} onChange={e => setLocal(l => ({ ...l, goalAmount: Number(e.target.value) || 0 }))} style={inputStyle} />
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ fontSize: 12, color: 'var(--muted)' }}>Target months</label>
            <input type="number" min="1" value={local.goalMonths} onChange={e => setLocal(l => ({ ...l, goalMonths: Number(e.target.value) || 1 }))} style={inputStyle} />
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
          To save ₹{local.goalAmount.toLocaleString('en-IN')} in {local.goalMonths} months, you need to put aside <strong style={{ color: 'var(--ink)' }}>₹{requiredMonthly.toLocaleString('en-IN')}/month</strong>. Right now you've allocated <strong style={{ color: 'var(--ink)' }}>₹{Number(local.categories.Savings || 0).toLocaleString('en-IN')}</strong>.
        </p>
        <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: onTrack ? 'rgba(46,196,182,0.12)' : 'rgba(255,107,107,0.12)', color: onTrack ? 'var(--money)' : 'var(--career)' }}>
          {onTrack ? 'On track to hit your goal 🎯' : `Short by ₹${(requiredMonthly - Number(local.categories.Savings || 0)).toLocaleString('en-IN')}/month — consider trimming another category.`}
        </div>
        <button onClick={() => setBudget(local)} style={{ ...primaryBtn, marginTop: 14 }}>Save goal</button>
      </Card>

      {plan !== 'premium' && (
        <Card style={{ marginTop: 16, border: '1px solid rgba(245,197,107,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Sparkles size={18} color="var(--gold)" />
            <span style={{ fontSize: 13, flex: 1, minWidth: 160 }}>Premium adds AI spending analysis, savings forecasts and personalised financial reports.</span>
            <button onClick={() => setShowPremium(true)} style={primaryBtn}>Go Premium</button>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ------------------------------ Career roadmap ----------------------------- */

function CareerRoadmap({ profile, careerRole, setCareerRole, careerProgress, setCareerProgress, plan, setShowPremium }) {
  const role = careerRole || (ROLE_ROADMAPS[profile.careerInterest] ? profile.careerInterest : 'Other');
  const roadmap = ROLE_ROADMAPS[role] || ROLE_ROADMAPS.Other;
  const progressMap = careerProgress[role] || {};

  const toggle = (si, ii) => {
    const key = si + '-' + ii;
    setCareerProgress(cp => ({ ...cp, [role]: { ...progressMap, [key]: !progressMap[key] } }));
  };

  let totalItems = 0, doneItems = 0;
  roadmap.forEach((stage, si) => stage.items.forEach((_, ii) => { totalItems++; if (progressMap[si + '-' + ii]) doneItems++; }));
  const pct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div>
      <ScreenHeader icon={Briefcase} title="Career roadmap" subtitle="A step-by-step path toward your target role" color="var(--career)" />

      <Card>
        <label style={{ fontSize: 12, color: 'var(--muted)' }}>Target role</label>
        <select value={role} onChange={e => setCareerRole(e.target.value)} style={inputStyle}>
          {Object.keys(ROLE_ROADMAPS).map(r => <option key={r}>{r}</option>)}
        </select>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: 'var(--muted)' }}>Overall progress</span>
            <span style={{ fontWeight: 700 }}>{doneItems}/{totalItems} ({pct}%)</span>
          </div>
          <ProgressBar value={pct} color="var(--career)" />
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 16 }}>
        {roadmap.map((stage, si) => (
          <Card key={si}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--career)22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--career)' }}>{si + 1}</div>
              <strong style={{ fontSize: 14 }}>{stage.title}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stage.items.map((item, ii) => {
                const checked = !!progressMap[si + '-' + ii];
                return (
                  <label key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, cursor: 'pointer', color: checked ? 'var(--muted)' : 'var(--ink)', textDecoration: checked ? 'line-through' : 'none' }}>
                    <span onClick={() => toggle(si, ii)} style={{
                      width: 18, height: 18, borderRadius: 6, border: '1px solid ' + (checked ? 'var(--career)' : 'var(--line)'),
                      background: checked ? 'var(--career)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                    }}>{checked && <Check size={12} color="#1b1330" />}</span>
                    {item}
                  </label>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: 16 }}>
        <strong style={{ fontSize: 14 }}>Recommended resources</strong>
        <p style={{ fontSize: 11, color: 'var(--muted)', margin: '4px 0 12px' }}>Sponsored recommendations — links may earn the app a referral commission.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {AFFILIATES.map(a => (
            <a key={a.name} href={a.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--panel2)', textDecoration: 'none', color: 'var(--ink)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 13 }}>{a.name}</strong>
                <span style={{ fontSize: 9, color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: 6, padding: '1px 6px' }}>SPONSORED</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '6px 0 0' }}>{a.desc}</p>
            </a>
          ))}
        </div>
      </Card>

      {plan !== 'premium' && (
        <Card style={{ marginTop: 16, border: '1px solid rgba(245,197,107,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Crown size={18} color="var(--gold)" />
            <span style={{ fontSize: 13, flex: 1, minWidth: 160 }}>Premium unlocks AI-personalised roadmaps, resume scoring and mock interviews.</span>
            <button onClick={() => setShowPremium(true)} style={primaryBtn}>Go Premium</button>
          </div>
        </Card>
      )}
    </div>
  );
}

/* --------------------------------- Mentors -------------------------------- */

function Mentors({ plan, setShowPremium, showToast }) {
  return (
    <div>
      <ScreenHeader icon={Users} title="Mentors" subtitle="Chat or book a 1:1 call with a real mentor" color="var(--accent)" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
        {MENTORS.map(m => {
          const initials = m.name.split(' ').map(w => w[0]).join('');
          return (
            <Card key={m.name}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--panel2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <strong style={{ fontSize: 14 }}>{m.name}</strong>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: 'var(--gold)' }}><Star size={12} fill="var(--gold)" /> {m.rating}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 2 }}>{m.category} · {m.sessions} sessions</div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', margin: '8px 0 0' }}>{m.bio}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={() => showToast(`Opening chat with ${m.name.split(' ')[0]}…`)} style={{ ...ghostBtn, flex: 1, justifyContent: 'center' }}>Chat</button>
                <button onClick={() => plan === 'premium' ? showToast('Booking request sent — ' + m.name + ' will confirm a slot.') : setShowPremium(true)} style={{ ...primaryBtn, flex: 1, justifyContent: 'center' }}>
                  {plan !== 'premium' && <Lock size={13} />} Book 1:1 call
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------- Premium modal ----------------------------- */

function PremiumModal({ onClose, onUpgrade, plan }) {
  const rows = [
    ['AI chats per day', '20', 'Unlimited'],
    ['Study & budget planners', 'Yes', 'Yes'],
    ['Career roadmap', 'Basic', 'AI-personalised'],
    ['Resume scoring & mock interviews', '—', 'Included'],
    ['Spending analysis & forecasts', '—', 'Included'],
    ['Mentor calls', 'Locked', 'Priority access'],
    ['Progress analytics', 'Basic', 'Advanced'],
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,12,28,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}>
      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 18, padding: 22, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Crown size={20} color="var(--gold)" />
            <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Disha Premium</h2>
          </div>
          <button onClick={onClose} style={{ ...iconBtn, border: 'none' }}><X size={18} /></button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: '4px 0 16px' }}>₹299/month — cancel anytime. This is a prototype, no real payment will be taken.</p>
        <div style={{ border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', fontSize: 11, fontWeight: 700, color: 'var(--muted)', padding: '8px 12px', background: 'var(--panel2)' }}>
            <span>FEATURE</span><span>FREE</span><span>PREMIUM</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', fontSize: 12.5, padding: '10px 12px', borderTop: '1px solid var(--line)' }}>
              <span>{r[0]}</span><span style={{ color: 'var(--muted)' }}>{r[1]}</span><span style={{ color: 'var(--gold)', fontWeight: 600 }}>{r[2]}</span>
            </div>
          ))}
        </div>
        {plan === 'premium' ? (
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--money)', fontWeight: 600 }}>You're already Premium. <Crown size={14} style={{ verticalAlign: '-2px' }} /></div>
        ) : (
          <button onClick={onUpgrade} style={{ ...primaryBtn, width: '100%', justifyContent: 'center', marginTop: 16, padding: '12px 18px' }}>Upgrade for ₹299/month</button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- App ---------------------------------- */

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState('free');
  const [screen, setScreen] = useState('dashboard');
  const [activeAgent, setActiveAgent] = useState('study');
  const [chats, setChats] = useState({ study: [], money: [], career: [] });
  const [msgCount, setMsgCount] = useState(0);
  const [msgDate, setMsgDate] = useState(todayStr());
  const [streak, setStreak] = useState(1);
  const [budget, setBudget] = useState(null);
  const [careerProgress, setCareerProgress] = useState({});
  const [careerRole, setCareerRole] = useState(null);
  const [studyPlanData, setStudyPlanData] = useState(null);
  const [showPremium, setShowPremium] = useState(false);
  const [chatDraft, setChatDraft] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); } }, [toast]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get('disha-state');
        if (res && res.value) {
          const data = JSON.parse(res.value);
          if (data.profile) setProfile(data.profile);
          if (data.plan) setPlan(data.plan);
          if (data.budget) setBudget(data.budget);
          if (data.careerProgress) setCareerProgress(data.careerProgress);
          if (data.careerRole) setCareerRole(data.careerRole);
          if (data.studyPlanData) setStudyPlanData(data.studyPlanData);
          if (data.streak) setStreak(data.streak);
          const today = todayStr();
          if (data.msgDate === today) { setMsgCount(data.msgCount || 0); setMsgDate(today); }
          else { setMsgCount(0); setMsgDate(today); }
        }
      } catch (e) { /* first run, no saved state */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set('disha-state', JSON.stringify({
          profile, plan, budget, careerProgress, careerRole, studyPlanData, streak, msgCount, msgDate,
        }));
      } catch (e) { /* storage unavailable */ }
    })();
  }, [profile, plan, budget, careerProgress, careerRole, studyPlanData, streak, msgCount, msgDate, loaded]);

  const completeOnboarding = (data) => {
    const income = data.monthlyBudget;
    setProfile(data);
    setBudget({
      income,
      categories: {
        Rent: Math.round(income * 0.30 / 10) * 10,
        Food: Math.round(income * 0.25 / 10) * 10,
        Transport: Math.round(income * 0.10 / 10) * 10,
        Subscriptions: Math.round(income * 0.05 / 10) * 10,
        Entertainment: Math.round(income * 0.10 / 10) * 10,
        Savings: Math.round(income * 0.15 / 10) * 10,
        Other: Math.round(income * 0.05 / 10) * 10,
      },
      goalAmount: data.savingsGoal,
      goalMonths: data.savingsMonths,
    });
  };

  const resetProfile = () => {
    setProfile(null); setPlan('free'); setBudget(null); setCareerProgress({});
    setCareerRole(null); setStudyPlanData(null); setStreak(1); setMsgCount(0);
    setChats({ study: [], money: [], career: [] }); setScreen('dashboard');
  };

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
    :root {
      --bg: #11142b; --panel: #1b1f3f; --panel2: #232852; --line: rgba(255,255,255,0.08);
      --ink: #eef0f8; --muted: #9aa0c3; --study: #f2a93b; --money: #2ec4b6; --career: #ff6b6b;
      --accent: #8c7cfa; --gold: #f5c56b;
    }
    .disha-root * { box-sizing: border-box; font-family: 'Inter', sans-serif; }
    .disha-root .font-display { font-family: 'Sora', sans-serif; }
    .disha-root .font-mono { font-family: 'JetBrains Mono', monospace; }
    .disha-root select, .disha-root option { font-family: 'Inter', sans-serif; }
    .disha-root input::placeholder, .disha-root textarea::placeholder { color: var(--muted); }
    .disha-root input:focus, .disha-root select:focus, .disha-root textarea:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
    .disha-root button:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
    .disha-root a:hover { border-color: var(--accent) !important; }
    .disha-root ::-webkit-scrollbar { width: 8px; height: 8px; }
    .disha-root ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 4px; }
  `;

  if (!loaded) {
    return (
      <div className="disha-root" style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' }}>
        <style>{globalStyles}</style>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Compass size={24} color="var(--accent)" />
          <span className="font-display" style={{ fontSize: 18, fontWeight: 700 }}>Loading Disha…</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="disha-root" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
        <style>{globalStyles}</style>
        <Onboarding onComplete={completeOnboarding} />
      </div>
    );
  }

  return (
    <div className="disha-root" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
      <style>{globalStyles}</style>

      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto' }}>
        {/* Desktop sidebar */}
        <div style={{ width: 220, flexShrink: 0, padding: '24px 14px', display: 'none', borderRight: '1px solid var(--line)', minHeight: '100vh', position: 'sticky', top: 0 }} className="disha-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', marginBottom: 24 }}>
            <Compass size={22} color="var(--accent)" />
            <span className="font-display" style={{ fontSize: 18, fontWeight: 800 }}>Disha</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = screen === item.id;
              return (
                <button key={item.id} onClick={() => setScreen(item.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none',
                  background: active ? 'var(--panel2)' : 'transparent', color: active ? 'var(--ink)' : 'var(--muted)',
                  fontSize: 13.5, fontWeight: active ? 600 : 500, cursor: 'pointer', textAlign: 'left',
                }}>
                  <Icon size={17} /> {item.label}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 24, padding: '0 10px' }}>
            <button onClick={() => setShowPremium(true)} style={{ ...primaryBtn, width: '100%', justifyContent: 'center' }}>
              <Crown size={15} /> {plan === 'premium' ? 'Premium' : 'Go Premium'}
            </button>
            <button onClick={resetProfile} style={{ ...ghostBtn, width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 12 }}>Reset profile</button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '20px 16px 90px', minWidth: 0 }}>
          {screen === 'dashboard' && <Dashboard profile={profile} plan={plan} budget={budget} careerProgress={careerProgress} careerRole={careerRole} studyPlanData={studyPlanData} streak={streak} msgCount={msgCount} setScreen={setScreen} setActiveAgent={setActiveAgent} setShowPremium={setShowPremium} />}
          {screen === 'study' && <StudyPlanner profile={profile} studyPlanData={studyPlanData} setStudyPlanData={setStudyPlanData} setStreak={setStreak} setScreen={setScreen} setActiveAgent={setActiveAgent} setChatDraft={setChatDraft} />}
          {screen === 'budget' && <BudgetTool budget={budget} setBudget={setBudget} plan={plan} setShowPremium={setShowPremium} />}
          {screen === 'career' && <CareerRoadmap profile={profile} careerRole={careerRole} setCareerRole={setCareerRole} careerProgress={careerProgress} setCareerProgress={setCareerProgress} plan={plan} setShowPremium={setShowPremium} />}
          {screen === 'chat' && <ChatScreen profile={profile} plan={plan} chats={chats} setChats={setChats} activeAgent={activeAgent} setActiveAgent={setActiveAgent} msgCount={msgCount} setMsgCount={setMsgCount} chatDraft={chatDraft} setChatDraft={setChatDraft} setShowPremium={setShowPremium} />}
          {screen === 'mentors' && <Mentors plan={plan} setShowPremium={setShowPremium} showToast={showToast} />}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', background: 'var(--panel)', borderTop: '1px solid var(--line)', padding: '6px 4px', zIndex: 40 }} className="disha-bottomnav">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = screen === item.id;
          return (
            <button key={item.id} onClick={() => setScreen(item.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '6px 0',
              border: 'none', background: 'none', color: active ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer',
            }}>
              <Icon size={18} />
              <span style={{ fontSize: 10 }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {showPremium && <PremiumModal plan={plan} onClose={() => setShowPremium(false)} onUpgrade={() => { setPlan('premium'); setShowPremium(false); showToast('Welcome to Premium! All features unlocked.'); }} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: 76, left: '50%', transform: 'translateX(-50%)', background: 'var(--panel2)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 16px', fontSize: 13, color: 'var(--ink)', zIndex: 60, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          {toast}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .disha-sidebar { display: flex !important; flex-direction: column; }
          .disha-bottomnav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
