
export type Collection = {
  id: number;
  name: string;
  display_name: string;
  icon_link: string;
  order: number;
}

interface BlobOptions {
  type: string;
  lastModified: number;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  contactNumber: string;
  reason: string;
  uploads?: string[];
  agreement: boolean;
  userProfileId: string;
}

export interface ApplicationSubmissionRequest {
  firstName: string;
  lastName: string;
  nationalId: string;
  contactNumber: string;
  reason: string;
  reasonSelection: string;
  uploads: FileList;
  agreement: boolean;
  userProfileId: string;
  referralCode: string;
}

export interface ApplicationSubmissionResponse {
  success: boolean;
  message: string;
}
