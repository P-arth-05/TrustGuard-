import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Ban, 
  CheckCircle, 
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/Navbar';
import AdminNav from '@/components/AdminNav';
import { toast } from '@/hooks/use-toast';
import usersData from '@/data/users.json';

interface User {
  id: number;
  name: string;
  email: string;
  riskScore: number;
  status: string;
  lastActivity: string;
  loyaltyPoints: number;
  suspiciousActivity: string[];
  behavioralMetrics?: {
    mouseMovements: { baseline: number; current: number; variance: number; status: string };
    keystrokeSpeed: { baseline: number; current: number; variance: number; status: string };
    clickPatterns: { baseline: number; current: number; variance: number; status: string };
    scrollBehavior: { baseline: number; current: number; variance: number; status: string };
  };
  actionsTaken?: Array<{
    action: string;
    timestamp: string;
    status: string;
  }>;
  sessionsToday: number;
  accountAge: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData);

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-destructive';
      case 'pending': return 'text-warning';
      case 'in_progress': return 'text-accent';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getRiskBadge = (riskScore: number) => {
    if (riskScore >= 80) {
      return <Badge variant="destructive">High Risk</Badge>;
    } else if (riskScore >= 60) {
      return <Badge className="bg-warning text-warning-foreground">Medium Risk</Badge>;
    } else {
      return <Badge className="bg-success text-success-foreground">Low Risk</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high_risk': return 'text-destructive';
      case 'medium_risk': return 'text-warning';
      case 'low_risk': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleUserAction = (userId: number, action: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: `Action: ${action}`,
        description: `${action} applied to ${user.name}`,
      });
      
      // Update user status based on action
      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, status: action === 'ban' ? 'banned' : action === 'verify' ? 'verified' : u.status }
          : u
      ));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => ({
        ...user,
        sessionsToday: user.sessionsToday + Math.floor(Math.random() * 2),
        riskScore: Math.max(0, Math.min(100, user.riskScore + (Math.random() - 0.5) * 10))
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-admin-bg">
      
      <div className="flex">
        <AdminNav />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">User Management</h1>
              <p className="text-muted-foreground">
                Monitor and manage users with suspicious behavior patterns
              </p>
            </div>

            {/* Filters */}
            <Card className="admin-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Users</option>
                    <option value="high_risk">High Risk</option>
                    <option value="medium_risk">Medium Risk</option>
                    <option value="low_risk">Low Risk</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Detailed User Cards */}
            <div className="space-y-6">
              {filteredUsers.map((user, index) => (
                <Card key={user.id} className={`admin-card animate-fade-in hover-lift ${
                  user.status === 'high_risk' ? 'border-destructive/50' : 
                  user.status === 'medium_risk' ? 'border-warning/50' : 'border-success/50'
                }`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-3">
                          <span>{user.name}</span>
                          {getRiskBadge(user.riskScore)}
                        </CardTitle>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getStatusColor(user.status)}`}>
                          {Math.round(user.riskScore)}
                        </div>
                        <div className="text-sm text-muted-foreground">Risk Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-medium mb-3">Suspicious Activity</h4>
                        <ul className="space-y-2">
                          {user.suspiciousActivity.map((activity, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center animate-slide-in-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                              <AlertTriangle className="h-3 w-3 mr-2 text-warning" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Behavioral Metrics</h4>
                        <div className="space-y-3">
                          {Object.entries(user.behavioralMetrics || {}).map(([key, metric]) => (
                            <div key={key} className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className={`text-xs font-medium ${
                                  metric.status === 'flagged' ? 'text-destructive' :
                                  metric.status === 'suspicious' ? 'text-warning' :
                                  metric.status === 'elevated' ? 'text-accent' : 'text-success'
                                }`}>
                                  {metric.variance.toFixed(1)}%
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div 
                                  className={`h-1 rounded-full transition-all duration-1000 ${
                                    metric.status === 'flagged' ? 'bg-destructive' :
                                    metric.status === 'suspicious' ? 'bg-warning' :
                                    metric.status === 'elevated' ? 'bg-accent' : 'bg-success'
                                  }`}
                                  style={{ width: `${Math.min((metric.variance / 200) * 100, 100)}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-3">Actions Taken</h4>
                        <div className="space-y-2">
                          {user.actionsTaken?.map((action, idx) => (
                            <div key={idx} className="text-xs p-2 bg-surface rounded animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{action.action}</span>
                                <span className={`font-medium ${getActionStatusColor(action.status)}`}>
                                  {action.status.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              <div className="text-muted-foreground mt-1">
                                {new Date(action.timestamp).toLocaleString()}
                              </div>
                            </div>
                          )) || <div className="text-xs text-muted-foreground">No actions taken</div>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="text-center p-3 bg-surface rounded-lg hover-scale">
                        <div className="text-xl font-bold">{user.sessionsToday}</div>
                        <div className="text-xs text-muted-foreground">Sessions Today</div>
                      </div>
                      <div className="text-center p-3 bg-surface rounded-lg hover-scale">
                        <div className="text-xl font-bold">{user.loyaltyPoints.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Loyalty Points</div>
                      </div>
                      <div className="text-center p-3 bg-surface rounded-lg hover-scale">
                        <div className="text-xs text-muted-foreground">Account Age</div>
                        <div className="font-medium">{user.accountAge}</div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'view')}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, 'verify')}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleUserAction(user.id, 'ban')}>
                        <Ban className="h-4 w-4 mr-2" />
                        Ban
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;

