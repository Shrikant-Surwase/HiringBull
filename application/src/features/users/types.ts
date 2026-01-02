export interface DeviceRegistration {
  token: string;
  type: 'ios' | 'android';
}

export interface DeviceResponse {
  message: string;
  // Add other fields returned by the backend as needed
}

export type UserRegistration = {
  name: string;
  experience_level:  'ONE_TO_THREE_YEARS' | 'INTERNSHIP' | 'FRESHER_OR_LESS_THAN_1_YEAR';
  resume_link: string;
  followedCompanies: string[];
} & ({ 
  is_experienced: true;
  company_name: string;
  years_of_experience: number;
} | {is_experienced: false, 
  college_name: string;cgpa: string
})
