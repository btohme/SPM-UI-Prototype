import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import HorizontalNav from './HorizontalNav';
import { MODULE_MAP, PROJECT_WORKSPACE_NAV, INITIATIVE_WORKSPACE_NAV } from '../../data/modules';
import { useApp } from '../../context/AppContext';
import { MOCK_DATA } from '../../data/mockData';
import ToastContainer from '../ui/Toast';
import AICopilot from '../ui/AICopilot';
interface LayoutProps {
  children: React.ReactNode;
  titleAr?: string;
  titleEn?: string;
}

function getPageTitle(pathname: string, search: string) {
  const params = new URLSearchParams(search);
  const moduleKey = params.get('modulekey') || '';
  const mod = MODULE_MAP[moduleKey];

  if (pathname === '/') return { ar: 'فريق الاستراتيجية', en: 'Strategy Team' };
  if (pathname === '/projects') return { ar: 'المشاريع', en: 'Projects' };
  if (pathname === '/initiatives') return { ar: 'المبادرات', en: 'Initiatives' };
  if (pathname === '/strategies') return { ar: 'الاستراتيجيات', en: 'Strategies' };
  if (pathname === '/list' && mod) return { ar: mod.nameAr, en: mod.nameEn };
  if (pathname === '/add' && mod) return { ar: `إضافة - ${mod.nameAr}`, en: `Add - ${mod.nameEn}` };
  if (pathname === '/view' && mod) return { ar: `تفاصيل - ${mod.nameAr}`, en: `Details - ${mod.nameEn}` };
  if (pathname === '/edit' && mod) return { ar: `تعديل - ${mod.nameAr}`, en: `Edit - ${mod.nameEn}` };
  if (pathname.includes('/workspace/project')) return { ar: 'مساحة عمل المشروع', en: 'Project Workspace' };
  if (pathname.includes('/workspace/initiative')) return { ar: 'مساحة عمل المبادرة', en: 'Initiative Workspace' };
  return { ar: 'النظام', en: 'System' };
}

export default function Layout({ children, titleAr, titleEn }: LayoutProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { language, t } = useApp();

  const autoTitle = getPageTitle(location.pathname, location.search);
  const finalTitleAr = titleAr || autoTitle.ar;
  const finalTitleEn = titleEn || autoTitle.en;

  // --- STANDARDIZED WORKSPACE DETECTION ---
  const codeFallback = searchParams.get('code');
  const projectCode = searchParams.get('projectCode') || (location.pathname.includes('/project') ? codeFallback : null);
  const initiativeCode = searchParams.get('initiativeCode') || (location.pathname.includes('/initiative') ? codeFallback : null);

  let workspaceNavItems = null;
  let workspaceTitle = '';
  let workspaceCode = '';
  let workspaceType: 'project' | 'initiative' | undefined = undefined;

  if (projectCode) {
    const projects = (MOCK_DATA.Projects as Record<string, unknown>[]) || [];
    // The fallback '|| projects[0]' guarantees the Nav will ALWAYS render if a projectCode is in the URL!
    const project = projects.find(p => p.code === projectCode) || projects[0];
    if (project) {
      workspaceTitle = t(String(project.nameAr), String(project.nameEn || project.nameAr));
      workspaceCode = projectCode;
      workspaceType = 'project';
      workspaceNavItems = PROJECT_WORKSPACE_NAV(projectCode);
    }
  } else if (initiativeCode) {
    const initiatives = (MOCK_DATA.Initiatives as Record<string, unknown>[]) || [];
    const initiative = initiatives.find(i => i.code === initiativeCode) || initiatives[0];
    if (initiative) {
      workspaceTitle = t(String(initiative.nameAr), String(initiative.nameEn || initiative.nameAr));
      workspaceCode = initiativeCode;
      workspaceType = 'initiative';
      workspaceNavItems = INITIATIVE_WORKSPACE_NAV(initiativeCode);
    }
  }

  return (
    <div className="pure-layout-root" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <ToastContainer />
      <Sidebar />

      <div className="pure-layout-column">
        <TopHeader titleAr={finalTitleAr} titleEn={finalTitleEn} />

        <main className="pure-layout-main custom-scrollbar">

          {/* THE MAGIC: The Layout automatically renders the persistent nav globally! */}
          {workspaceNavItems && (
            <HorizontalNav
              items={workspaceNavItems}
              workspaceTitle={workspaceTitle}
              workspaceCode={workspaceCode}
              workspaceType={workspaceType}
            />
          )}

          <motion.div
            key={location.pathname + location.search}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ maxWidth: '100%', margin: '0 auto' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      <AICopilot />
    </div>
  );
}