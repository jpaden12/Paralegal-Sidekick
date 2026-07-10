import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from '../../app.service';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';

@Component({
  selector: 'form-completion',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './form-completion.component.html',
  styleUrl: './form-completion.component.css',
})
export class FormCompletionComponent implements OnInit {

  protected globalState: AppService = inject(AppService);
  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

  formName: string | undefined; 
  formId: number | undefined;
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
    this.formName = this.currentForm?.formName;
    this.formId = this.currentForm?.formId;
    this.clientName = this.currentClient?.name;
    // 
    switch(this.formId) {

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
