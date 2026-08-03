import { Component, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected globalState: AppService = inject(AppService);

  protected currentProfile: ClientProfile | null;
  protected currentProfileName: string;
  protected currentForm: FormFields | null;
  protected currentFormName: string;


  constructor() {
    this.currentForm = this.globalState.form();
    this.currentProfile = this.globalState.profile();

    this.currentFormName = (this.currentForm == null) ? "N/A" : this.currentForm.formName;
    this.currentProfileName = (this.currentProfile == null) ? "N/A" : this.currentProfile.name;


  }

}
