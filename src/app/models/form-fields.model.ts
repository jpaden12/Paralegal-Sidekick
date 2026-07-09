import { AccidentTypes } from "./types";

export class FormFields {

  // Unique ID
  private id: number;
  private form_name: string; 
  private shorthand: string;
  private form_number: number | undefined; 
  private state?: string | null | undefined; 

  // #5 
  private health_provider_name?: string | null | undefined; 
  private health_provider_address?: string | null | undefined; 

  // #6 
  private document_destination_name?: string | null | undefined; 
  private document_destination_address?: string | null | undefined;

  // 7-10
  private medical_form?: boolean | undefined; 
  private medical_accident_date?: Date | null | undefined; 
  private diagnostic_films?: boolean | undefined; 

  // 15-21
  private pre_litigation_caption?: string | null | undefined;
  private litigation_letter_caption?: string | null | undefined;
  private sub_records_room_number?: number | undefined; 
  private courthouse_name?: string | null | undefined; 
  private courthouse_address?: string | null | undefined; 
  
  
  private venue_county?: string | null | undefined; 
  private index_number?: number | undefined; 

  // 22-28
  private defendants?: string[] | null | undefined; 
  private return_date?: Date | null | undefined; 
  // Add an enum for this type
  private accident_type?: AccidentTypes | undefined; 

  constructor(
    id: number,
    form_name: string, 
    shorthand: string, 
    state: string | null,
    form_number: number | null | undefined, 

    health_provider_name?: string | null | undefined, 
    health_provider_address?: string | null | undefined, 

    document_destination_name?: string | null | undefined, 
    document_destination_address?: string | null | undefined,

    medical_form?: boolean | undefined, 
    medical_accident_date?: Date | null | undefined, 
    diagnostic_films?: boolean | undefined,

    pre_litigation_caption?: string | null | undefined,
    litigation_letter_caption?: string | null | undefined,
    sub_records_room_number?: number | null | undefined, 
    courthouse_name?: string | null | undefined, 
    courthouse_address?: string | null | undefined,

    venue_county?: string | null | undefined, 
    index_number?: number | null | undefined, 

    defendants?: string[] | null | undefined,
    return_date?: Date | null | undefined, 
    accident_type?: AccidentTypes | undefined, 
    
    
  ) { 
    this.id = id; 
    this.form_name = form_name; 
    this.shorthand = shorthand; 
    this.form_number = form_number ?? 0; 
    this.state = state;
    this.health_provider_name = health_provider_name;
    this.health_provider_address = health_provider_address; 
    this.document_destination_name = document_destination_name;
    this.document_destination_address = document_destination_address;
    this.medical_form = medical_form ?? false;
    this.medical_accident_date = medical_accident_date;
    this.sub_records_room_number = sub_records_room_number ?? 0; 
    this.courthouse_name = courthouse_name ?? "";
    this.courthouse_address = courthouse_address ?? "";
    this.index_number = index_number ?? 0; 
    this.defendants = defendants;
    this.diagnostic_films = diagnostic_films ?? false;
    this.venue_county = venue_county;
    this.return_date = return_date;
    this.accident_type = accident_type;
    this.pre_litigation_caption = pre_litigation_caption;
    this.litigation_letter_caption = litigation_letter_caption;
    }
}
