
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Bell, 
  Settings, 
  LogOut,
  Zap,
  Calendar,
  FileText,
  BarChart3
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const monthlyData = [
    { month: "Jan", revenue: 4000, users: 240, orders: 120 },
    { month: "Feb", revenue: 3000, users: 180, orders: 98 },
    { month: "Mar", revenue: 5000, users: 320, orders: 180 },
    { month: "Apr", revenue: 4500, users: 280, orders: 150 },
    { month: "May", revenue: 6000, users: 400, orders: 220 },
    { month: "Jun", revenue: 5500, users: 380, orders: 200 },
  ];

  const pieData = [
    { name: "Desktop", value: 65, color: "#3B82F6" },
    { name: "Mobile", value: 25, color: "#8B5CF6" },
    { name: "Tablet", value: 10, color: "#10B981" },
  ];

  const recentActivities = [
    { id: 1, user: "John Doe", action: "Created new project", time: "2 minutes ago", avatar: "JD" },
    { id: 2, user: "Sarah Smith", action: "Updated dashboard", time: "5 minutes ago", avatar: "SS" },
    { id: 3, user: "Mike Johnson", action: "Completed task", time: "10 minutes ago", avatar: "MJ" },
    { id: 4, user: "Emily Brown", action: "Shared document", time: "15 minutes ago", avatar: "EB" },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+15%",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8%",
      icon: <Activity className="h-4 w-4 text-purple-600" />,
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2%",
      icon: <TrendingUp className="h-4 w-4 text-red-600" />,
      trend: "down"
    }
  ];

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
              <span className="text-xl font-bold text-white">SaaSify</span>
            </Link>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              Pro Plan
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
          <p className="text-gray-300">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Revenue Overview</CardTitle>
              <CardDescription className="text-gray-300">
                Monthly revenue for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="revenue" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Growth Chart */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">User Growth</CardTitle>
              <CardDescription className="text-gray-300">
                Active users over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
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
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-300">
                Latest actions from your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-300 truncate">
                        {activity.action}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-300">
                Frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20">
                <FileText className="h-4 w-4 mr-2" />
                Create Report
              </Button>
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
