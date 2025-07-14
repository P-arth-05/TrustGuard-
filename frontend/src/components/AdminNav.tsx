import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  AlertTriangle,
  TrendingUp 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users,
    },
    {
      title: 'Loyalty Fraud',
      href: '/admin/loyalty',
      icon: TrendingUp,
    },
  ];

  return (
    <nav className="w-64 bg-admin-nav text-nav-foreground h-screen sticky top-16">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Security Center</h2>
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-nav-hover text-nav-foreground'
                    : 'text-nav-foreground/80 hover:bg-nav-hover hover:text-nav-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-nav-hover rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium">System Status</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Fraud Detection:</span>
              <span className="text-success">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Threat Monitoring:</span>
              <span className="text-success">Active</span>
            </div>
            <div className="flex justify-between">
              <span>Last Update:</span>
              <span className="text-muted-foreground">2 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;