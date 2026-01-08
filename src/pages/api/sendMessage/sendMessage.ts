// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";
import { ThankYouTemplate } from "../../../templates/ThankYouTemplate";
import { ContactFormEmail } from "../../../templates/ContactFormEmailTemplate";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  email: z.email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(25, { message: "Phone number must be less than 15 digits" })
    .regex(/^[0-9+\-()\s]+$/, {
      message: "Phone number can only contain digits, +, -, (, ) and spaces",
    }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z
    .string()
    .max(500, { message: "Message must be less than 500 characters" })
    .optional(),
});

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.RESEND_API_KEY;
  const resend = new Resend(secret);
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const officialMail = import.meta.env.OFFICIAL_EMAIL;

  try {
    const data = await request.json();
    const validatedData = formSchema.parse(data);
    const { fullName, email, phone, service, message } = validatedData;

    // Send email to official address
    const { data: receiveEmailData, error: receiveEmailError } =
      await resend.emails.send({
        from: `CadOutSource <${fromEmail}>`,
        to: officialMail,
        subject: `New Contact Form Submission from ${fullName}`,
        react: ContactFormEmail({
          name: fullName,
          email,
          phone,
          projectType: service,
          message: message || "No message provided",
          company: "",
          budget: "Not specified",
          timeline: "Not specified",
        }),
      });

    if (receiveEmailError) {
      return new Response(JSON.stringify({ receiveEmailError }));
    }

    // Send thank you email to the user
    const { data: sendMailData, error: sendMailError } =
      await resend.emails.send({
        from: `CadOutSource <${fromEmail}>`,
        to: email,
        subject: "Thank you for contacting us!",
        react: ThankYouTemplate({ name: fullName }),
      });

    if (sendMailError) {
      return new Response(JSON.stringify({ sendMailError }));
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        sendMailData,
        receiveEmailData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            name: "ValidationError",
            issues: error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
