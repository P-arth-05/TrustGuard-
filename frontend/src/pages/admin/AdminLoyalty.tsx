import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Gift,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Navbar';
import AdminNav from '@/components/AdminNav';
import { toast } from '@/hooks/use-toast';
import usersData from '@/data/users.json';
import { IndianRupee } from 'lucide-react';

interface LoyaltyStats {
  totalRedemptions: number;
  suspiciousRedemptions: number;
  averagePointsRedeemed: number;
  flaggedAccounts: number;
  pointsValue: number;
}

interface LoyaltyPattern {
  id: number;
  userId: number;
  userName: string;
  email: string;
  pattern: string;
  riskLevel: 'low' | 'medium' | 'high';
  pointsInvolved: number;
  frequency: number;
  description: string;
  detected: string;
}

const AdminLoyalty: React.FC = () => {
  const [stats, setStats] = useState<LoyaltyStats>({
    totalRedemptions: 1247,
    suspiciousRedemptions: 34,
    averagePointsRedeemed: 2850,
    flaggedAccounts: 12,
    pointsValue: 156789
  });

  const [patterns, setPatterns] = useState<LoyaltyPattern[]>([
    {
      id: 1,
      userId: 1,
      userName: 'Krishna',
      email: 'gargkrishna23@gmail.com',
      pattern: 'Unusual redemption Patterns',
      riskLevel: 'high',
      pointsInvolved: 45000,
      frequency: 15,
      description: 'User accumulated 45k points in 2 weeks through suspicious means',
      detected: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      userId: 4,
      userName: "Shraddha Jain",
      email: "fghra4432ha21ja8n@gmadasendkil.com",
      pattern: 'Use of Temporary Email',
      riskLevel: 'high',
      pointsInvolved: 30000,
      frequency: 8,
      description: 'User registered with a temporary email and redeemed points rapidly',
      detected: '2024-01-15T09:45:00Z'
    },
    {
      id: 3,
      userId: 2,
      userName: 'Sarah Johnson',
      email: 'sarah.j@tempmail.com',
      pattern: 'Account Farming',
      riskLevel: 'medium',
      pointsInvolved: 23000,
      frequency: 12,
      description: 'Suspected of creating multiple accounts to farm loyalty points',
      detected: '2024-01-15T08:20:00Z'
    },
    {
      id: 4,
      userId: 3,
      userName: 'Raj Sharma',
      email: 'sharmaji21@gmail.com',
      pattern: 'Point Transfer Abuse',
      riskLevel: 'medium',
      pointsInvolved: 12000,
      frequency: 6,
      description: 'Unusual patterns in point transfers between accounts',
      detected: '2024-01-15T07:15:00Z'
    }
  ]);

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium Risk</Badge>;
      case 'low':
        return <Badge className="bg-success text-success-foreground">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleInvestigate = (patternId: number) => {
    const pattern = patterns.find(p => p.id === patternId);
    if (pattern) {
      toast({
        title: "Investigation Started",
        description: `Investigating ${pattern.pattern} for ${pattern.userName}`,
      });
    }
  };

  const handleBlock = (patternId: number) => {
    const pattern = patterns.find(p => p.id === patternId);
    if (pattern) {
      toast({
        title: "Account Blocked",
        description: `${pattern.userName}'s account has been temporarily blocked`,
        variant: "destructive",
      });
      setPatterns(prev => prev.filter(p => p.id !== patternId));
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalRedemptions: prev.totalRedemptions + Math.floor(Math.random() * 3),
        suspiciousRedemptions: prev.suspiciousRedemptions + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-admin-bg">
      
      <div className="flex">
        <AdminNav />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">Loyalty Fraud Detection</h1>
              <p className="text-muted-foreground">
                Monitor and detect suspicious loyalty program activities
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                  <Gift className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalRedemptions / 10).toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">
                    Today
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card border-destructive/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.suspiciousRedemptions}</div>
                  <p className="text-xs text-muted-foreground">
                    Flagged redemptions
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Points</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.averagePointsRedeemed).toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">
                    Per redemption
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Flagged Accounts</CardTitle>
                  <Users className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{stats.flaggedAccounts}</div>
                  <p className="text-xs text-muted-foreground">
                    Under review
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Points Value</CardTitle>
                  <IndianRupee className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(stats.pointsValue / 100000).toFixed(0)}000</div>
                  <p className="text-xs text-muted-foreground">
                    At risk
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Suspicious Patterns */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Suspicious Loyalty Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patterns.map((pattern) => (
                    <div key={pattern.id} className="border border-card-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold">{pattern.pattern}</h3>
                            {getRiskBadge(pattern.riskLevel)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">User Details</div>
                              <div className="font-medium">{pattern.userName}</div>
                              <div className="text-sm text-muted-foreground">{pattern.email}</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-muted-foreground">Activity</div>
                              <div className="font-medium">{pattern.pointsInvolved.toLocaleString()} points</div>
                              <div className="text-sm text-muted-foreground">{pattern.frequency} occurrences</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Description</div>
                            <p className="text-sm">{pattern.description}</p>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Detected: {new Date(pattern.detected).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleInvestigate(pattern.id)}
                          >
                            Investigate
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBlock(pattern.id)}
                          >
                            Block User
                          </Button>
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

export default AdminLoyalty;