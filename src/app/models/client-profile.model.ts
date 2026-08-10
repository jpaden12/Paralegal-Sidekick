import { FormFields } from "./form-fields.model";
import { GenderTypes } from './types';

export interface ClientProfile {
  id: number;
  name: string;
  date_of_birth?: Date;
  ssn?: number;
  address?: string;
  gender?: GenderTypes;
  medical_provider_name?: string;
  medical_provider_address?: string;
  // name_address_person_destination?: string;
  // medical_record?: boolean;
  // medical_record_accident_date?: Date;
  savedForms?: FormFields[];
}
