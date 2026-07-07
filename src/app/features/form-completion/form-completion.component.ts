import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppService } from '../../app.service';
import { MockClientProfile } from '../../models/mock-client-profile.model';
import { MockForm } from '../../models/mock-form.model';

@Component({
  selector: 'form-completion',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './form-completion.component.html',
  styleUrl: './form-completion.component.css',
})
export class FormCompletionComponent implements OnInit {

  protected globalState: AppService = inject(AppService);
  private currentClient: MockClientProfile | null;
  private currentForm: MockForm | null;
  formName: string | undefined; 
  clientName: string | undefined; 

  form = new FormGroup({
    clientName: new FormControl(''),
    clientDOB: new FormControl<Date | null>(null),
    clientAddress: new FormControl(''),
  });

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
  }

  ngOnInit(): void {
    console.log("Current Client: " + this.currentClient?.name);
    console.log("Current Form: " + this.currentForm?.name);
    this.formName = this.currentForm?.name;
    this.clientName = this.currentClient?.name;

  }


  
}
