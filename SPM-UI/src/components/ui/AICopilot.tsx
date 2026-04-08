import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Paperclip, X, Sparkles, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_DATA, persistData } from '../../data/mockData';
import { showToast } from './Toast';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  attachment?: string;
  isProposal?: boolean;
  isRiskList?: boolean;
};

export default function AICopilot() {
  const { t, language } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: t(
        'مرحباً بك! أنا مساعدك الذكي. يمكنك إرفاق مستند استراتيجية لبناء القالب، أو سؤالي عن أبرز المخاطر في مشاريعك.',
        'Hello! I am your AI Assistant. Attach a strategy document to build a hierarchy, or ask me about high-impact risks across your projects.'
      )
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    
    // Keyword Detection to split use cases
    const isRiskQuery = userText.toLowerCase().includes('risk') || userText.includes('مخاطر');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      attachment: isRiskQuery ? undefined : t('Strategy_Draft_v2.pdf', 'Strategy_Draft_v2.pdf')
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (isRiskQuery) {
        // --- RISK USE CASE RESPONSE ---
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: t(
            'قمت بتحليل سجلات المشاريع النشطة. إليك قائمة بالمخاطر ذات التأثير العالي (High Impact) التي تتطلب انتباهك:',
            'I have analyzed the active project logs. Here is the list of High Impact risks that require your attention:'
          ),
          isRiskList: true
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        // --- STRATEGY USE CASE RESPONSE ---
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: t(
            'قمت بتحليل المستند. وجدت استراتيجية واحدة، ركيزتين، و3 أهداف. هل توافق على هذا القالب؟',
            'I analyzed the document. I found 1 Strategy, 2 Pillars, and 3 Objectives. Do you approve this structure?'
          ),
          isProposal: true
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    }, 2500);
  };

  const handleApproveImport = () => {
    const parentUniqueId = Math.floor(1000 + Math.random() * 9000);
    const parentId = `AI-ST-${parentUniqueId}`;

    if (!MOCK_DATA['Strategies']) MOCK_DATA['Strategies'] = [];
    MOCK_DATA['Strategies'].push({
      id: parentId,
      code: `ST-${parentUniqueId}`,
      nameAr: 'استراتيجية التحول الرقمي 2030 (من الذكاء الاصطناعي)',
      nameEn: 'Digital Transformation 2030 (AI Generated)',
      status: 'draft'
    });

    if (!MOCK_DATA['StrategicPillars']) MOCK_DATA['StrategicPillars'] = [];
    const pillar1Id = `AI-PL-${parentUniqueId}-1`;
    MOCK_DATA['StrategicPillars'].push({
      id: pillar1Id,
      code: `PL-${parentUniqueId}-1`,
      strategyId: parentId,
      nameAr: 'تطوير البنية التحتية',
      nameEn: 'Infrastructure Development'
    });

    persistData();
    showToast('تم استيراد البيانات من الذكاء الاصطناعي بنجاح.', 'Data imported from AI successfully.');
    setIsOpen(false);
    navigate(`/setup-hub?modulekey=Strategies&itemid=ST-${parentUniqueId}`);
  };

  return (
    <>
      {/* Copilot Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '24px', [language === 'ar' ? 'left' : 'right']: '24px', zIndex: 9000,
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #f29221 0%, #f2b221 100%)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(20, 122, 109, 0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Sparkles size={24} color="#ffffff" />
      </button>

      {/* Copilot Sliding Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 9998, backdropFilter: 'blur(2px)' }}
            />

            <motion.div
              initial={{ x: language === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: language === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, bottom: 0, [language === 'ar' ? 'left' : 'right']: 0,
                width: '400px', background: '#ffffff', zIndex: 9999,
                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ padding: '20px', background: 'linear-gradient(135deg, #147a6d 0%, #0f6156 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px' }}><Bot size={20} color="#f29221" /></div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800' }}>{t('المساعد الذكي (تجريبي)', 'AI Copilot (Beta)')}</h3>
                </div>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8faf9' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>

                    <div style={{
                      maxWidth: '85%', padding: '12px 16px', fontSize: '14px', lineHeight: '1.5',
                      borderRadius: '16px',
                      borderBottomRightRadius: msg.sender === 'user' && language !== 'ar' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.sender === 'user' && language === 'ar' ? '4px' : '16px',
                      background: msg.sender === 'user' ? '#147a6d' : '#ffffff',
                      color: msg.sender === 'user' ? 'white' : '#1f2937',
                      border: msg.sender === 'ai' ? '1px solid #e5e7eb' : 'none',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                    }}>
                      {msg.attachment && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px', fontSize: '12px' }}>
                          <FileText size={14} /> {msg.attachment}
                        </div>
                      )}
                      {msg.text}
                    </div>

                    {msg.isProposal && (
                      <div style={{ marginTop: '12px', width: '95%', background: '#ffffff', border: '1px solid #147a6d', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(20, 122, 109, 0.1)' }}>
                        <div style={{ background: '#e6f2f0', padding: '10px 16px', borderBottom: '1px solid #147a6d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={14} color="#147a6d" />
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#147a6d' }}>{t('مقترح القالب', 'Structure Proposal')}</span>
                        </div>
                        <div style={{ padding: '16px' }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{t('الاستراتيجية', 'Strategy')}</p>
                          <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#6b7280' }}>{t('التحول الرقمي 2030', 'Digital Transformation 2030')}</p>
                          <div style={{ borderLeft: language !== 'ar' ? '2px solid #e5e7eb' : 'none', borderRight: language === 'ar' ? '2px solid #e5e7eb' : 'none', paddingInlineStart: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ background: '#f9fafb', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>🎯 {t('الركيزة: البنية التحتية', 'Pillar: Infrastructure')}</div>
                            <div style={{ background: '#f9fafb', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>🎯 {t('الركيزة: تبني الذكاء الاصطناعي', 'Pillar: AI Adoption')}</div>
                          </div>
                        </div>
                        <div style={{ padding: '12px 16px', background: '#f8faf9', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={handleApproveImport} style={{ background: '#147a6d', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CheckCircle size={14} /> {t('اعتماد واستيراد', 'Approve & Import')}
                          </button>
                        </div>
                      </div>
                    )}

                    {msg.isRiskList && (
                      <div style={{ marginTop: '12px', width: '95%', background: '#ffffff', border: '1px solid #f87171', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(248, 113, 113, 0.1)' }}>
                        <div style={{ background: '#fef2f2', padding: '10px 16px', borderBottom: '1px solid #f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <AlertTriangle size={14} color="#dc2626" />
                          <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#dc2626' }}>
                            {t('المخاطر ذات التأثير العالي', 'High Impact Risks')}
                          </span>
                        </div>
                        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', background: '#f9fafb' }}>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                              {t('المشروع: نظام تخطيط الموارد (ERP)', 'Project: ERP System Upgrade')}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px' }}>
                              {t('تأخر تسليم المورد الرئيسي', 'Main Vendor Delivery Delay')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#dc2626', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{t('تاريخ التعرف: 02 أبريل 2026', 'Identified: April 02, 2026')}</span>
                            </div>
                          </div>
                          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', background: '#f9fafb' }}>
                            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                              {t('المشروع: بوابة الموظفين الموحدة', 'Project: Unified Employee Portal')}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937', marginBottom: '6px' }}>
                              {t('تجاوز الميزانية المعتمدة للربع الثاني', 'Q2 Approved Budget Overrun')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#dc2626', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{t('تاريخ التعرف: 28 مارس 2026', 'Identified: March 28, 2026')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ))}

                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: '#ffffff', padding: '12px 16px', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div style={{ padding: '16px', background: '#ffffff', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
                <button style={{ background: 'none', border: 'none', padding: '8px', cursor: 'pointer', color: '#6b7280' }}><Paperclip size={20} /></button>
                <textarea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder={t('اكتب هنا أو ارفق ملفاً...', 'Type here or attach a file...')}
                  style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px 12px', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit', maxHeight: '100px' }}
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  style={{ background: inputValue.trim() ? '#147a6d' : '#e5e7eb', color: 'white', border: 'none', padding: '10px', borderRadius: '12px', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', transition: '0.2s' }}
                >
                  <Send size={18} style={{ transform: language === 'ar' ? 'rotate(180deg)' : 'none' }} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}