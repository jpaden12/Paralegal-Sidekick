export interface ClientProfile {
  name: string; 
  date_of_birth?: Date; 
  ssn?: number; 
  address?: string; 
  medical_provider_name?: string; 
  medical_provider_address?: string; 
  name_address_person_destination?: string; 
  medical_record?: boolean;
  medical_record_accident_date?: Date
}
