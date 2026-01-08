// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';
import { ThankYouTemplate } from '../../../templates/ThankYouTemplate';
import { ContactFormEmail } from '../../../templates/ContactFormEmailTemplate';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number")
    .max(25, "Phone number must be less than 20 characters"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.RESEND_API_KEY;
  const resend = new Resend(secret);
  const officialMail = import.meta.env.OFFICIAL_EMAIL;

  try {
    const data = await request.json();
    const validatedData = contactSchema.parse(data);
    const { name, email, phone, company, projectType, budget, timeline, message } = validatedData;

    // Send email to official address
    const { data: recieveEmailData, error: recieveEmailError } = await resend.emails.send({
      from: `CadOutSource <${officialMail}>`,
      to: officialMail,

      subject: `New Contact Form Submission from ${name}`,
      react: ContactFormEmail({
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        timeline,
        message,
      }),
    });

    if (recieveEmailError) {
      return new Response(JSON.stringify({ recieveEmailError }))
    }

    // Send thank you email to the user
    const { data: sendMailData, error: sendMailError } = await resend.emails.send({
      from: `CadOutSource <${officialMail}>`,
      to: email,
      subject: 'Thank you for contacting us!',
      react: ThankYouTemplate({ name }),
    });
    if (sendMailError) {
      return new Response(JSON.stringify({ sendMailError }))
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        sendMailData,
        recieveEmailData
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Updated error handling in the POST function
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            name: 'ValidationError',
            issues: error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'An error occurred while processing your request.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
