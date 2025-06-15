
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
  Code2, 
  DollarSign, 
  Activity, 
  Shield,
  Settings,
  Search,
  MoreHorizontal,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  FileText,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const adminStats = [
    {
      title: "Active Clients",
      value: "28",
      change: "+12%",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up"
    },
    {
      title: "Active Projects",
      value: "47",
      change: "+8%",
      icon: <Code2 className="h-4 w-4 text-green-600" />,
      trend: "up"
    },
    {
      title: "Monthly Revenue",
      value: "$324,000",
      change: "+15%",
      icon: <DollarSign className="h-4 w-4 text-purple-600" />,
      trend: "up"
    },
    {
      title: "Team Utilization",
      value: "87%",
      change: "+3%",
      icon: <Activity className="h-4 w-4 text-orange-600" />,
      trend: "up"
    }
  ];

  const clients = [
    {
      id: 1,
      name: "TechStart Inc",
      contact: "Sarah Johnson",
      email: "sarah@techstart.com",
      activeProjects: 2,
      totalValue: "$85,000",
      status: "Active",
      joinDate: "2024-01-15",
      lastActivity: "2 hours ago",
      avatar: "TI"
    },
    {
      id: 2,
      name: "InnovateCorp",
      contact: "Michael Chen",
      email: "michael@innovate.com",
      activeProjects: 1,
      totalValue: "$120,000",
      status: "Active",
      joinDate: "2024-02-20",
      lastActivity: "1 day ago",
      avatar: "IC"
    },
    {
      id: 3,
      name: "ScaleUp Solutions",
      contact: "Emily Davis",
      email: "emily@scaleup.com",
      activeProjects: 3,
      totalValue: "$200,000",
      status: "Active",
      joinDate: "2024-03-10",
      lastActivity: "5 minutes ago",
      avatar: "SS"
    },
    {
      id: 4,
      name: "DataFlow Systems",
      contact: "David Wilson",
      email: "david@dataflow.com",
      activeProjects: 0,
      totalValue: "$45,000",
      status: "Completed",
      joinDate: "2024-01-05",
      lastActivity: "1 week ago",
      avatar: "DS"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      client: "TechStart Inc",
      status: "Live",
      progress: 100,
      budget: "$45,000",
      team: ["John", "Alice", "Bob"],
      deadline: "2024-03-15",
      type: "Web App"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "InnovateCorp",
      status: "Testing",
      progress: 85,
      budget: "$120,000",
      team: ["Sarah", "Mike", "Lisa"],
      deadline: "2024-04-30",
      type: "Mobile App"
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      client: "ScaleUp Solutions",
      status: "Development",
      progress: 60,
      budget: "$75,000",
      team: ["Tom", "Emma", "Jake"],
      deadline: "2024-05-15",
      type: "Web App"
    }
  ];

  const revenueData = [
    { month: "Jan", revenue: 245000, projects: 12 },
    { month: "Feb", revenue: 280000, projects: 15 },
    { month: "Mar", revenue: 310000, projects: 18 },
    { month: "Apr", revenue: 295000, projects: 16 },
    { month: "May", revenue: 340000, projects: 20 },
    { month: "Jun", revenue: 324000, projects: 19 },
  ];

  const projectTypeDistribution = [
    { name: "Web Apps", value: 45, color: "#3B82F6" },
    { name: "Mobile Apps", value: 30, color: "#8B5CF6" },
    { name: "APIs", value: 15, color: "#10B981" },
    { name: "Other", value: 10, color: "#F59E0B" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>;
      case "Completed":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Completed</Badge>;
      case "On Hold":
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">On Hold</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProjectStatusBadge = (status: string) => {
    switch (status) {
      case "Live":
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Live</Badge>;
      case "Testing":
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Testing</Badge>;
      case "Development":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Development</Badge>;
      case "Planning":
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">Planning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Nexus Admin</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">Agency Dashboard</h1>
          <p className="text-gray-300">Manage clients, projects, and monitor agency performance.</p>
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
            <TabsTrigger value="clients" className="text-white data-[state=active]:bg-white/20">
              Clients
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20">
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" className="text-white data-[state=active]:bg-white/20">
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Revenue & Project Growth</CardTitle>
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

              {/* Project Type Distribution */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Project Type Distribution</CardTitle>
                  <CardDescription className="text-gray-300">
                    Current project breakdown by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {projectTypeDistribution.map((entry, index) => (
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

          <TabsContent value="clients" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Client Management</CardTitle>
                    <CardDescription className="text-gray-300">
                      Manage client relationships and projects
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search clients..."
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
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">Active Projects</TableHead>
                      <TableHead className="text-gray-300">Total Value</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Last Activity</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id} className="border-white/20">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {client.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{client.name}</div>
                              <div className="text-sm text-gray-400">{client.contact}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{client.activeProjects}</TableCell>
                        <TableCell className="text-gray-300">{client.totalValue}</TableCell>
                        <TableCell>{getStatusBadge(client.status)}</TableCell>
                        <TableCell className="text-gray-300">{client.lastActivity}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <FileText className="h-4 w-4" />
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

          <TabsContent value="projects" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Active Projects</CardTitle>
                <CardDescription className="text-gray-300">
                  Monitor project progress and team assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-gray-300">Project</TableHead>
                      <TableHead className="text-gray-300">Client</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Progress</TableHead>
                      <TableHead className="text-gray-300">Budget</TableHead>
                      <TableHead className="text-gray-300">Team</TableHead>
                      <TableHead className="text-gray-300">Deadline</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id} className="border-white/20">
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{project.name}</div>
                            <div className="text-sm text-gray-400">{project.type}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{project.client}</TableCell>
                        <TableCell>{getProjectStatusBadge(project.status)}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{project.progress}%</span>
                        </TableCell>
                        <TableCell className="text-gray-300">{project.budget}</TableCell>
                        <TableCell>
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-gray-700">
                                <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                  {member.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{project.deadline}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Team Management</CardTitle>
                <CardDescription className="text-gray-300">
                  Manage development team and resource allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Team Management</h3>
                  <p className="text-gray-400">Team member management and resource allocation tools will be available here.</p>
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
