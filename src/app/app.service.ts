import { Injectable, signal } from '@angular/core';
import { ClientProfile } from './models/client-profile.model';
import { FormFields } from './models/form-fields.model';
import { MockForm } from './models/mock-form.model';
import { MockClientProfile } from './models/mock-client-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _profile = signal<ClientProfile | null>(null);
  readonly profile = this._profile.asReadonly(); 

  private _form = signal<FormFields | null>(null);
  readonly form = this._form.asReadonly();


  private _count = signal(0);  
  readonly count = this._count.asReadonly();


  increment() {
    this._count.update(val => val + 1);
  }

  setProfile(newProfile: ClientProfile) {
    let currentName: string = this.profile.name;
    if (newProfile != undefined) {
      this._profile.set(newProfile);
    }
  }

  setFormFields(newForm: string) {
    // let currentForm: string = 
  }

  setCurrentForm(newForm: FormFields) {
    this._form.set(newForm);
  }

  setCurrentClientProfile(newProfile: ClientProfile) {
    this._profile.set(newProfile);
  }
  
}
