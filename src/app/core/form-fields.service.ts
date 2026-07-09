import { Injectable } from '@angular/core';
import { MockForm } from '../models/mock-form.model';
import { FormFields } from '../models/form-fields.model';

@Injectable({
  providedIn: 'root',
})
export class FormFieldsService {

  private MockHipaaAuthorization: MockForm;
  private MockCourtSubpoena: MockForm;
  private MockOfficeSubpoena: MockForm;

  private hipaaAuthorization: FormFields;
  private courtSubpoena: FormFields;
  // private officeSubpoena: FormFields;

  constructor() {
    this.MockHipaaAuthorization = {id: 1, name: "HIPAA Auth", state: "NY", number: 960}
    this.MockCourtSubpoena = {id: 2, name: "Court Subp", state: "N/A", number: 0}
    this.MockOfficeSubpoena = {id: 3, name: "Court Subp", state: "N/A", number: 0}

    this.hipaaAuthorization = new FormFields(4, "HIPAA Authorization", "HIPAA", "NY", 960, null, null, null, null, 
      false, null, false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined); 

    this.courtSubpoena = new FormFields(5, "Court Subpoena", "Court Subpoena", "NY", undefined, null, null, undefined, 
      undefined, undefined, null, undefined, undefined, undefined, null, null, null, null, null, null, null, undefined);
  }

  
  get mockHipaaAuthorization(): MockForm { 
    return this.MockHipaaAuthorization; 
  }

  get mockCourtSubpoena(): MockForm { 
    return this.MockCourtSubpoena;
  }

  get mockOfficeSubpoena(): MockForm { 
    return this.MockOfficeSubpoena; 
  }

  get getHipaaAuthorization(): FormFields {
    return this.hipaaAuthorization; 
  }

  get getCourtSubpoena(): FormFields { 
    return this.courtSubpoena; 
  }

  // get getOfficeSubpoena(): FormFields {
  //   return this.officeSubpoena; 
  // }


}
