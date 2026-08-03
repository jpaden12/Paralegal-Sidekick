import { inject, Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { ClientProfile } from '../models/client-profile.model';
import { FormGroup } from '@angular/forms';
import { FormFields } from '../models/form-fields.model';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {

  protected globalState: AppService = inject(AppService);
  protected currentClient: ClientProfile | null;
  protected currentForm: FormFields | null;

  constructor() {
    this.currentClient = this.globalState.profile();
    this.currentForm = this.globalState.form();
  }

  async buildHIPAAForm(pdfLink: string): Promise<Uint8Array> {
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
        color: rgb(0, 0, 0),
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
        color: rgb(0, 0, 0),
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
      y: 185,
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
        y: 325,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    // Draw the accident date into the "from (insert date)" blank on that same line
    if (this.currentForm?.medicalAccidentDate != null) {
      firstPage.drawText(this.currentForm?.medicalAccidentDate.toISOString().split('T')[0], {
        x: 215,
        y: 337,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    }

    firstPage.drawText('Present', {
      x: 370,
      y: 337,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    return pdfDoc.save();
  }

  static async buildCourtSubpoenaForm(pdfLink: string) {

  }
}
