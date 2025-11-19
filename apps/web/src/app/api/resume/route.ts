import { NextResponse } from "next/server";

// This is a simple API route that will redirect to a resume PDF
// In production, you would:
// 1. Generate a PDF dynamically using libraries like puppeteer or react-pdf
// 2. Serve a static PDF from the public directory
// 3. Use a service like AWS S3 to host the PDF

export async function GET() {
  // For now, return a message indicating the resume is not available
  // You can replace this with actual PDF generation or redirect to a static file

  // Option 1: If you have a static PDF in the public folder
  // return NextResponse.redirect(new URL('/resume.pdf', request.url));

  // Option 2: Return a JSON response with download URL
  return NextResponse.json({
    message: "Resume download feature is under construction",
    note: "Please contact via email for resume requests",
    email: "hello@roshankhatri.dev",
    // When ready, add: downloadUrl: "/path/to/resume.pdf"
  }, { status: 200 });
}
