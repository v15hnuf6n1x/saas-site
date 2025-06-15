
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Phone, Clock, Search, Book, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Support = () => {
  const faqs = [
    {
      question: "How do I get started with SaaSify?",
      answer: "Simply sign up for a free account and follow our onboarding guide. You'll be up and running in minutes."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Changes are prorated and take effect immediately."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 email support for all plans, with priority support and phone support for Professional and Enterprise plans."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security with end-to-end encryption and comply with all major security standards."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all new subscriptions."
    },
    {
      question: "Can I integrate SaaSify with other tools?",
      answer: "Yes, we offer integrations with over 100 popular tools and a robust API for custom integrations."
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat"
    },
    {
      icon: <Mail className="h-8 w-8 text-green-500" />,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 2 hours",
      action: "Send Email"
    },
    {
      icon: <Phone className="h-8 w-8 text-purple-500" />,
      title: "Phone Support",
      description: "Talk directly with our experts",
      availability: "Pro & Enterprise only",
      action: "Schedule Call"
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
              How Can We
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Help You?</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Get the support you need to make the most of SaaSify. Our team is here to help you succeed.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, and more..."
                className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white/10 w-fit">
                    {option.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center mb-4 text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    {option.availability}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Resources */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <Book className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="text-white">Documentation</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive guides and API reference
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <Users className="h-8 w-8 text-green-400 mb-2" />
                <CardTitle className="text-white">Community</CardTitle>
                <CardDescription className="text-gray-300">
                  Connect with other users and experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <Zap className="h-8 w-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Status Page</CardTitle>
                <CardDescription className="text-gray-300">
                  Check system status and uptime
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
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

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Still Need Help?</CardTitle>
                <CardDescription className="text-gray-300">
                  Send us a message and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
