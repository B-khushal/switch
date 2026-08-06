import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Globe,
  Settings,
  BarChart3,
  User,
  ShieldCheck,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useNavigate, usePathname } from '../../../router/router';
import { isAuthenticated, logoutAdmin, getAdminUser } from '../../../services/authService';

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

const navItems = [
  { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/meetings', name: 'Meetings', icon: Clock },
  { path: '/admin/calendar', name: 'Calendar', icon: Calendar },
  { path: '/admin/team', name: 'Team Members', icon: Users },
  { path: '/admin/availability', name: 'Availability', icon: Clock },
  { path: '/admin/google', name: 'Google Integration', icon: Globe },
  { path: '/admin/settings', name: 'Settings', icon: Settings },
  { path: '/admin/analytics', name: 'Analytics', icon: BarChart3 },
  { path: '/admin/profile', name: 'Profile', icon: User },
  { path: '/admin/security', name: 'Security', icon: ShieldCheck },
  { path: '/admin/logs', name: 'System Logs', icon: FileText },
];

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const currentPath = usePathname();
  const adminUser = getAdminUser();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Authentication Guard
  if (!isAuthenticated()) {
    setTimeout(() => navigate('/admin/login'), 0);
    return null;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-body flex flex-col md:flex-row">
      {/* Desktop SaaS Sidebar */}
      <aside className="w-64 bg-[#111111] text-white shrink-0 flex flex-col justify-between hidden md:flex border-r border-white/10">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/admin')}>
              <img src="/image_copy.png" alt="Switch Logo" className="h-8 w-auto mix-blend-screen" />
              <div>
                <div className="font-bold text-sm text-white tracking-tight">SWITCH IT</div>
                <div className="text-[10px] text-brand font-bold uppercase tracking-widest">Admin SaaS</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand text-white shadow-lg shadow-orange-500/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-white" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile Footer & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <img src={adminUser.avatar} alt={adminUser.name} className="w-9 h-9 rounded-full object-cover border-2 border-brand" />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{adminUser.name}</div>
              <div className="text-[10px] text-white/50 truncate">{adminUser.email}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 text-xs font-bold transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="bg-white border-b border-black/5 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#FAFAFA] border border-black/10 text-black/70"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-[#111111] tracking-tight">{title}</h1>
              <p className="text-[11px] md:text-xs text-black/50 font-semibold hidden sm:block">Switch It Enterprise Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-[11px] md:text-xs font-bold text-black/70 hover:text-brand bg-[#FAFAFA] px-3 md:px-4 py-2 rounded-xl border border-black/5"
            >
              Public Website
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111111] text-white p-4 space-y-1 border-b border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(item.path);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-brand text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 mt-2 border-t border-white/10 pt-3"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
