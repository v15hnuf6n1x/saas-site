
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Star, Users, Code2, Shield, Smartphone, Database, Cloud, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { organizationSchema, createReviewSchema } from "@/lib/structuredData";

// Lazy load heavy components
const Navbar = lazy(() => import("@/components/Navbar"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const services = [
    {
      icon: <Code2 className="h-8 w-8 text-blue-500" />,
      title: "Custom Web Development",
      description: "Full-stack web applications built with modern technologies like React, Node.js, and TypeScript"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: "Mobile App Development",
      description: "Native iOS and Android apps, plus cross-platform solutions for maximum reach"
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      title: "API Development",
      description: "Robust RESTful APIs, GraphQL services, and microservices architecture"
    },
    {
      icon: <Cloud className="h-8 w-8 text-orange-500" />,
      title: "Cloud Solutions",
      description: "AWS, Azure deployment, DevOps automation, and scalable infrastructure"
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-500" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and optimization for your applications"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Nexus built our entire platform from scratch. Their expertise and attention to detail is unmatched!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      content: "The mobile app they developed exceeded our expectations. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Product Manager, ScaleUp",
      content: "Professional, reliable, and delivered exactly what we needed on time and on budget.",
      rating: 5
    }
  ];

  const process = [
    { step: "01", title: "Discovery", description: "We understand your vision, requirements, and business goals" },
    { step: "02", title: "Design", description: "Create wireframes, prototypes, and user experience designs" },
    { step: "03", title: "Develop", description: "Build your application using cutting-edge technologies" },
    { step: "04", title: "Deploy", description: "Launch your application with proper testing and optimization" },
    { step: "05", title: "Support", description: "Ongoing maintenance, updates, and technical support" }
  ];

  // Structured data for homepage
  const homepageStructuredData = [
    organizationSchema,
    ...testimonials.map(testimonial => 
      createReviewSchema(testimonial.content, testimonial.name, testimonial.rating)
    )
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEOHead
        title="Nexus - Custom Software Development Agency | Web & Mobile Apps"
        description="Transform your ideas into powerful software solutions. Nexus builds custom web apps, mobile apps, APIs, and cloud solutions. Expert React, Node.js, and full-stack development services."
        keywords="custom software development, web app development, mobile app development, React development, Node.js, API development, cloud solutions, UI/UX design, software agency, full-stack development"
        canonicalUrl="https://nexus-agency.com/"
        structuredData={homepageStructuredData}
      />
      
      <Suspense fallback={<div className="h-16 bg-slate-900/50"></div>}>
        <Navbar />
      </Suspense>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build Your Next
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital Solution</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're Nexus - a leading software development agency that transforms your innovative ideas into powerful, scalable applications. From custom web applications to mobile solutions, we deliver cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" aria-label="Start your custom software development project">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products" aria-label="View our software development services">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Software Development Services</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From concept to deployment, we provide comprehensive software development services tailored to your business needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white/10 w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Proven Development Process</h2>
            <p className="text-gray-300 text-lg">Our proven development process ensures quality results and client satisfaction</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Client Success Stories</h2>
            <p className="text-gray-300 text-lg">Trusted by startups and enterprises for custom software development</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can bring your vision to life with cutting-edge technology and expert development.
          </p>
          <Link to="/pricing" aria-label="Get started with custom software development">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Suspense fallback={<div className="h-32 bg-slate-900/50"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
