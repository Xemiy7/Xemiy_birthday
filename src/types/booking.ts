export type BookingType = "exact_design" | "new_project";

export interface BookingFormData {
  bookingType: BookingType;
  projectSlug?: string;
  projectTitle?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
  preferredStyle: string;
}

export interface BookingSubmission extends BookingFormData {
  attachmentUrls: string[];
  referenceImageUrls: string[];
}

export interface BookingResponse {
  success: boolean;
  id?: string;
  message?: string;
  error?: string;
}
