import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from '../../app.service';
import { MockClientProfile } from '../../models/mock-client-profile.model';
import { MockForm } from '../../models/mock-form.model';
import { ClientProfile } from '../../models/client-profile.model';

@Component({
  selector: 'form-completion',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './form-completion.component.html',
  styleUrl: './form-completion.component.css',
})
export class FormCompletionComponent implements OnInit {

  protected globalState: AppService = inject(AppService);
  private currentClient: ClientProfile | null;
  private currentForm: MockForm | null;
  formName: string | undefined; 
  clientName: string | undefined; 

  form = new FormGroup({
    clientName: new FormControl(''),
    clientDOB: new FormControl<Date | null>(null),
    clientAddress: new FormControl(''),
    healthProviderName: new FormControl(''),
    healthProviderAddress: new FormControl(''),
    documentDestinationName: new FormControl(''),
    documentDestinationAddress: new FormControl(''),
    medicalForm: new FormControl(false),
    medicalAccidentDate: new FormControl<Date | null>(null),
    accidentType: new FormControl(''),
    subpoenaRecordsRoomNumber: new FormControl(''),
    courthouseName: new FormControl(''),
    courthouseAddress: new FormControl(''),
    indexNumber: new FormControl(''),
  });

  accidentTypes = ['Trip/Fall', 'Car Accident'];

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
  }

  ngOnInit(): void {
    console.log("Current Client: " + this.currentClient?.name);
    console.log("Current Form: " + this.currentForm?.name);
    this.formName = this.currentForm?.name;
    this.clientName = this.currentClient?.name;
    // 
    switch(this.currentForm?.id) {

      case 1: 
        // HIPAA Authorization 
        

        break;
      case 2: 
        // Court Subpoena 

        break;
      case 3: 
        // Office Subpoena

        break;

    }

  }


  
}
