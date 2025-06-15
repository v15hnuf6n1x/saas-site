
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Shield,
  Settings,
  Search,
  MoreHorizontal,
  UserPlus,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const adminStats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+18%",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up"
    },
    {
      title: "Monthly Revenue",
      value: "$128,430",
      change: "+12%",
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      trend: "up"
    },
    {
      title: "Active Subscriptions",
      value: "8,924",
      change: "+8%",
      icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
      trend: "up"
    },
    {
      title: "Support Tickets",
      value: "156",
      change: "-15%",
      icon: <AlertTriangle className="h-4 w-4 text-orange-600" />,
      trend: "down"
    }
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      plan: "Pro",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      plan: "Enterprise",
      status: "Active",
      joinDate: "2024-02-20",
      lastActive: "1 day ago",
      avatar: "SS"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      plan: "Starter",
      status: "Inactive",
      joinDate: "2024-03-10",
      lastActive: "1 week ago",
      avatar: "MJ"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@example.com",
      plan: "Pro",
      status: "Active",
      joinDate: "2024-03-25",
      lastActive: "5 minutes ago",
      avatar: "EB"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      plan: "Enterprise",
      status: "Suspended",
      joinDate: "2024-01-05",
      lastActive: "3 days ago",
      avatar: "DW"
    }
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, users: 2400 },
    { month: "Feb", revenue: 52000, users: 2800 },
    { month: "Mar", revenue: 48000, users: 2600 },
    { month: "Apr", revenue: 61000, users: 3200 },
    { month: "May", revenue: 55000, users: 2900 },
    { month: "Jun", revenue: 67000, users: 3500 },
  ];

  const planDistribution = [
    { name: "Starter", value: 45, color: "#3B82F6" },
    { name: "Pro", value: 35, color: "#8B5CF6" },
    { name: "Enterprise", value: 20, color: "#10B981" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>;
      case "Inactive":
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">Inactive</Badge>;
      case "Suspended":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Starter":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Starter</Badge>;
      case "Pro":
        return <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Pro</Badge>;
      case "Enterprise":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Enterprise</Badge>;
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SaaSify Admin</span>
            </Link>
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Admin Panel
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage users, monitor system performance, and oversee operations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-white/20">
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white/20">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Revenue & User Growth</CardTitle>
                  <CardDescription className="text-gray-300">
                    Monthly performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="revenue" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Plan Distribution */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Plan Distribution</CardTitle>
                  <CardDescription className="text-gray-300">
                    Current subscription breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage user accounts and permissions
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-gray-300">User</TableHead>
                      <TableHead className="text-gray-300">Plan</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Join Date</TableHead>
                      <TableHead className="text-gray-300">Last Active</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-white/20">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getPlanBadge(user.plan)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-gray-300">{user.joinDate}</TableCell>
                        <TableCell className="text-gray-300">{user.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">System Analytics</CardTitle>
                  <CardDescription className="text-gray-300">
                    Detailed performance metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Revenue"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        name="Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Settings Panel</h3>
                    <p className="text-gray-400">System configuration options will be available here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
