import React, { useState } from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { token } from "@/data/token";

// Zod schema for form validation
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

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  // Mock API call
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      const response = await axios.post("/api/contact/contact", data);
      console.log(response.data);
      localStorage.setItem("herodata", JSON.stringify(response.data));

      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();
      window.location.href = `/thankyou?token=${token}`;
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    "As-Built Drawings",
    "2D Drafting",
    "3D Rendering",
    "CAD Conversion",
    "HVAC Drawings",
    "Solar PV",
    "Commissioning",
    "Legionella Schematic",
    // Mock success response
    "Facilities Mapping",
    "Other",
  ];

  const budgetRanges = [
    "Under £1,000",
    "£1,000 - £5,000",
    "£5,000 - £10,000",
    "£10,000 - £25,000",
    "£25,000+",
    "Discuss in consultation",
  ];

  const timelines = [
    "Rush (1-3 days)",
    "Standard (1-2 weeks)",
    "Extended (2-4 weeks)",
    "Ongoing project",
    "Flexible",
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100" id="contact-form">
      {/* Form Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3"></span>
          <span className="text-primary font-semibold">Get Started</span>
        </div>

        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Let's Discuss Your
          <span className="text-primary"> CAD Project</span>
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fill out the form below and our team will get back to you within 24
          hours with a detailed proposal.
        </p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-green-800 font-semibold">
              Thank you! Your message has been sent successfully.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 font-semibold">
              Something went wrong. Please try again.
            </p>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Full Name *
            </Label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50 focus:bg-white transition-all duration-300"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50 focus:bg-white transition-all duration-300"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50 focus:bg-white transition-all duration-300"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="text-sm font-semibold text-gray-700"
            >
              Company Name
            </Label>
            <Input
              id="company"
              {...register("company")}
              type="text"
              placeholder="Enter your company name"
              className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50 focus:bg-white transition-all duration-300"
            />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Project Type *
            </Label>
            <Select
              onValueChange={(value) => setValue("projectType", value)}
              value={watch("projectType")}
            >
              <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectType && (
              <p className="text-sm text-red-600 mt-1">
                {errors.projectType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Budget Range *
            </Label>
            <Select
              onValueChange={(value) => setValue("budget", value)}
              value={watch("budget")}
            >
              <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p className="text-sm text-red-600 mt-1">
                {errors.budget.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Timeline *
            </Label>
            <Select
              onValueChange={(value) => setValue("timeline", value)}
              value={watch("timeline")}
            >
              <SelectTrigger className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelines.map((timeline) => (
                  <SelectItem key={timeline} value={timeline}>
                    {timeline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timeline && (
              <p className="text-sm text-red-600 mt-1">
                {errors.timeline.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="text-sm font-semibold text-gray-700"
          >
            Project Details *
          </Label>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 bg-gray-50 focus:bg-white resize-none text-gray-900 placeholder-gray-500"
            placeholder="Please describe your project requirements, specific needs, and any additional information that would help us provide an accurate quote..."
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              {watch("message")?.length || 0}/1000 characters
            </p>
            <p className="text-xs text-gray-500">
              Be as detailed as possible for accurate pricing
            </p>
          </div>
        </div>

        {/* Additional Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Need to share files?
              </h4>
              <p className="text-sm text-blue-700">
                After submitting this form, our team will contact you with
                secure file sharing options for any CAD files, drawings, or
                reference materials.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary to-primary/80 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <div className="flex items-center space-x-4 gap-4">
                Send Message
                <ArrowRight />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
