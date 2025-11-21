/**
 * Suppresses hydration warnings caused by browser extensions
 * Browser extensions like BisonSkim add attributes like `bis_skin_checked` and `bis_register`
 * which cause React hydration mismatches since they're not present in the SSR HTML
 */

if (typeof window !== "undefined") {
  const originalError = console.error;

  console.error = (...args: unknown[]) => {
    // Convert args to strings to check content
    const errorString = args.join(" ");

    // Ignore hydration warnings related to browser extension attributes
    const isBrowserExtensionWarning =
      errorString.includes("bis_skin_checked") ||
      errorString.includes("bis_register") ||
      errorString.includes("bis_id") ||
      // Generic hydration mismatch from browser extensions
      (errorString.includes("hydrated but some attributes") &&
        errorString.includes("didn't match")) ||
      (errorString.includes("Hydration") &&
        errorString.includes("didn't match") &&
        errorString.includes("server rendered HTML"));

    if (isBrowserExtensionWarning) {
      return;
    }

    // Pass through all other errors
    originalError.apply(console, args);
  };
}

export {};
