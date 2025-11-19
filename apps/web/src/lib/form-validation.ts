export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  projectType: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  projectType?: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const contactFormRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  message: {
    required: true,
    minLength: 20,
    maxLength: 5000,
  },
  projectType: {
    required: true,
  },
  company: {
    maxLength: 100,
  },
};

export function validateField(
  fieldName: string,
  value: string,
  rules: ValidationRules
): string | undefined {
  const rule = rules[fieldName];
  if (!rule) return undefined;

  // Required validation
  if (rule.required && !value.trim()) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }

  // Skip other validations if empty and not required
  if (!value.trim() && !rule.required) {
    return undefined;
  }

  // Min length validation
  if (rule.minLength && value.length < rule.minLength) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rule.minLength} characters`;
  }

  // Max length validation
  if (rule.maxLength && value.length > rule.maxLength) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${rule.maxLength} characters`;
  }

  // Pattern validation
  if (rule.pattern && !rule.pattern.test(value)) {
    if (fieldName === "email") {
      return "Please enter a valid email address";
    }
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} format is invalid`;
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return undefined;
}

export function validateForm(formData: ContactFormData, rules: ValidationRules): FormErrors {
  const errors: FormErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = validateField(
      fieldName,
      formData[fieldName as keyof ContactFormData] || "",
      rules
    );
    if (error) {
      errors[fieldName as keyof FormErrors] = error;
    }
  });

  return errors;
}

export function isFormValid(errors: FormErrors): boolean {
  return Object.keys(errors).length === 0;
}

// Utility function to sanitize input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .trim();
}

// Utility function to format phone number (if needed in future)
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}
