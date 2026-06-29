import { Injectable, signal } from '@angular/core';
import { ClientProfile } from './models/client-profile';
import { FormFields } from './models/form-fields';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  private _profile = signal<ClientProfile>({name: ""});
  readonly profile = this._profile.asReadonly(); 
  
  // private currentForm: FormFields;

  private _count = signal(0);  
  readonly count = this._count.asReadonly();


  increment() {
    this._count.update(val => val + 1);
  }

  setProfile(newProfile: string) {
    let currentName: string = this.profile.name;
    this._profile.update(prof => 
      ({ ...prof, name: newProfile }));
  }

  setFormFields(newForm: string) {
    // let currentForm: string = 
  }
  
}
