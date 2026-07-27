import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { FormFieldsService } from '../../core/form-fields.service';
import { ClientProfile } from '../../models/client-profile.model';
import { FormFields } from '../../models/form-fields.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-preview-page',
  imports: [MatButton],
  templateUrl: './preview-page.component.html',
  styleUrl: './preview-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewPageComponent {
  protected globalState: AppService = inject(AppService);
  protected router: Router = inject(Router);
  protected formFieldsService: FormFieldsService = inject(FormFieldsService);

  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

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
    const modifiedPdfBytes = await this.buildModifiedPdf(this.formPDFLink);
    const pdfBlob = new Blob([new Uint8Array(modifiedPdfBytes)], { type: 'application/pdf' });
    const pdfObjectUrl = URL.createObjectURL(pdfBlob);

    this.hipaaFormPDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdfObjectUrl);
    this.cdr.markForCheck();
  }

  // Adapted from the "Modify Document" example: https://github.com/Hopding/pdf-lib#modify-document
  private async buildModifiedPdf(pdfLink: string): Promise<Uint8Array> {
    // This should be a Uint8Array or ArrayBuffer
    const existingPdfBytes = await fetch(pdfLink).then((res) => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the height of the first page
    const { height } = firstPage.getSize();

    // Draw the client's name diagonally across the first page
    if (this.currentForm?.healthProviderName) {
      firstPage.drawText(this.currentForm?.healthProviderName, {
        x: 70,
        y: 382,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        // rotate: degrees(-45),
      });
    }

    if (this.currentForm?.healthProviderAddress) {
      firstPage.drawText(this.currentForm?.healthProviderAddress, {
        x: 200,
        y: 382,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
        // rotate: degrees(-45),
      });
    }

    // firstPage.drawText("DRAW ME", {
    //   x: 70,
    //   y: 382,
    //   size: 8,
    //   font: helveticaFont,
    //   color: rgb(0, 0, 0),
    //   // rotate: degrees(-45),
    // });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    return pdfDoc.save();
  }
}
