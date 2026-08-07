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
import { AccidentTypes } from '../../models/types';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'form-completion',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './form-completion.component.html',
  styleUrl: './form-completion.component.css',
})
export class FormCompletionComponent implements OnInit {
  protected router: Router = inject(Router);

  protected globalState: AppService = inject(AppService);
  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

  formName: string | undefined;
  formId: number | undefined;
  clientName: string | undefined;

  protected accidentTypes: string[] = Object.keys(AccidentTypes).filter((key) => isNaN(Number(key)));

  pageForm = new FormGroup({
    clientName: new FormControl(''),
    clientDOB: new FormControl<Date | null>(null),
    clientAddress: new FormControl(''),
    healthProviderName: new FormControl(''),
    healthProviderAddress: new FormControl(''),
    healthProviderCityState: new FormControl(''),
    documentDestinationName: new FormControl(''),
    documentDestinationAddress: new FormControl(''),
    medicalForm: new FormControl(false),
    medicalAccidentDate: new FormControl<Date | null>(null),
    accidentType: new FormControl(''),
    subpoenaRecordsRoomNumber: new FormControl(''),
    courthouseName: new FormControl(''),
    courthouseAddress: new FormControl(''),
    indexNumber: new FormControl(''),
    defendants: new FormControl(''),
    litigationLetterCaption: new FormControl(''),
    venueCounty: new FormControl(''),
    returnDate: new FormControl<Date | null>(null),
  });

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
  }

  ngOnInit(): void {
    this.formName = this.currentForm?.formName;
    this.formId = this.currentForm?.formId;
    this.clientName = this.currentClient?.name;

    if (this.currentClient?.name != null) {
      this.pageForm.get('clientName')?.setValue(this.currentClient?.name)
    }
    if (this.currentClient?.address != null) {
      console.log(this.currentClient?.address);
      this.pageForm.get('clientAddress')?.setValue(this.currentClient?.address);
    }
    if (this.currentClient?.date_of_birth != null) {
      this.pageForm.get('clientDOB')?.setValue(this.currentClient?.date_of_birth);
    }
    if (this.currentForm?.accidentType != null) {
      this.pageForm.get('accidentType')?.setValue(AccidentTypes[this.currentForm.accidentType]);
    }
    if (this.currentForm?.litigationLetterCaption != null) {
      this.pageForm.get('litigationLetterCaption')?.setValue(this.currentForm.litigationLetterCaption);
    }
    if (this.currentForm?.venueCounty != null) {
      this.pageForm.get('venueCounty')?.setValue(this.currentForm.venueCounty);
    }
    if (this.currentForm?.defendants != null) {
      this.pageForm.get('defendants')?.setValue(this.currentForm.defendants);
    }
    if (this.currentForm?.returnDate != null) {
      this.pageForm.get('returnDate')?.setValue(this.currentForm.returnDate);
    }


    switch (this.formId) {
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

  proceedToPreview(): void {
    if (this.currentForm) {
      this.currentForm.healthProviderName = this.pageForm.get('healthProviderName')?.getRawValue();
      this.currentForm.healthProviderAddress = this.pageForm
        .get('healthProviderAddress')
        ?.getRawValue();
      this.currentForm.healthProviderCityState = this.pageForm
        .get('healthProviderCityState')
        ?.getRawValue();
      this.currentForm.documentDestinationName = this.pageForm.get('documentDestinationName')?.getRawValue();
      this.currentForm.documentDestinationAddress = this.pageForm.get('documentDestinationAddress')?.getRawValue();
      this.currentForm.medicalForm = this.pageForm.get('medicalForm')?.getRawValue();
      this.currentForm.medicalAccidentDate = this.pageForm.get('medicalAccidentDate')?.getRawValue();
      this.currentForm.subRecordsRoomNumber = this.pageForm
        .get('subpoenaRecordsRoomNumber')
        ?.getRawValue();
      this.currentForm.courthouseName = this.pageForm.get('courthouseName')?.getRawValue();
      this.currentForm.courthouseAddress = this.pageForm.get('courthouseAddress')?.getRawValue();
      this.currentForm.indexNumber = this.pageForm.get('indexNumber')?.getRawValue();
      this.currentForm.defendants = this.pageForm.get('defendants')?.getRawValue();
      const accidentTypeName = this.pageForm.get('accidentType')?.getRawValue();
      if (accidentTypeName) {
        this.currentForm.accidentType = AccidentTypes[accidentTypeName as keyof typeof AccidentTypes];
      }
      this.currentForm.litigationLetterCaption = this.pageForm.get('litigationLetterCaption')?.getRawValue();
      this.currentForm.venueCounty = this.pageForm.get('venueCounty')?.getRawValue();
      this.currentForm.returnDate = this.pageForm.get('returnDate')?.getRawValue();
    }
    this.router.navigate(['/preview']);
  }
}
