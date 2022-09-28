import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appVowvalidatespecialchar]',
  providers: [
    { multi: true, useExisting: forwardRef(() => VowvalidatespecialcharDirective), provide: NG_VALIDATORS }
  ]
})
export class VowvalidatespecialcharDirective implements Validator {
  constructor() {
    console.log("call validate special char")
  }
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log("control inpout value check ----------------> ", control)
    if (control.value ) {
      console.log("---->phone ")
      return { 'specialcharvalidation': true };
    }
    return null;
  }

}
