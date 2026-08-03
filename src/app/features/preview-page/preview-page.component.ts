import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { FormFieldsService } from '../../core/form-fields.service';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';
import { PdfGeneratorService } from '../../core/pdf-generator.service';

@Component({
  selector: 'app-preview-page',
  imports: [MatButton, HeaderComponent],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewPageComponent {
  protected globalState: AppService = inject(AppService);
  protected router: Router = inject(Router);
  protected formFieldsService: FormFieldsService = inject(FormFieldsService);
  protected pdfGeneratorService: PdfGeneratorService = inject(PdfGeneratorService)

  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

  protected generatedPDF: Uint8Array<ArrayBufferLike> | undefined;
  protected generatedPDFBlob: Blob | undefined;
  protected pdfURL: string | undefined;

  formName: string | undefined;
  clientName: string | undefined;

  formPDFLink: string;

  private readonly sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected hipaaFormPDF: SafeResourceUrl | null;

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
    this.formPDFLink = '';
    this.hipaaFormPDF = null;
  }

  async ngOnInit(): Promise<void> {
    this.clientName = this.currentClient?.name;
    this.formName = this.currentForm?.formName;
    // this.formPDFLink = (this.formName == "HIPAA Authorization") ? 'assets/HIPAAAuthorization.pdf' : 'assets/OfficeSubpoena.pdf';
    this.formPDFLink = './assets/HIPAAAuthorization.pdf';
    console.log('FORM NAME ' + this.formName);

    this.generatedPDF = await this.pdfGeneratorService.buildHIPAAForm(this.formPDFLink);

    this.cdr.markForCheck();

    this.generatedPDFBlob = new Blob([new Uint8Array(this.generatedPDF)], {
      type: 'application/pdf',
    });
    const pdfObjectUrl = URL.createObjectURL(this.generatedPDFBlob);
    this.pdfURL = pdfObjectUrl;
    this.hipaaFormPDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
    this.pdfURL = pdfObjectUrl;
  }


  downloadGeneratedPDF() {
    const link = document.createElement('a');
    if (this.pdfURL) {
      link.href = this.pdfURL;
    }
    link.download = 'hipaa.pdf';
    link.click();

    window.URL.revokeObjectURL(link.href);
  }
}
