import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from "@angular/router";
import { AppService } from '../../app.service';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';
import { FormFieldsService } from '../../core/form-fields.service';
import { ClientProfileService } from '../../core/client-profile.service';
import { SqliteClientProfileService } from '../../core/sqlite-client-profile.service';
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
  selector: 'home',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule,
    MatGridListModule, MatButtonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  protected globalState: AppService = inject(AppService);
  protected router: Router = inject(Router);
  protected formFieldsService: FormFieldsService = inject(FormFieldsService);
  protected clientProfileService: ClientProfileService = inject(ClientProfileService);
  protected sqliteClientProfileService: SqliteClientProfileService = inject(SqliteClientProfileService);

  protected returnedClients: ClientProfile[] | undefined;
  protected sqliteClients: ClientProfile[] = [];

  protected _forms: Record<string, FormFields>;
  protected forms: FormFields[] = [];


  clients: ClientProfile[] = [
    {
      id: 1,
      name: "Khloe Kardashian",
      date_of_birth: new Date(),
      ssn: 1,
      address: "string",

      medical_provider_name: "The Doctor",
      medical_provider_address: "123 Medical Street",
      savedForms: [],
    },
    {
      id: 2,
      name: "Patrick Mahomes",
      date_of_birth: new Date(),
      ssn: 2,
      address: "string",

      medical_provider_name: "The Doctor",
      medical_provider_address: "123 Physicans Drive",
      savedForms: [],
    },
    {
      id: 3,
      name: "Jerry Seinfeld",
      date_of_birth: new Date(),
      ssn: 3,
      address: "string",

      medical_provider_name: "The Doctor",
      medical_provider_address: "123 Nursing Avenue",
      savedForms: [],
    },
    {
      id: 4,
      name: "Lin-Manuel Miranda",
      date_of_birth: new Date(),
      ssn: 4,
      address: "string",

      medical_provider_name: "The Doctor",
      medical_provider_address: "123 Feelbetter Blvd",
      savedForms: [],
    },
  ]

  clientAndFormSelect = new FormGroup({
    clientSelect: new FormControl(''),
    formSelect: new FormControl(''),
  });

  ngOnInit(): void {

  }

  constructor() {
    // Replace with data persistence
    // this.clientProfileService.createNewClient(this.clients[0]);
    // this.clientProfileService.createNewClient(this.clients[1]);
    // this.clientProfileService.createNewClient(this.clients[2]);
    // this.clientProfileService.createNewClient(this.clients[3]);

    this._forms = this.formFieldsService.formMap;
    this.forms[0] = this._forms["HIPAA Authorization"];
    this.forms[1] = this._forms["Court Subpoena"];

    this.sqliteClients = this.sqliteClientProfileService.getAllProfiles();
  }

  onClientChange(event: MatSelectChange) {
    console.log(event.value);
  }

  onFormChange(event: MatSelectChange) {
    console.log(event.value);
  }

  proceedToForm() {
    // Check if profile and form fields are filled out. Illuminate forms if
    // they aren't.
    const selectedClient: string = this.clientAndFormSelect.get('clientSelect')?.getRawValue();
    const selectedForm: string = this.clientAndFormSelect.get('formSelect')?.getRawValue();

    // Update client state
    if (this.clientAndFormSelect.get('clientSelect')?.value == "") {

      // Show an error message
    } else {
      // Update the global state with the selected client
      const switchToClient: ClientProfile | undefined = this.clients.find((client) => { return client.name == selectedClient });
      if (switchToClient != null) {
        this.globalState.setCurrentClientProfile(switchToClient);
      }
    }

    // Update form state
    if (this.clientAndFormSelect.get('formSelect')?.getRawValue() == "") {

    } else {
      const formToSwitchTo: FormFields = this.formFieldsService.formMap[selectedForm];
      this.globalState.setCurrentForm(formToSwitchTo);
    }

    // Switch to form page
    this.router.navigate(['/form'])
  }

  proceedToEditProfiles() {
    const selectedClient: string = this.clientAndFormSelect.get('clientSelect')?.getRawValue();
    const selectedForm: string = this.clientAndFormSelect.get('formSelect')?.getRawValue();

    if (this.clientAndFormSelect.get('clientSelect')?.value == "") {

      // Show an error message
    } else {
      // Update the global state with the selected client
      const switchToClient: ClientProfile | undefined = this.clients.find((client) => { return client.name == selectedClient });
      if (switchToClient != null) {
        this.globalState.setCurrentClientProfile(switchToClient);
      }
    }

      // Update form state
    if (this.clientAndFormSelect.get('formSelect')?.getRawValue() == "") {

    } else {
      const formToSwitchTo: FormFields = this.formFieldsService.formMap[selectedForm];
      this.globalState.setCurrentForm(formToSwitchTo);
    }

    this.router.navigate(['/preview'])
  }

}
