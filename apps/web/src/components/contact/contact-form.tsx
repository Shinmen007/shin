import { useContactForm } from "@/hooks/use-contact-form";
import {
  FormField,
  FormTextarea,
  FormSelect,
  FormSubmitButton,
} from "@/components/ui/form-components";
import { contactFormRules } from "@/lib/form-validation";
import { User, Mail, Building, FileText, Send } from "lucide-react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}

const projectTypes = [
  { value: "web-application", label: "Web Application" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "saas-platform", label: "SaaS Platform" },
  { value: "consulting", label: "Consulting" },
  { value: "full-time-role", label: "Full-time Role" },
  { value: "other", label: "Other" },
];

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    charCount,
    hasSubmitted,
    submitError,
    setFieldValue,
    handleSubmit,
  } = useContactForm({
    onSubmit,
    validationRules: contactFormRules,
  });

  const handleFieldChange = (field: string, value: string) => {
    setFieldValue(field as keyof typeof formData, value);
  };

  if (hasSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <CheckCircle2 className="mb-4 h-16 w-16 text-green-400" />
        <h3 className="mb-2 text-2xl font-bold text-white">Message Sent Successfully!</h3>
        <p className="mb-6 text-slate-400">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-600"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {submitError && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          {submitError}
        </div>
      )}

      <div className="mb-6 grid gap-6 sm:grid-cols-2">
        <FormField
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          error={errors.name}
          required
          leftIcon={<User className="h-4 w-4 text-cyber-cyan" />}
          className="border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          error={errors.email}
          required
          leftIcon={<Mail className="h-4 w-4 text-cyber-cyan" />}
          className="border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
        />
      </div>

      <div className="mb-6 grid gap-6 sm:grid-cols-2">
        <FormField
          label="Company (Optional)"
          name="company"
          placeholder="Your company name"
          value={formData.company}
          onChange={(e) => handleFieldChange("company", e.target.value)}
          error={errors.company}
          leftIcon={<Building className="h-4 w-4 text-cyber-cyan" />}
          className="border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
        />

        <FormSelect
          label="Project Type"
          name="projectType"
          value={formData.projectType}
          onChange={(e) => handleFieldChange("projectType", e.target.value)}
          error={errors.projectType}
          required
          placeholder="Select project type"
          options={projectTypes}
          className="border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
        />
      </div>

      <FormField
        label="Subject"
        name="subject"
        placeholder="What is this about?"
        value={formData.subject}
        onChange={(e) => handleFieldChange("subject", e.target.value)}
        error={errors.subject}
        required
        leftIcon={<FileText className="h-4 w-4 text-cyber-cyan" />}
        className="mb-6 border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
      />

      <FormTextarea
        label="Message"
        name="message"
        placeholder="Tell me about your project, goals, and any specific requirements..."
        value={formData.message}
        onChange={(e) => handleFieldChange("message", e.target.value)}
        error={errors.message}
        required
        rows={6}
        maxLength={5000}
        charCount={charCount}
        showCharCount
        className="mb-8 border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
      />

      <FormSubmitButton
        type="submit"
        loading={isSubmitting}
        loadingText="Sending..."
        icon={<Send className="h-4 w-4 text-cyber-cyan" />}
        className="border-2 border-cyber-cyan bg-transparent text-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-lg hover:shadow-cyber-cyan/30 transition-all duration-300"
      >
        [TRANSMIT_MESSAGE]
      </FormSubmitButton>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-cyber-cyan/70">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-cyber-success" />
          <span>Secure & Encrypted</span>
        </div>
        <div className="h-px w-4 bg-cyber-cyan/30" />
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-cyber-success" />
          <span>No Spam</span>
        </div>
      </div>
    </form>
  );
}
