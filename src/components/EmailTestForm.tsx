
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { emailService } from "@/services/emailService";
import { Mail, Send } from "lucide-react";

const emailTestSchema = z.object({
  to: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type EmailTestInput = z.infer<typeof emailTestSchema>;

const EmailTestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailTestInput>({
    resolver: zodResolver(emailTestSchema),
    defaultValues: {
      to: "",
      subject: "Test Email from Nexus",
      message: "This is a test email sent from the Nexus application using Resend API.",
    },
  });

  const handleSendTestEmail = async (data: EmailTestInput) => {
    setIsLoading(true);
    
    try {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Test Email</h1>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Sent from Nexus application</p>
        </div>
      `;

      const result = await emailService.sendEmail({
        to: [data.to],
        subject: data.subject,
        html: html,
        from: "Nexus Test <onboarding@resend.dev>"
      });

      if (result.success) {
        toast({
          title: "Email sent successfully!",
          description: `Test email has been sent to ${data.to}`,
        });
        form.reset();
      } else {
        toast({
          title: "Failed to send email",
          description: result.error || "An error occurred while sending the email",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Email test error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendWelcomeEmail = async () => {
    const email = form.getValues().to;
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await emailService.sendWelcomeEmail(email, "Test User");
      
      if (result.success) {
        toast({
          title: "Welcome email sent!",
          description: `Welcome email has been sent to ${email}`,
        });
      } else {
        toast({
          title: "Failed to send welcome email",
          description: result.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Welcome email error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Test Form
        </CardTitle>
        <CardDescription>
          Test the Resend email functionality by sending emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSendTestEmail)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="recipient@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email subject"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? "Sending..." : "Send Test Email"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleSendWelcomeEmail}
                disabled={isLoading}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Welcome Email
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmailTestForm;
