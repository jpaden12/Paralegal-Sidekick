import { Injectable } from '@angular/core';
import { MockForm } from '../models/mock-form.model';
import { FormFields } from '../models/form-fields.model';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormFieldsService {

  private _mockHipaaAuthorization: MockForm;
  private _mockCourtSubpoena: MockForm;
  private _mockOfficeSubpoena: MockForm;

  private _hipaaAuthorization: FormFields;
  private _courtSubpoena: FormFields;

  private _formMap: Record<string, FormFields>;
  

  constructor() {
    this._mockHipaaAuthorization = {id: 1, name: "HIPAA Auth", state: "NY", number: 960}
    this._mockCourtSubpoena = {id: 2, name: "Court Subp", state: "N/A", number: 0}
    this._mockOfficeSubpoena = {id: 3, name: "Court Subp", state: "N/A", number: 0}

    this._hipaaAuthorization = new FormFields(4, "HIPAA Authorization", "HIPAA", "NY", 960, null, null, null, null,
      false, null, false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    this._courtSubpoena = new FormFields(5, "Court Subpoena", "Court Subpoena", "NY", undefined, null, null, undefined,
      undefined, undefined, null, undefined, undefined, undefined, null, null, null, null, null, null, null, undefined);

    this._formMap = {
      "HIPAA Authorization": this._hipaaAuthorization,
      "Court Subpoena": this._courtSubpoena
    }
  }

  get mockHipaaAuthorization(): MockForm {
    return this._mockHipaaAuthorization;
  }

  get mockCourtSubpoena(): MockForm {
    return this._mockCourtSubpoena;
  }

  get mockOfficeSubpoena(): MockForm {
    return this._mockOfficeSubpoena;
  }

  get formMap(): Record<string, FormFields> {
    return this._formMap;
  }

  get hipaaAuthorization(): FormFields {
    return this._hipaaAuthorization;
  }

  get courtSubpoena(): FormFields {
    return this._courtSubpoena;
  }

  // get getOfficeSubpoena(): FormFields {
  //   return this._officeSubpoena;
  // }


}
