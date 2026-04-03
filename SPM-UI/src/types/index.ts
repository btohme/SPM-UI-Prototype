// ─── Language ──────────────────────────────────────────────────────────────
export type Language = 'ar' | 'en';

// ─── User ──────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  nameAr: string;
  nameEn: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
}

// ─── Notification ──────────────────────────────────────────────────────────
export type NotificationType = 'task' | 'risk' | 'issue' | 'notification' | 'announcement';

export interface Notification {
  id: string;
  type: NotificationType;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
  priority?: 'high' | 'medium' | 'low';
}

// ─── Important Link ────────────────────────────────────────────────────────
export interface ImportantLink {
  id: string;
  titleAr: string;
  titleEn: string;
  url: string;
  icon?: string;
  category?: string;
}

// ─── Module Registry ───────────────────────────────────────────────────────
export type WorkspaceType = 'project' | 'initiative' | 'global' | null;

export interface ModuleDefinition {
  key: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  workspace: WorkspaceType;
  codePrefix: string;
  color?: string;
  description?: string;
}

// ─── Navigation ────────────────────────────────────────────────────────────
export interface NavItem {
  key: string;
  labelAr: string;
  labelEn: string;
  icon?: string;
  route?: string;
  children?: NavItem[];
  isSection?: boolean;
  badge?: number;
}

export interface HorizontalNavItem {
  key: string;
  labelAr: string;
  labelEn: string;
  icon?: string;
  moduleKey?: string;
  route?: string;
  isActive?: boolean;
}

// ─── Field Configuration ───────────────────────────────────────────────────
export type FieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'people'
  | 'file'
  | 'number'
  | 'email'
  | 'currency'
  | 'percentage'
  | 'readonly'
  | 'richtext';

export interface SelectOption {
  value: string;
  labelAr: string;
  labelEn: string;
  color?: string;
}

export interface FieldConfig {
  key: string;
  labelAr: string;
  labelEn: string;
  type: FieldType;
  required?: boolean;
  options?: SelectOption[];
  tab: string;
  columnSpan?: 1 | 2;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  helpText?: string;
  multiple?: boolean; // for file and multiselect
}

export interface TabConfig {
  key: string;
  labelAr: string;
  labelEn: string;
  icon?: string;
}

// ─── Column Configuration ──────────────────────────────────────────────────
export type ColumnType = 'text' | 'badge' | 'date' | 'number' | 'link' | 'people' | 'progress' | 'currency' | 'percentage';

export interface ColumnConfig {
  key: string;
  labelAr: string;
  labelEn: string;
  type?: ColumnType;
  sortable?: boolean;
  width?: string;
  statusColors?: Record<string, string>;
  visible?: boolean;
}

// ─── Module Config (form + list combined) ─────────────────────────────────
export interface ModuleConfig {
  key: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  workspace: WorkspaceType;
  codePrefix: string;
  tabs: TabConfig[];
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

// ─── Base Record ───────────────────────────────────────────────────────────
export interface BaseRecord {
  id: string;
  code: string;
  [key: string]: unknown;
}

// ─── Status Types ──────────────────────────────────────────────────────────
export type ProjectStatus =
  | 'new'
  | 'preparation'
  | 'planning'
  | 'execution'
  | 'monitoring'
  | 'completed'
  | 'cancelled'
  | 'on_hold';

export type RiskLevel = 'high' | 'medium' | 'low';

export type CompletionStatus =
  | 'not_started'
  | 'in_progress'
  | 'on_track'
  | 'delayed'
  | 'very_delayed'
  | 'completed';

// ─── App Context ───────────────────────────────────────────────────────────
export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
  currentUser: User;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  importantLinksOpen: boolean;
  setImportantLinksOpen: (open: boolean) => void;
}
