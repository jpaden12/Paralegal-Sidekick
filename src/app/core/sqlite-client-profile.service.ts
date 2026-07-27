import { Injectable } from '@angular/core';
import { ClientProfile } from '../models/client-profile.model';
import { ClientProfileRow } from './sqlite-bridge';

@Injectable({
  providedIn: 'root',
})
export class SqliteClientProfileService {
  getAllProfiles(): ClientProfile[] {
    const rows = window.sqlite?.clientProfiles.readAllProfiles() ?? [];
    return rows.map((row) => this.toClientProfile(row));
  }

  private toClientProfile(row: ClientProfileRow): ClientProfile {
    return {
      id: row.id,
      name: row.name,
      date_of_birth: row.date_of_birth ? new Date(row.date_of_birth) : undefined,
      address: row.address ?? undefined,
      medical_provider_name: row.medical_provider_name ?? undefined,
      medical_provider_address: row.medical_provider_address ?? undefined,
      savedForms: [],
    };
  }
}
