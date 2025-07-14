import React, { useState, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  Activity, 
  TrendingUp, 
  Clock,
  Globe,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import AdminNav from '@/components/AdminNav';
import { Button } from '@/components/ui/button';
import { doSignOut } from '@/services/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface DashboardStats {
  totalUsers: number;
  flaggedUsers: number;
  activeSessions: number;
  loyaltyRedemptions: number;
  suspiciousDomains: number;
  recentThreats: number;
}

interface BehavioralMetrics {
  mouseMovements: { variance: number; status: string };
  keystrokeSpeed: { variance: number; status: string };
  clickPatterns: { variance: number; status: string };
  scrollBehavior: { variance: number; status: string };
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 12847,
    flaggedUsers: 23,
    activeSessions: 156,
    loyaltyRedemptions: 89,
    suspiciousDomains: 5,
    recentThreats: 12
  });

const navigate = useNavigate();

  const [behavioralMetrics] = useState<BehavioralMetrics>({
    mouseMovements: { variance: 125.2, status: 'elevated' },
    keystrokeSpeed: { variance: 38.7, status: 'normal' },
    clickPatterns: { variance: 89.4, status: 'suspicious' },
    scrollBehavior: { variance: 23.1, status: 'normal' }
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'high_risk', message: 'High-risk user detected: 11febsuhani@yahoo.com', time: '20 minutes ago' },
    { id: 2, type: 'loyalty_fraud', message: 'Suspicious loyalty redemption pattern detected', time: '50 minutes ago' },
    { id: 3, type: 'domain_threat', message: 'New phishing domain blocked: suspicious-deals.com', time: '80 minutes ago' },
    { id: 4, type: 'session_anomaly', message: 'Multiple sessions from same IP detected', time: '120 minutes ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 5) - 2,
        flaggedUsers: prev.flaggedUsers + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'high_risk': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'loyalty_fraud': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'domain_threat': return <Globe className="h-4 w-4 text-destructive" />;
      case 'session_anomaly': return <Activity className="h-4 w-4 text-warning" />;
      case 'payment_fraud': return <Shield className="h-4 w-4 text-destructive" />;
      default: return <Eye className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'high_risk': return <Badge variant="destructive">High Risk</Badge>;
      case 'loyalty_fraud': return <Badge className="bg-warning text-warning-foreground">Loyalty Fraud</Badge>;
      case 'domain_threat': return <Badge variant="destructive">Domain Threat</Badge>;
      case 'session_anomaly': return <Badge className="bg-warning text-warning-foreground">Session Anomaly</Badge>;
      case 'payment_fraud': return <Badge variant="destructive">Payment Fraud</Badge>;
      default: return <Badge variant="outline">Other</Badge>;
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'flagged': return 'text-destructive';
      case 'suspicious': return 'text-warning';
      case 'elevated': return 'text-accent';
      default: return 'text-success';
    }
  };

  const getVarianceBarWidth = (variance: number) => {
    return Math.min((variance / 200) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-admin-bg">
      
      <div className="flex">
        <AdminNav />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor fraud detection and user behavior in real-time
              </p>
              <button 
                onClick={() => { doSignOut().then(() => { navigate('/login') }) }} 
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                Logout
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="admin-card animate-fade-in hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold animate-bounce-subtle">{(stats.totalUsers / 100).toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card border-destructive/20 animate-fade-in hover-lift" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Users</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive animate-pulse-glow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.flaggedUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +3 in the last hour
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card animate-fade-in hover-lift" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Activity className="h-4 w-4 text-success animate-float" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{(stats.activeSessions / 10).toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">
                    Real-time count
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Loyalty Redemptions</CardTitle>
                  <TrendingUp className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.loyaltyRedemptions}</div>
                  <p className="text-xs text-muted-foreground">
                    Today's total
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card border-destructive/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Suspicious Domains</CardTitle>
                  <Globe className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.suspiciousDomains}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently blocked
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Threats</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.recentThreats}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 24 hours
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Behavioral Monitoring */}
            <Card className="admin-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Behavioral Monitoring Parameters</span>
                </CardTitle>
                <CardDescription>
                  Real-time variance tracking across key behavioral metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(behavioralMetrics).map(([key, metric]) => (
                    <div key={key} className="p-4 rounded-lg bg-surface border border-card-border hover-lift">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`text-xs font-medium ${getMetricStatus(metric.status)}`}>
                          {metric.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-lg font-bold mb-2">{metric.variance.toFixed(1)}% variance</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            metric.status === 'flagged' ? 'bg-destructive' :
                            metric.status === 'suspicious' ? 'bg-warning' :
                            metric.status === 'elevated' ? 'bg-accent' : 'bg-success'
                          }`}
                          style={{ width: `${getVarianceBarWidth(metric.variance)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="admin-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Latest security events and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-surface hover:bg-muted/50 transition-all duration-300 hover-lift animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <div className="flex items-center space-x-2">
                          {getActivityBadge(activity.type)}
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;