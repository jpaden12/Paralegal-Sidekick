import { Injectable } from '@angular/core';
import { MockClientProfile } from '../models/mock-client-profile.model';
import { Cursor } from '@signaldb/core';
import { ClientProfileService } from './client-profile.service';
import { ClientProfile } from '../models/client-profile.model';


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

  createNewClient(newClient: ClientProfile): void {
    this.clientProfiles.insert(newClient);
    // Catch potential error
  }

  getAllClients(): Cursor<ClientProfile, ClientProfile, ClientProfile> | undefined {
    return this.clientProfiles.find({});
  }

}
