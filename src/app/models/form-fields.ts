import { AccidentTypes } from "./types";

export class FormFields {

  private form_name: string; 
  private shorthand: string;
  private form_number: number; 
  private state: string | null; 
  private health_provider_name: string | null; 
  private health_provider_address: string | null; 
  private medical_form: boolean; 
  private medical_accident_date: Date | null; 
  private diagnostic_films: boolean; 
  // Add an enum for this type
  private accident_type: AccidentTypes; 
  private sub_records_room_number: number; 
  private courthouse_name: string | null; 
  private courthouse_address: string | null; 
  private index_number: number; 
  private defendants: string[] | null; 
  private venue_county: string | null; 
  private return_date: Date | null; 

  constructor(form_name: string, shorthand: string, state: string | null, health_provider_name: string | null, 
    health_provider_address: string | null, medical_accident_date: Date | null, courthouse_name: string | null, courthouse_address: string | null,
    defendants: string[] | null, venue_county: string | null, accident_type: AccidentTypes, return_date: Date | null, medical_form?: boolean, index_number?: number,
    form_number?: number, sup_records_room_number?: number, diagnostic_films?: boolean
  ) { 
    this.form_name = form_name; 
    this.shorthand = shorthand; 
    this.form_number = form_number ?? 0; 
    this.state = state;
    this.health_provider_name = health_provider_name;
    this.health_provider_address = health_provider_address; 
    this.medical_form = medical_form ?? false;
    this.medical_accident_date = medical_accident_date;
    this.sub_records_room_number = sup_records_room_number ?? 0; 
    this.courthouse_name = courthouse_name ?? "";
    this.courthouse_address = courthouse_address ?? "";
    this.index_number = index_number ?? 0; 
    this.defendants = defendants;
    this.diagnostic_films = diagnostic_films ?? false;
    this.venue_county = venue_county;
    this.return_date = return_date;
    this.accident_type = accident_type;
    }
}
