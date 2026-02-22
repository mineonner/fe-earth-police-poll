import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MRadioFormModule } from './m-radio-form/m-radio-form.module';
import { MRadioModule } from './m-radio/m-radio.module';
import { MInputFormModule } from './m-input-form/m-input-form.module';
import { MInputModule } from './m-input/m-input.module';
import { MCheckboxFormModule } from './m-checkbox-form/m-checkbox-form.module';
import { MCheckboxModule } from './m-checkbox/m-checkbox.module';
import { MTextareaFormModule } from './m-textarea-form/m-textarea-form.module';
import { MTextareaModule } from './m-textarea/m-textarea.module';
import { MInputFileModule } from './m-input-file/m-input-file.module';
import { MGoogleMapModule } from './m-google-map/m-google-map.module';
import { MSpinnerModule } from './m-spinner/m-spinner.module';
import { MNumericFormModule } from './m-numeric-form/m-numeric-form.module';
import { MNumericModule } from './m-numeric/m-numeric.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MPaginationModule } from './m-pagination/m-pagination.module';
import { MDatePipe } from '../pipes/m-date.pipe';
import { MDialogModule } from './m-dialog/m-dialog.module';
import { MDatepickerFormModule } from './m-datepicker-form/m-datepicker-form.module';
import { MDatepickerModule } from './m-datepicker/m-datepicker.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MDateRangePickerModule } from './m-date-range-picker/m-date-range-picker.module';
import { MDateRangePickerFormModule } from './m-date-range-picker-form/m-date-range-picker-form.module';
import { CALENDAR_FORMATS } from '../services/data-share.service';
import 'moment/locale/th';
import { LinebreaksPipe } from '../pipes/line-break-pipe';
import { MLoaderModule } from './m-loader/m-loader.module';
import { MDropdownModule } from './m-dropdown/m-dropdown.module';
import { MDropdowmFormModule } from './m-dropdowm-form/m-dropdowm-form.module';

let moduleImportExports = [
  MRadioFormModule,
  MRadioModule,
  MInputFormModule,
  MInputModule,
  MCheckboxFormModule,
  MCheckboxModule,
  MTextareaFormModule,
  MTextareaModule,
  MInputFileModule,
  MGoogleMapModule,
  MSpinnerModule,
  MNumericFormModule,
  MNumericModule,
  MatTooltipModule,
  MPaginationModule,
  MDialogModule,
  MDatepickerFormModule,
  MDatepickerModule,
  MDateRangePickerModule,
  MDateRangePickerFormModule,
  MLoaderModule,
  MDropdownModule,
  MDropdowmFormModule
]

@NgModule({
  declarations: [MDatePipe, LinebreaksPipe],
  imports: [
    CommonModule,
    ...moduleImportExports
  ],
  exports: [
    ...moduleImportExports,
    MDatePipe, LinebreaksPipe
  ],
  providers:[
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: "th-TH"},
    provideMomentDateAdapter(CALENDAR_FORMATS),
  ]
})
export class ControlsModule { }
