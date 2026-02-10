import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, UserPlus, FileText, Files, User } from 'lucide-react';

interface AsistsLayoutProps {
  children: ReactNode;
}

const menuItems = [
  'Program information',
  'Students',
  'Instructional Activity',
  'Management Reports',
  'Funding Reports',
  'LPA Funding Reports',
];

const SIDEBAR_EXPANDED = 200;
const SIDEBAR_COLLAPSED = 48;

export function AsistsLayout({ children }: AsistsLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#f0d9b5' }}>
      {/* Left sidebar — full height, above header */}
      <aside
        className="fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-all duration-200"
        style={{ backgroundColor: '#2e7abb', width: sidebarWidth }}
      >
        {/* Sidebar header with toggle */}
        <div className="flex items-center justify-between px-3 py-3">
          {!collapsed && (
            <span className="text-base font-semibold text-white tracking-wide">Menu</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-white/10 text-white"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="border-t border-white/20" />
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item}
              className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white hover:bg-white/10 transition-colors"
              title={collapsed ? item : undefined}
            >
              {!collapsed && <span>{item}</span>}
              {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-white/70" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Right column: header + content, shifted by sidebar width */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Top header bar */}
        <header className="flex items-center justify-between px-6 py-3" style={{ backgroundColor: '#f5f0ea' }}>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                <circle cx="20" cy="8" r="6" fill="#5b2d8e" />
                <path d="M20 16 C12 20 8 32 10 44" stroke="#5b2d8e" strokeWidth="2.5" fill="none" />
                <path d="M20 16 C28 20 32 32 30 44" stroke="#5b2d8e" strokeWidth="2.5" fill="none" />
                <path d="M8 28 Q20 20 32 28" stroke="#5b2d8e" strokeWidth="2.5" fill="none" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wide" style={{ color: '#1a1a2e' }}>
                ASISTS
              </span>
              <p className="text-[10px] leading-tight" style={{ color: '#555' }}>
                Adult Student Information System
                <br />
                and Technical Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-semibold" style={{ color: '#1a1a2e' }}>
                Hello Venu (Literacy Assistance Center)
              </p>
              <p className="text-xs" style={{ color: '#666' }}>
                LAC TECH Support
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded hover:bg-black/5" title="Add User">
                <UserPlus className="h-5 w-5" style={{ color: '#333' }} />
              </button>
              <button className="p-1.5 rounded hover:bg-black/5" title="Reports">
                <FileText className="h-5 w-5" style={{ color: '#333' }} />
              </button>
              <button className="p-1.5 rounded hover:bg-black/5" title="Files">
                <Files className="h-5 w-5" style={{ color: '#333' }} />
              </button>
              <button className="p-1.5 rounded hover:bg-black/5" title="Profile">
                <User className="h-5 w-5" style={{ color: '#333' }} />
              </button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
