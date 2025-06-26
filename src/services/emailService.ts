
import { supabase } from "@/integrations/supabase/client";

export interface EmailData {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

export const emailService = {
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: emailData
      });

      if (error) {
        console.error('Email service error:', error);
        return { success: false, error: error.message };
      }

      if (!data.success) {
        return { success: false, error: data.error };
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email' 
      };
    }
  },

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<{ success: boolean; error?: string }> {
    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Welcome to Nexus!</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for joining Nexus! We're excited to have you on board.</p>
        <p>Get started by exploring our dashboard and discovering all the features we have to offer.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${window.location.origin}/dashboard" 
             style="background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <p>Best regards,<br>The Nexus Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [userEmail],
      subject: "Welcome to Nexus!",
      html: welcomeHtml,
      from: "Nexus <onboarding@resend.dev>"
    });
  },

  async sendPasswordResetEmail(userEmail: string, resetLink: string): Promise<{ success: boolean; error?: string }> {
    const resetHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
        <p>You requested a password reset for your Nexus account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Nexus Team</p>
      </div>
    `;

    return this.sendEmail({
      to: [userEmail],
      subject: "Password Reset - Nexus",
      html: resetHtml,
      from: "Nexus <noreply@resend.dev>"
    });
  }
};
