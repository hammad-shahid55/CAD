import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { token } from "@/data/token";
import axios from "axios";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[\+]?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" })
});

type FormData = z.infer<typeof formSchema>;

interface ServiceOption {
  value: string;
  label: string;
}

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Send Message");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null
  );

  const selectRef = useRef<HTMLDivElement>(null);

  const services: ServiceOption[] = [
    { value: "legionella", label: "Legionella Schematic Drawing" },
    { value: "solar", label: "Solar PV Layouts & Wiring" },
    { value: "commissioning", label: "Commissioning & Pre-Commissioning" },
    { value: "as-built", label: "As-Built Drawings" },
    { value: "hvac", label: "HVAC Drawing" },
    { value: "gis", label: "Facilities Mapping & GIS" },
    { value: "3d-rendering", label: "3D Rendering & Modeling" },
    { value: "cad-conversion", label: "CAD Conversion" },
    { value: "2d-drafting", label: "2D Drafting & Designing" },
  ];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  // Close select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      setSubmitButtonText("Sending...");


      const res = await axios.post("/api/sendMessage/sendMessage", data)
      if (res.status === 200) {
        setSubmitButtonText("Message Sent!");
        window.location.href = `/thankyou?token=${token}`;

      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitButtonText("Send Message");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-7 border border-gray-100">
        {/* Form Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-full mb-3">
            <svg
              className="w-7 h-7 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2"></h3>
          <p className="text-gray-600 text-sm">
            Connect with our experts for personalized CAD solutions
          </p>
        </div>

        {/* Contact Form */}
        <Form {...form}>
          <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Full Name *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-4 h-14 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 bg-transparent text-base"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@company.com"
                        className="w-full px-4 py-4 h-14 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 bg-transparent text-base"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-4 h-14 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 bg-transparent text-base"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Service Selection - Custom */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem className="relative z-10">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Service Required *
                  </FormLabel>
                  <FormControl>
                    <div className="relative" ref={selectRef}>
                      <button
                        type="button"
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className="w-full px-4 py-4 h-14 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 bg-transparent text-base flex items-center justify-between text-left"
                        style={{ backgroundColor: "transparent" }}
                        aria-expanded={isSelectOpen}
                        aria-haspopup="listbox"
                      >
                        <span
                          className={
                            selectedService ? "text-gray-900" : "text-gray-500"
                          }
                        >
                          {selectedService?.label || "Select a service"}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isSelectOpen ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>

                      {isSelectOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                          <div className="p-1">
                            {services.map((service) => (
                              <div
                                key={service.value}
                                onClick={() => {
                                  setSelectedService(service);
                                  setIsSelectOpen(false);
                                  // Update form value
                                  form.setValue("service", service.value);
                                }}
                                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150 bg-white text-sm"
                              >
                                {service.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="relative z-0">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Project Details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Tell us about your project requirements, timeline, and any specific details..."
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors duration-300 resize-none bg-transparent text-base min-h-[120px]"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 px-6 h-14 rounded-xl hover:bg-primary/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-75 text-base"
            >
              <span className="flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                <>{submitButtonText}</>
              </span>
            </Button>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-4 md:space-x-6 pt-3 text-sm text-gray-500">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                24h Response
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                Secure & Private
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
export const simulateApiCall = async (
  data: FormData
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted with data:", {
        ...data,
        timestamp: new Date().toISOString(),
        source: "Premium Contact Form",
      });
      resolve({
        success: true,
        message: "Message sent successfully",
      });
    }, 2000);
  });
};
