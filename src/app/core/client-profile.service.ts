import { Injectable } from '@angular/core';
import angularReactivityAdapter from '@signaldb/angular';
import { Collection } from '@signaldb/core';
import { MockClientProfile } from '../models/mock-client-profile.model';
import { ClientProfile } from '../models/client-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService extends Collection<ClientProfile> {
  constructor() {
    super({
      name: 'client-profile',
      reactivity: angularReactivityAdapter,
    })
  }
}
