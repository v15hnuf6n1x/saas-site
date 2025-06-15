
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Code2, Smartphone, Database, Cloud, Palette, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Products = () => {
  const services = [
    {
      icon: <Code2 className="h-12 w-12 text-blue-500" />,
      title: "Custom Web Development",
      description: "Full-stack web applications built with modern technologies and best practices.",
      features: [
        "React, Vue, Angular frontends",
        "Node.js, Python, .NET backends",
        "Responsive design",
        "Progressive Web Apps",
        "E-commerce solutions"
      ],
      badge: "Most Popular",
      color: "blue"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-green-500" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "Native iOS (Swift) & Android (Kotlin)",
        "React Native cross-platform",
        "Flutter development",
        "App Store optimization",
        "Push notifications"
      ],
      badge: "Featured",
      color: "green"
    },
    {
      icon: <Database className="h-12 w-12 text-purple-500" />,
      title: "API Development",
      description: "Robust APIs and microservices architecture for scalable applications.",
      features: [
        "RESTful API design",
        "GraphQL implementations",
        "Microservices architecture",
        "API documentation",
        "Third-party integrations"
      ],
      badge: "Enterprise",
      color: "purple"
    },
    {
      icon: <Cloud className="h-12 w-12 text-orange-500" />,
      title: "Cloud Solutions",
      description: "DevOps, deployment, and cloud infrastructure management services.",
      features: [
        "AWS, Azure, Google Cloud",
        "Docker containerization",
        "CI/CD pipelines",
        "Auto-scaling infrastructure",
        "Performance monitoring"
      ],
      badge: "Essential",
      color: "orange"
    },
    {
      icon: <Palette className="h-12 w-12 text-pink-500" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
      features: [
        "User research & personas",
        "Wireframing & prototyping",
        "Visual design systems",
        "Usability testing",
        "Accessibility compliance"
      ],
      badge: "Creative",
      color: "pink"
    },
    {
      icon: <Shield className="h-12 w-12 text-red-500" />,
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and optimization for your applications.",
      features: [
        "24/7 monitoring",
        "Security updates",
        "Performance optimization",
        "Bug fixes & patches",
        "Feature enhancements"
      ],
      badge: "Ongoing",
      color: "red"
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
              Software Development
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to deployment, we provide comprehensive software development services that transform your ideas into powerful digital solutions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <Badge variant="secondary" className={`bg-${service.color}-500/20 text-${service.color}-300 border-${service.color}-500/30`}>
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that perfectly fits your business needs.
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
                  Start Your Project
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
