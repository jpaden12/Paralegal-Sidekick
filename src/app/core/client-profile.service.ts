import { Injectable } from '@angular/core';
import angularReactivityAdapter from '@signaldb/angular';
import { Collection } from '@signaldb/core';
import { MockClientProfile } from '../models/mock-client-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService extends Collection<MockClientProfile> {
  constructor() {
    super({
      name: 'client-profile',
      reactivity: angularReactivityAdapter,
    })
  }
}
