
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Flag, 
  Eye, 
  TrendingUp, 
  Users, 
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const Admin = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Sample data for charts
  const riskTrendData = [
    { hour: '00', avgRisk: 0.2 },
    { hour: '04', avgRisk: 0.1 },
    { hour: '08', avgRisk: 0.4 },
    { hour: '12', avgRisk: 0.6 },
    { hour: '16', avgRisk: 0.8 },
    { hour: '20', avgRisk: 0.5 },
  ];

  const userSuspiciousData = [
    { user: 'User A', score: 0.9 },
    { user: 'User B', score: 0.8 },
    { user: 'User C', score: 0.7 },
    { user: 'User D', score: 0.6 },
  ];

  const sessionRatioData = [
    { name: 'Normal', value: 85, color: '#22c55e' },
    { name: 'Suspicious', value: 15, color: '#ef4444' },
  ];

  // Live session data
  const liveSessions = [
    {
      id: 'abc123',
      email: 'user1@x.com',
      riskScore: 0.82,
      status: 'Prompted OTP',
      timeElapsed: '00:12:05'
    },
    {
      id: 'def456',
      email: 'user2@x.com',
      riskScore: 0.45,
      status: 'Normal',
      timeElapsed: '00:08:32'
    },
    {
      id: 'ghi789',
      email: 'user3@x.com',
      riskScore: 0.91,
      status: 'Blocked',
      timeElapsed: '00:15:44'
    },
  ];

  // Loyalty fraud data
  const loyaltyFraudData = [
    {
      user: 'user2@x.com',
      action: 'Redeem',
      deviceCount: 3,
      ipChanges: 5,
      score: 0.76
    },
    {
      user: 'user4@x.com',
      action: 'Sign-up',
      deviceCount: 1,
      ipChanges: 2,
      score: 0.34
    },
  ];

  const chartConfig = {
    avgRisk: {
      label: "Average Risk",
      color: "#ef4444",
    },
    score: {
      label: "Suspicious Score",
      color: "#f59e0b",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <Badge variant="outline" className="text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>

        {/* 1. Top Header & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspicious Sessions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Normal Sessions</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,243</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active MFA Prompts</CardTitle>
              <Shield className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Pending verification</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loyalty Fraud Flags</CardTitle>
              <Flag className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
          </Card>
        </div>

        {/* 2. Live Session Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Live Session Feed
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Real-time "ticker" table that updates as new sessions come in
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session ID</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time Elapsed</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-mono">{session.id}</TableCell>
                    <TableCell className="text-blue-600">{session.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={session.riskScore > 0.7 ? "destructive" : session.riskScore > 0.5 ? "secondary" : "default"}
                      >
                        {session.riskScore}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={session.status === 'Blocked' ? "destructive" : session.status === 'Prompted OTP' ? "secondary" : "default"}
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{session.timeElapsed}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedSession(session.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 3. Detailed Session View Modal/Panel */}
        {selectedSession && (
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Session View - {selectedSession}</CardTitle>
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Behavior Overview */}
              <div>
                <h3 className="text-lg font-semibold mb-4">a. Behavior Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Live Chart: Mouse Speed Over Time</p>
                    <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-sm text-gray-500">X-axis = session seconds, Y-axis = px/sec</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Keystrokes per Minute</p>
                    <div className="text-2xl font-bold">45 WPM</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Scroll Speed Heatmap</p>
                    <div className="h-32 bg-gradient-to-r from-green-200 to-red-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Feature Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">b. Feature Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div><strong>avgMouseSpeed:</strong> 24 px/sec</div>
                  <div><strong>scrollVariability:</strong> 0.45</div>
                  <div><strong>keystrokeDelayAvg:</strong> 120 ms</div>
                  <div><strong>clicksNearCenterRatio:</strong> 68%</div>
                  <div><strong>meanIdle:</strong> 3.2 ms</div>
                  <div><strong>mouseJitter:</strong> 12</div>
                </div>
              </div>

              {/* Risk Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4">c. Risk Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span><strong>Model Score:</strong> 0.87</span>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div><strong>Anomaly Trigger:</strong> e.g., idle spike at time 00:08</div>
                  <div><strong>Recommended Action:</strong> OTP delivered / session blocked</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Optional: Real-time playback of cursor movements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 4. Historical Trends & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Risk Scores (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="avgRisk" 
                      stroke="var(--color-avgRisk)" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top Suspicious Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userSuspiciousData}>
                    <XAxis dataKey="user" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Session Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <RechartsPieChart data={sessionRatioData} cx="50%" cy="50%" outerRadius={60}>
                      {sessionRatioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* 5. Loyalty Fraud Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Loyalty Fraud Section
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Shows flagged accounts from loyalty module
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action (Sign-up/Redeem)</TableHead>
                  <TableHead>Device Count</TableHead>
                  <TableHead>IP Changes</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loyaltyFraudData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-blue-600">{item.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {item.deviceCount}
                        {item.deviceCount > 2 && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell>{item.ipChanges}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.score > 0.7 ? "destructive" : "secondary"}
                      >
                        {item.score}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
