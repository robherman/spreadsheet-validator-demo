import { Component, ViewChild, ElementRef } from '@angular/core';
import { XlsxLibService, XlsxSetting, XlsxValidationErrors } from 'xlsx-lib';
import { ValidationFunctions } from './validation-functions/validation-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spreadsheet-validator-demo';

  @ViewChild('settings') settingsControl: ElementRef;
  file: any;

  errors: XlsxValidationErrors;
  data: any;
  originalData: any;
  
  loading: boolean;

  constructor(public xlsxLibService: XlsxLibService) {

  }

  public fileChangeEvent(evt: any): void {

    this.file = evt;

  }
  public ProcesarArchivo() {
    this.errors = null;
    const xlsxSettings = JSON.parse(this.settingsControl.nativeElement.value) as XlsxSetting;

    if (xlsxSettings.columnProperties) {
      for (const property of xlsxSettings.columnProperties) {
        if (property.customValidationRule) {
          property.customValidationRule.functions = new ValidationFunctions();
        }
      }
    }

    this.loading = true;
    this.xlsxLibService.loadAndValidate(this.file, xlsxSettings).subscribe(result => {
      this.loading = false;
      if (result.errors && (result.errors.columnFormatErrors.length > 0 || result.errors.dataValidationErrors.length > 0)) {
        this.errors = result.errors;
      }
      this.data = result.data;
      this.originalData = result.originalData;
    });
  }

}

