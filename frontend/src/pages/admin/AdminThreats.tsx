import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  AlertTriangle, 
  Check, 
  X, 
  ExternalLink,
  Clock,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Navbar';
import AdminNav from '@/components/AdminNav';
import { toast } from '@/hooks/use-toast';
import threatsData from '@/data/threats.json';

interface Threat {
  id: number;
  domain: string;
  riskLevel: string;
  threatType: string;
  firstSeen: string;
  lastSeen: string;
  attempts: number;
  description: string;
  blocked: boolean;
}

interface ThreatStats {
  totalThreats: number;
  blockedThreats: number;
  activeThreats: number;
  attemptsBlocked: number;
}

const AdminThreats: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(threatsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  
  const [stats, setStats] = useState<ThreatStats>({
    totalThreats: threatsData.length,
    blockedThreats: threatsData.filter(t => t.blocked).length,
    activeThreats: threatsData.filter(t => !t.blocked).length,
    attemptsBlocked: threatsData.reduce((sum, t) => sum + t.attempts, 0)
  });

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge className="bg-success text-success-foreground">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getThreatIcon = (threatType: string) => {
    switch (threatType) {
      case 'Phishing': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'Brand Impersonation': return <Globe className="h-4 w-4 text-destructive" />;
      case 'Loyalty Fraud': return <Shield className="h-4 w-4 text-warning" />;
      case 'Support Scam': return <Eye className="h-4 w-4 text-warning" />;
      default: return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleBlockThreat = (threatId: number) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, blocked: true }
        : threat
    ));
    
    const threat = threats.find(t => t.id === threatId);
    toast({
      title: "Threat Blocked",
      description: `${threat?.domain} has been blocked successfully`,
    });
    
    updateStats();
  };

  const handleUnblockThreat = (threatId: number) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId 
        ? { ...threat, blocked: false }
        : threat
    ));
    
    const threat = threats.find(t => t.id === threatId);
    toast({
      title: "Threat Unblocked",
      description: `${threat?.domain} has been unblocked`,
      variant: "destructive",
    });
    
    updateStats();
  };

  const updateStats = () => {
    setStats({
      totalThreats: threats.length,
      blockedThreats: threats.filter(t => t.blocked).length,
      activeThreats: threats.filter(t => !t.blocked).length,
      attemptsBlocked: threats.reduce((sum, t) => sum + t.attempts, 0)
    });
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.threatType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || threat.riskLevel === filterLevel;
    return matchesSearch && matchesFilter;
  });

  // Simulate real-time threat detection
  useEffect(() => {
    const interval = setInterval(() => {
      setThreats(prev => prev.map(threat => ({
        ...threat,
        attempts: threat.attempts + Math.floor(Math.random() * 3),
        lastSeen: new Date().toISOString()
      })));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateStats();
  }, [threats]);

  return (
    <div className="min-h-screen bg-admin-bg">
      
      <div className="flex">
        <AdminNav />
        
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">External Threats</h1>
              <p className="text-muted-foreground">
                Monitor and block malicious domains targeting your users
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalThreats}</div>
                  <p className="text-xs text-muted-foreground">
                    Detected domains
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card border-success/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blocked</CardTitle>
                  <Check className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{stats.blockedThreats}</div>
                  <p className="text-xs text-muted-foreground">
                    Successfully blocked
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card border-destructive/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.activeThreats}</div>
                  <p className="text-xs text-muted-foreground">
                    Need attention
                  </p>
                </CardContent>
              </Card>

              <Card className="admin-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attempts Blocked</CardTitle>
                  <X className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.attemptsBlocked.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Total attempts
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="admin-card">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search domains or threat types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Threats Table */}
            <Card className="admin-card">
              <CardHeader>
                <CardTitle>Detected Threats ({filteredThreats.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredThreats.map((threat) => (
                    <div key={threat.id} className="border border-card-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            {getThreatIcon(threat.threatType)}
                            <h3 className="font-semibold font-mono">{threat.domain}</h3>
                            {getRiskBadge(threat.riskLevel)}
                            {threat.blocked ? (
                              <Badge className="bg-success text-success-foreground">
                                <Check className="h-3 w-3 mr-1" />
                                Blocked
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Threat Type</div>
                              <div className="font-medium">{threat.threatType}</div>
                            </div>
                            
                            <div>
                              <div className="text-muted-foreground">Attempts</div>
                              <div className="font-medium text-destructive">{threat.attempts}</div>
                            </div>
                            
                            <div>
                              <div className="text-muted-foreground">Last Seen</div>
                              <div className="font-medium">
                                {new Date(threat.lastSeen).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground">Description</div>
                            <p className="text-sm">{threat.description}</p>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>First seen: {new Date(threat.firstSeen).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`http://${threat.domain}`, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          
                          {threat.blocked ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUnblockThreat(threat.id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-success text-success-foreground hover:bg-success/90"
                              onClick={() => handleBlockThreat(threat.id)}
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              Block
                            </Button>
                          )}
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

export default AdminThreats;