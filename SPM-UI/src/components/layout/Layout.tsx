import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { MODULE_MAP } from '../../data/modules';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  titleAr?: string;
  titleEn?: string;
}

function getPageTitle(pathname: string, search: string) {
  const params = new URLSearchParams(search);
  const moduleKey = params.get('modulekey') || '';
  const mod = MODULE_MAP[moduleKey];

  if (pathname === '/') return { ar: 'مسؤول النظام', en: 'System Admin' };
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
  const { language } = useApp();
  const autoTitle = getPageTitle(location.pathname, location.search);

  const finalTitleAr = titleAr || autoTitle.ar;
  const finalTitleEn = titleEn || autoTitle.en;

  return (
    <div className="pure-layout-root" dir={language === 'ar' ? 'rtl' : 'ltr'}>

      {/* Because .pure-layout-root is a Flex container,
        and Sidebar has a fixed width of 280px in our pure CSS,
        it will automatically dock perfectly!
      */}
      <Sidebar />

      <div className="pure-layout-column">

        <TopHeader titleAr={finalTitleAr} titleEn={finalTitleEn} />

        <main className="pure-layout-main custom-scrollbar">
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
    </div>
  );
}