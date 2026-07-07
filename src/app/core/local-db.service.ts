import { Injectable } from '@angular/core';
import { MockClientProfile } from '../models/mock-client-profile.model';
import { Collection, Cursor } from '@signaldb/core';
import angularReactivityAdapter from '@signaldb/angular';
import { CollectionsObject } from '../models/collections-object';
import { MockForm } from '../models/mock-form.model';
import { ClientProfileService } from './client-profile.service';


@Injectable({
  providedIn: 'root',
})
export class LocalDbService {

  private clientProfiles: ClientProfileService; 

  constructor() {
    // Check local storage for existing collection. If exesting, import that. 
    // If not existing, create initial collection
    this.clientProfiles = new ClientProfileService();
    
  }

  createNewClient(newClient: MockClientProfile): void {
    this.clientProfiles.insert(newClient);
    // Catch potential error
  }

  getAllClients(): Cursor<MockClientProfile, MockClientProfile, MockClientProfile> | undefined {
    return this.clientProfiles.find({});
  }

}
