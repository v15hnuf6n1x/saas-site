
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, BarChart3, Database, Users, Shield, Zap, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Products = () => {
  const products = [
    {
      icon: <BarChart3 className="h-12 w-12 text-blue-500" />,
      title: "Analytics Pro",
      description: "Advanced analytics and reporting tools to track your business metrics in real-time.",
      features: [
        "Real-time dashboards",
        "Custom reports",
        "Data visualization",
        "Export capabilities",
        "API integration"
      ],
      badge: "Most Popular",
      color: "blue"
    },
    {
      icon: <Database className="h-12 w-12 text-green-500" />,
      title: "Data Management",
      description: "Secure and scalable data storage solutions with automated backups and sync.",
      features: [
        "Automated backups",
        "Real-time sync",
        "Data encryption",
        "Version control",
        "Multi-region storage"
      ],
      badge: "Enterprise",
      color: "green"
    },
    {
      icon: <Users className="h-12 w-12 text-purple-500" />,
      title: "Team Workspace",
      description: "Collaborative workspace for teams with project management and communication tools.",
      features: [
        "Project management",
        "Team chat",
        "File sharing",
        "Task automation",
        "Time tracking"
      ],
      badge: "New",
      color: "purple"
    },
    {
      icon: <Shield className="h-12 w-12 text-red-500" />,
      title: "Security Suite",
      description: "Comprehensive security tools to protect your business data and applications.",
      features: [
        "Advanced threat detection",
        "Identity management",
        "Compliance monitoring",
        "Security audits",
        "Incident response"
      ],
      badge: "Essential",
      color: "red"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Automation Hub",
      description: "Powerful automation tools to streamline your workflows and boost productivity.",
      features: [
        "Workflow automation",
        "Custom triggers",
        "Integration hub",
        "Smart notifications",
        "Performance optimization"
      ],
      badge: "Featured",
      color: "yellow"
    },
    {
      icon: <Globe className="h-12 w-12 text-indigo-500" />,
      title: "Global Connect",
      description: "Connect with customers worldwide through our global infrastructure and CDN.",
      features: [
        "Global CDN",
        "Multi-language support",
        "Regional compliance",
        "Edge computing",
        "Local data centers"
      ],
      badge: "Premium",
      color: "indigo"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Powerful Products for
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Modern Business</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive suite of tools designed to accelerate your business growth and streamline operations.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      {product.icon}
                    </div>
                    <Badge variant="secondary" className={`bg-${product.color}-500/20 text-${product.color}-300 border-${product.color}-500/30`}>
                      {product.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the power of our integrated platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
