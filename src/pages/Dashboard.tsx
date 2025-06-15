import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Code2, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Database,
  Globe,
  Settings
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import ProjectRequestModal from "@/components/ProjectRequestModal";
import { useUser } from "@/contexts/UserContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUser();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const applications = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Modern online store with payment integration and inventory management",
      status: "Live",
      progress: 100,
      type: "Web Application",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      lastUpdated: "2 days ago",
      liveUrl: "https://store.example.com",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      nextMilestone: "Performance optimization review",
      supportTickets: 0
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      status: "Testing",
      progress: 85,
      type: "Mobile Application",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
      lastUpdated: "1 day ago",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
      nextMilestone: "Security audit completion",
      supportTickets: 2
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Real-time business intelligence dashboard with custom reports",
      status: "Development",
      progress: 60,
      type: "Web Application",
      technologies: ["Vue.js", "Python", "Redis", "Docker"],
      lastUpdated: "3 hours ago",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      nextMilestone: "Data visualization implementation",
      supportTickets: 1
    },
    {
      id: 4,
      name: "API Gateway",
      description: "Microservices API gateway with rate limiting and authentication",
      status: "Planning",
      progress: 25,
      type: "Backend Service",
      technologies: ["Go", "Docker", "Kubernetes", "PostgreSQL"],
      lastUpdated: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
      nextMilestone: "Architecture design review",
      supportTickets: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Live":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Testing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Development":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Planning":
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Web Application":
        return <Globe className="h-4 w-4" />;
      case "Mobile Application":
        return <Smartphone className="h-4 w-4" />;
      case "Backend Service":
        return <Database className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  const stats = [
    {
      title: "Active Projects",
      value: "4",
      change: "+1 this month",
      icon: <Code2 className="h-4 w-4 text-blue-600" />,
    },
    {
      title: "Completed Projects",
      value: "12",
      change: "+3 this quarter",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    },
    {
      title: "Support Tickets",
      value: "3",
      change: "2 resolved today",
      icon: <MessageSquare className="h-4 w-4 text-purple-600" />,
    },
    {
      title: "Upcoming Meetings",
      value: "2",
      change: "Next: Tomorrow 2PM",
      icon: <Calendar className="h-4 w-4 text-orange-600" />,
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'contact':
        toast({
          title: "Contact Team",
          description: "Opening contact form...",
        });
        break;
      case 'meeting':
        toast({
          title: "Schedule Meeting",
          description: "Calendar integration coming soon!",
        });
        break;
      case 'docs':
        toast({
          title: "Documentation",
          description: "Opening documentation portal...",
        });
        break;
      case 'feature':
        toast({
          title: "Feature Request",
          description: "Feature request form coming soon!",
        });
        break;
      default:
        break;
    }
  };

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
              <span className="text-xl font-bold text-white">Nexus</span>
            </Link>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Client Portal
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationsDropdown />
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name?.split(' ')[0] || 'John'}!</h1>
          <p className="text-gray-300">Here's an overview of your projects and their current status.</p>
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
                <p className="text-xs text-gray-400">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Your Applications</h2>
            <ProjectRequestModal />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={app.thumbnail} 
                        alt={app.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle className="text-white text-lg">{app.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {getTypeIcon(app.type)}
                          <span className="text-sm text-gray-400">{app.type}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                  <CardDescription className="text-gray-300">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-white">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>

                    {/* Technologies */}
                    <div>
                      <span className="text-sm text-gray-400 mb-2 block">Technologies</span>
                      <div className="flex flex-wrap gap-1">
                        {app.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Next Milestone */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{app.nextMilestone}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      {app.liveUrl && (
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <FileText className="h-4 w-4 mr-2" />
                        Documentation
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Support {app.supportTickets > 0 && `(${app.supportTickets})`}
                      </Button>
                    </div>

                    <div className="text-xs text-gray-400 pt-2">
                      Last updated: {app.lastUpdated}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-300">
                Frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => handleQuickAction('contact')}
                className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Development Team
              </Button>
              <Button 
                onClick={() => handleQuickAction('meeting')}
                className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button 
                onClick={() => handleQuickAction('docs')}
                className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                View All Documentation
              </Button>
              <Button 
                onClick={() => handleQuickAction('feature')}
                className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Request New Feature
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Updates</CardTitle>
              <CardDescription className="text-gray-300">
                Latest project activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white">E-Commerce Platform performance optimization completed</p>
                    <p className="text-xs text-gray-400">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white">Mobile Banking App security testing in progress</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code2 className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white">Analytics Dashboard new features deployed</p>
                    <p className="text-xs text-gray-400">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
