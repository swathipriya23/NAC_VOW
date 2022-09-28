import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VowvalidatenumberDirective } from './vowvalidatenumber.directive';
import { VowvalidatestringDirective } from './vowvalidatestring.directive';
import { VowvalidatespecialcharDirective } from './vowvalidatespecialchar.directive';
import { VowvalidatescriptDirective } from './vowvalidatescript.directive';
import { VowvalidatephonenumberDirective } from './vowvalidatephonenumber.directive';
// import { NgxSummernoteModule } from 'ngx-summernote';
import { NgxSummernoteModule } from 'ngx-summernote';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [VowvalidatenumberDirective, VowvalidatestringDirective, VowvalidatespecialcharDirective, VowvalidatescriptDirective, VowvalidatephonenumberDirective, 
    ],
  imports: [
    CommonModule,NgxSummernoteModule,PdfViewerModule
  ],
  exports:[VowvalidatenumberDirective, VowvalidatestringDirective, VowvalidatespecialcharDirective, VowvalidatescriptDirective, VowvalidatephonenumberDirective
    ,NgxSummernoteModule]
})
export class SharedModule { }
