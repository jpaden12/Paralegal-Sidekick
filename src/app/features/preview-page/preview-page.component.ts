import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { LocalDbService } from '../../core/local-db.service';
import { FormFieldsService } from '../../core/form-fields.service';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';

@Component({
  selector: 'app-preview-page',
  imports: [],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewPageComponent {

  protected globalState: AppService = inject(AppService);
  protected router: Router = inject(Router);
  protected dbService: LocalDbService = inject(LocalDbService);
  protected formFieldsService: FormFieldsService = inject(FormFieldsService);
  
  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

  formName: string | undefined;
  clientName: string | undefined;
  formPDFLink: string;

  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);

  protected hipaaFormPDF: SafeResourceUrl | null;

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
    this.formPDFLink = "";
    this.hipaaFormPDF = null;
  }

  ngOnInit(): void {
    this.clientName = this.currentClient?.name;
    this.formName = this.currentForm?.formName;
    this.formPDFLink = (this.formName == "HIPAA Authorization") ? 'assets/HIPAAAuthorization.pdf' : 'assets/CourtSubpoena.pdf';
    this.hipaaFormPDF = this.sanitizer.bypassSecurityTrustResourceUrl(this.formPDFLink);
  }

}
