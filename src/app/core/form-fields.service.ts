import { Injectable } from '@angular/core';
import { FormFields } from '../models/form-fields.model';

@Injectable({
  providedIn: 'root',
})
export class FormFieldsService {

  private _hipaaAuthorization: FormFields;
  private _courtSubpoena: FormFields;
  private _formMap: Record<string, FormFields>;
  

  constructor() {

    this._hipaaAuthorization = new FormFields(4, "HIPAA Authorization", "HIPAA", "NY", 960, null, null, null, null,
      false, null, false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

    this._courtSubpoena = new FormFields(5, "Court Subpoena", "Court Subpoena", "NY", undefined, null, null, undefined,
      undefined, undefined, null, undefined, undefined, undefined, null, null, null, null, null, null, null, undefined);

    this._formMap = {
      "HIPAA Authorization": this._hipaaAuthorization,
      "Court Subpoena": this._courtSubpoena
    }
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
