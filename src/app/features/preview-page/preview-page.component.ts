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

    // Draw the health provider name
    if (this.currentForm?.healthProviderName) {
      firstPage.drawText(this.currentForm?.healthProviderName, {
        x: 70,
        y: 382,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });
    }
    // Draw the health provider address
    if (this.currentForm?.healthProviderAddress) {
      firstPage.drawText(this.currentForm?.healthProviderAddress, {
        x: 200,
        y: 382,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),

      });
    }

    // Draw the patient's name
    if (this.currentClient?.name != null) {
      firstPage.drawText(this.currentClient?.name, {
        x: 60,
        y: 670,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0)
      });
    }

    // Draw the patient's DOB
    if (this.currentClient?.date_of_birth != null) {
      firstPage.drawText(this.currentClient?.date_of_birth.toISOString().split('T')[0], {
        x: 332,
        y: 670,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Draw the patient's SSN (same row as Patient Name / DOB)
    if (this.currentClient?.ssn != null) {
      firstPage.drawText(this.currentClient?.ssn.toString(), {
        x: 450,
        y: 670,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Draw the patient's address
    if (this.currentClient?.address) {
      firstPage.drawText(this.currentClient?.address, {
        x: 60,
        y: 644,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Item 10: mark the "At request of individual" reason-for-release checkbox
    firstPage.drawText('X', {
      x: 75,
      y: 183,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Item 11: date/event on which this authorization will expire
    firstPage.drawText('Upon completion of litigation', {
      x: 310,
      y: 183,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Item 12: name of person signing form, if not the patient
    firstPage.drawText('Barry Woolfson, Esq.', {
      x: 70,
      y: 149,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Item 13: authority to sign on behalf of patient
    firstPage.drawText('Attorney in Fact -- See LPOA on back of this form', {
      x: 310,
      y: 149,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Draw the document destination name (Item 8, left half of the blank line)
    if (this.currentForm?.documentDestinationName) {
      firstPage.drawText(this.currentForm?.documentDestinationName, {
        x: 70,
        y: 359,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Draw the document destination address (Item 8, right half of the blank line)
    if (this.currentForm?.documentDestinationAddress) {
      firstPage.drawText(this.currentForm?.documentDestinationAddress, {
        x: 200,
        y: 359,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Mark the "Medical Record from (date) to (date)" checkbox in Item 9(a)
    if (this.currentForm?.medicalForm) {
      firstPage.drawText('X', {
        x: 77,
        y: 335,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Draw the accident date into the "from (insert date)" blank on that same line
    if (this.currentForm?.medicalAccidentDate != null) {
      firstPage.drawText(this.currentForm?.medicalAccidentDate.toISOString().split('T')[0], {
        x: 215,
        y: 335,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    firstPage.drawText("Present", {
      x: 370,
      y: 335,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });



    // Serialize the PDFDocument to bytes (a Uint8Array)
    return pdfDoc.save();
  }
}
