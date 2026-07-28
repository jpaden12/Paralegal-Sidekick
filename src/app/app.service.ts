import { Injectable, signal } from '@angular/core';
import { ClientProfile } from './models/client-profile.model';
import { FormFields } from './models/form-fields.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _profile = signal<ClientProfile | null>(null);
  readonly profile = this._profile.asReadonly();

  private _form = signal<FormFields | null>(null);
  readonly form = this._form.asReadonly();

  setCurrentForm(newForm: FormFields) {
    this._form.set(newForm);
  }

  setCurrentClientProfile(newProfile: ClientProfile) {
    this._profile.set(newProfile);
  }

}
