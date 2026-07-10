import { AccidentTypes } from "./types";

export class FormFields {

  // Unique ID
  private _id: number;
  private _formName: string;
  private _shorthand: string;
  private _formNumber: number | null | undefined;
  private _state?: string | null | undefined;

  // #5
  private _healthProviderName?: string | null | undefined;
  private _healthProviderAddress?: string | null | undefined;

  // #6
  private _documentDestinationName?: string | null | undefined;
  private _documentDestinationAddress?: string | null | undefined;

  // 7-10
  private _medicalForm?: boolean | undefined;
  private _medicalAccidentDate?: Date | null | undefined;
  private _diagnosticFilms?: boolean | undefined;

  // 15-21
  private _preLitigationCaption?: string | null | undefined;
  private _litigationLetterCaption?: string | null | undefined;
  private _subRecordsRoomNumber?: number | null | undefined;
  private _courthouseName?: string | null | undefined;
  private _courthouseAddress?: string | null | undefined;

  private _venueCounty?: string | null | undefined;
  private _indexNumber?: number | null | undefined;

  // 22-28
  private _defendants?: string[] | null | undefined;
  private _returnDate?: Date | null | undefined;
  // Add an enum for this type
  private _accidentType?: AccidentTypes | undefined;

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
    this._id = id;
    this._formName = form_name;
    this._shorthand = shorthand;
    this._formNumber = form_number;
    this._state = state;
    this._healthProviderName = health_provider_name;
    this._healthProviderAddress = health_provider_address;
    this._documentDestinationName = document_destination_name;
    this._documentDestinationAddress = document_destination_address;
    this._medicalForm = medical_form;
    this._medicalAccidentDate = medical_accident_date;
    this._subRecordsRoomNumber = sub_records_room_number;
    this._courthouseName = courthouse_name;
    this._courthouseAddress = courthouse_address;
    this._indexNumber = index_number;
    this._defendants = defendants;
    this._diagnosticFilms = diagnostic_films;
    this._venueCounty = venue_county;
    this._returnDate = return_date;
    this._accidentType = accident_type;
    this._preLitigationCaption = pre_litigation_caption;
    this._litigationLetterCaption = litigation_letter_caption;
  }

  get formId(): number { 
    return this._id; 
  }

  get formName(): string { 
    return this._formName; 
  }

  get formShorthand(): string {
     return this._shorthand; 
  }
  
  get formNumber(): number | null | undefined {
    return this._formNumber;
  }

  get formState(): string | null | undefined {
    return this._state;
  }

  get healthProviderName(): string | null | undefined {
    return this._healthProviderName;
  }

  get healthProviderAddress(): string | null | undefined {
    return this._healthProviderAddress;
  }

  get documentDestinationName(): string | null | undefined {
    return this._documentDestinationName;
  }

  get documentDestinationAddress(): string | null | undefined {
    return this._documentDestinationAddress;
  }

  get medicalForm(): boolean | undefined {
    return this._medicalForm;
  }

  get medicalAccidentDate(): Date | null | undefined {
    return this._medicalAccidentDate;
  }

  get diagnosticFilms(): boolean | undefined {
    return this._diagnosticFilms;
  }

  get preLitigationCaption(): string | null | undefined {
    return this._preLitigationCaption;
  }

  get litigationLetterCaption(): string | null | undefined {
    return this._litigationLetterCaption;
  }

  get subRecordsRoomNumber(): number | null | undefined {
    return this._subRecordsRoomNumber;
  }

  get courthouseName(): string | null | undefined {
    return this._courthouseName;
  }

  get courthouseAddress(): string | null | undefined {
    return this._courthouseAddress;
  }

  get venueCounty(): string | null | undefined {
    return this._venueCounty;
  }

  get indexNumber(): number | null | undefined {
    return this._indexNumber;
  }

  get defendants(): string[] | null | undefined {
    return this._defendants;
  }

  get returnDate(): Date | null | undefined {
    return this._returnDate;
  }

  get accidentType(): AccidentTypes | undefined {
    return this._accidentType;
  }
}
