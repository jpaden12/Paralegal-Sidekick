import { Injectable } from '@angular/core';
import angularReactivityAdapter from '@signaldb/angular';
import { Collection, Cursor } from '@signaldb/core';
import { ClientProfile } from '../models/client-profile.model';
import createFileSystemAdapter from '@signaldb/fs'

@Injectable({
  providedIn: 'root',
})
export class ClientProfileService extends Collection<ClientProfile> {
  constructor() {
    super({
      name: 'client-profile',
      reactivity: angularReactivityAdapter,
    });
  }

  getAllClients(): Cursor<ClientProfile, ClientProfile, ClientProfile> {
    // TODO: Error Handling
    return this.find();
  }

  createNewClient(newProf: ClientProfile): number {
    // TODO: Error Handling
    return this.insert(newProf);
  }




}
