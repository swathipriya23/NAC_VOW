import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appVowvalidatestring]',
  providers: [
    { multi: true, useExisting: forwardRef(() => VowvalidatestringDirective), provide: NG_VALIDATORS }
  ]
})
export class VowvalidatestringDirective implements Validator {
  constructor() {
    console.log("call validate string check")
  }
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log("control input value check ----------------> ", control)
    if (control.value && typeof(control.value) == 'string'  ) {
      console.log("---->string ")
      return { 'stringvalidation': true };
    }
    return null;
  }

}
