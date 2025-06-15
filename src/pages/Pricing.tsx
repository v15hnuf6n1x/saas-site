
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Small Project",
      price: "5,000 - 15,000",
      description: "Perfect for MVPs and simple applications",
      features: [
        "Simple web application or mobile app",
        "Basic UI/UX design",
        "Standard database integration",
        "Basic deployment setup",
        "2 weeks to 1 month delivery",
        "1 month post-launch support",
        "Source code included"
      ],
      popular: false,
      color: "gray",
      timeline: "2-4 weeks"
    },
    {
      name: "Medium Project",
      price: "15,000 - 50,000",
      description: "Ideal for feature-rich business applications",
      features: [
        "Complex web/mobile application",
        "Custom UI/UX design",
        "Advanced integrations",
        "API development",
        "Cloud deployment & DevOps",
        "1-3 months delivery timeline",
        "3 months post-launch support",
        "Documentation & training",
        "Performance optimization"
      ],
      popular: true,
      color: "blue",
      timeline: "1-3 months"
    },
    {
      name: "Large Project",
      price: "50,000+",
      description: "Enterprise solutions and complex systems",
      features: [
        "Enterprise-grade applications",
        "Microservices architecture",
        "Advanced security implementation",
        "Scalable cloud infrastructure",
        "Comprehensive testing suite",
        "3+ months delivery timeline",
        "6 months post-launch support",
        "Dedicated project manager",
        "Priority support & maintenance",
        "Custom SLA agreement"
      ],
      popular: false,
      color: "purple",
      timeline: "3-6 months"
    }
  ];

  const retainerServices = [
    {
      name: "Development Retainer",
      hours: "40 hours/month",
      price: "6,000",
      description: "Ongoing development and maintenance"
    },
    {
      name: "Consultation Services",
      hours: "Hourly",
      price: "150",
      description: "Technical consulting and code reviews"
    }
  ];

  const faqs = [
    {
      question: "How do you estimate project costs?",
      answer: "We provide detailed estimates based on your requirements, complexity, timeline, and technology stack after an initial consultation."
    },
    {
      question: "Do you offer fixed-price projects?",
      answer: "Yes, we provide fixed-price quotes for well-defined projects. For evolving requirements, we also offer time & materials pricing."
    },
    {
      question: "What's included in post-launch support?",
      answer: "Bug fixes, minor updates, performance monitoring, and technical support. Major feature additions are quoted separately."
    },
    {
      question: "Can I get a custom quote?",
      answer: "Absolutely! Every project is unique. Contact us for a personalized quote based on your specific needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Project-Based
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transparent pricing for software development projects. Get a custom quote based on your specific requirements.
          </p>
        </div>

        {/* Project Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                </div>
                <Badge className="bg-white/10 text-gray-300 mb-4">
                  {plan.timeline}
                </Badge>
                <CardDescription className="text-gray-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-white/10 hover:bg-white/20 border border-white/20'} text-white`}>
                    Request Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Retainer Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Retainer Services</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {retainerServices.map((service, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-white font-semibold text-xl mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold text-white mb-2">
                    ${service.price}<span className="text-gray-300 text-sm">/{service.hours}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Discuss Your Project?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Every project is unique. Let's schedule a consultation to understand your needs and provide a detailed quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              <MessageSquare className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Button>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-3">
                Access Client Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
