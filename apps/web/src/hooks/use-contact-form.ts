import { useState, useCallback, useEffect } from "react";
import {
  ContactFormData,
  FormErrors,
  ValidationRules,
  validateField,
  validateForm,
  sanitizeInput,
} from "@/lib/form-validation";

export interface UseContactFormOptions {
  onSubmit: (data: ContactFormData) => Promise<void>;
  validationRules?: ValidationRules;
  sanitizeInputs?: boolean;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  charCount: number;
  focusedField: string | null;
  hasSubmitted: boolean;
  submitError: string | null;
  setFormData: (data: ContactFormData | ((prev: ContactFormData) => ContactFormData)) => void;
  setFieldValue: (field: keyof ContactFormData, value: string) => void;
  handleFieldFocus: (field: string) => void;
  handleFieldBlur: () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  validateField: (field: keyof ContactFormData) => void;
}

export function useContactForm(options: UseContactFormOptions): UseContactFormReturn {
  const { onSubmit, validationRules, sanitizeInputs = true } = options;

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
    projectType: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update character count when message changes
  useEffect(() => {
    setCharCount(formData.message.length);
  }, [formData.message]);

  const setFieldValue = useCallback(
    (field: keyof ContactFormData, value: string) => {
      const sanitizedValue = sanitizeInputs ? sanitizeInput(value) : value;

      setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors, sanitizeInputs]
  );

  const handleFieldFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  const handleFieldBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  const validateFieldHandler = useCallback(
    (field: keyof ContactFormData) => {
      if (!validationRules) return;

      const error = validateField(field, formData[field] || "", validationRules);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validationRules]
  );

  const validateAllFields = useCallback(() => {
    if (!validationRules) return {};
    return validateForm(formData, validationRules);
  }, [formData, validationRules]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      setSubmitError(null);

      // Validate form
      const formErrors = validateAllFields();
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit(formData);
        setHasSubmitted(true);
        resetForm();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to send message. Please try again.";
        setSubmitError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, validateAllFields]
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      projectType: "",
    });
    setErrors({});
    setCharCount(0);
    setFocusedField(null);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    charCount,
    focusedField,
    hasSubmitted,
    submitError,
    setFormData,
    setFieldValue,
    handleFieldFocus,
    handleFieldBlur,
    handleSubmit,
    resetForm,
    validateField: validateFieldHandler,
  };
}
