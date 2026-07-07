import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from "@angular/router";
import { AppService } from '../../app.service';
import { MockClientProfile } from '../../models/mock-client-profile.model';
import { MockForm } from '../../models/mock-form.model';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { LocalDbService } from '../../core/local-db.service';


@Component({
  selector: 'home',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatGridListModule, MatButtonModule, RouterLink, ɵInternalFormsSharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  protected globalState: AppService = inject(AppService);
  protected router: Router = inject(Router);
  protected dbService: LocalDbService = inject(LocalDbService);

  protected returnedClients: MockClientProfile[] | undefined;

  
  

  clients: MockClientProfile[] = [
    {
      id: 1,
      name: "Timothy Walz",
      date_of_birth: new Date(1996, 4, 4), 
      home_address: "123 Sesame St", 
      medical_provider: "Sanjay Gupta"
    },
    {
      id: 2,
      name: "SpongeBob SquarePants",
      date_of_birth: new Date(1999, 3, 4), 
      home_address: "123 Sesame St", 
      medical_provider: "Dr. Krabs"
    },
    {
      id: 3,
      name: "Jalen Brunson",
      date_of_birth: new Date(1990, 5, 4), 
      home_address: "Madison Sq Garden", 
      medical_provider: "Sanjay Gupta"
    }
  ]

  forms: MockForm[] = [
    {
      id: 1,
      name: "HIPAA Authorization",
      state: "NY",
      number: 960
    }, 
    {
      id: 2,
      name: "Court Subpoena",
      state: "N/A",
      number: 0
    },
    {
      id: 3,
      name: "Office Subpoena",
      state: "N/A",
      number: 0
    }
  ]

  clientAndFormSelect = new FormGroup({
    clientSelect: new FormControl(''),
    formSelect: new FormControl(''),
  });
  
  ngOnInit(): void {
    
  }

  constructor() {
    this.dbService.createNewClient(this.clients[0]);
    this.dbService.createNewClient(this.clients[1]);
    this.dbService.createNewClient(this.clients[2]);

    effect((onCleanup) => {
      const clientsCursor = this.dbService.getAllClients();
      this.returnedClients = clientsCursor?.fetch();

      onCleanup(() => {
        clientsCursor?.cleanup();
      })
    })
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
      const switchToClient: MockClientProfile | undefined = this.clients.find((client) => { return client.name == selectedClient });
      if (switchToClient != null) {
        this.globalState.setCurrentClientProfile(switchToClient);
      }
    }

    // Update form state
    if (this.clientAndFormSelect.get('formSelect')?.value == "") {

    } else {
      const switchToForm: MockForm | undefined = this.forms.find((form) => { return form.name == selectedForm});
      if (switchToForm != null) {
        this.globalState.setCurrentForm(switchToForm);
      }
    }

    // Switch to form page
    this.router.navigate(['/form'])
  }

  proceedToEditProfiles() {

  }

}
