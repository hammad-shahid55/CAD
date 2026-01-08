import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MessagesSquare, Send } from "lucide-react";
import { token } from "@/data/token";
import axios from "axios";

interface GetQuoteModalProps {
  triggerButton?: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
}

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
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" })
});

type FormData = z.infer<typeof formSchema>;

const GetQuoteModal: React.FC<GetQuoteModalProps> = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form submitted:", data);
      const response = await axios.post("/api/sendMessage/sendMessage", data)
      console.log(response.data);
      if (response.status === 200) {
        reset();
        closeModal();
        window.location.href = `/thankyou?token=${token}`; // Redirect to thank you page

      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      {triggerButton ? (
        React.cloneElement(triggerButton, {
          onClick: (e: React.MouseEvent) => {
            triggerButton.props.onClick?.(e);
            openModal();
          },
        })
      ) : (
        <button
          className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 justify-center"
          onClick={openModal}
        >
          <MessagesSquare />
          Contact Us
        </button>
      )}

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 top-15 px-2 md:px-0 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />

        <div
          className={`relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl transition-all overflow-auto  max-h-[88dvh] h-auto duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            <button
              onClick={closeModal}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-4"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block  text-sm font-medium text-gray-700 mb-2 text-start px-2"
              >
                Full Name *
              </label>
              <Input
                id="fullName"
                {...register("fullName")}
                className={`${errors.fullName
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                  }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2 text-start px-2"
              >
                Email ID *
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={`${errors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                  }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2 text-start px-2"
              >
                Phone No *
              </label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`${errors.phone
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                  }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 mb-2 text-start px-2"
              >
                Service Required *
              </label>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`${errors.service
                        ? "border-red-500 focus:ring-red-500"
                        : ""
                        }`}
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mapping-services">
                        Mapping services
                      </SelectItem>
                      <SelectItem value="draft-design">
                        Draft & Design
                      </SelectItem>
                      <SelectItem value="risk-mapping">Risk Mapping</SelectItem>
                      <SelectItem value="documentation">
                        Documentation
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.service && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2 text-start px-2"
              >
                Your Message
              </label>
              <Textarea
                id="message"
                {...register("message")}
                className={`${errors.message
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
                  }`}
                placeholder="Tell us about your project requirements..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 2v4m0 12v4m8.485-9.485l-2.828 2.828M5.757 14.243l-2.828 2.828M12 6a6 6 0 100 12 6 6 0 000-12z"
                      />
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      <Send size={20} />
                      Send Message
                    </span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GetQuoteModal;
