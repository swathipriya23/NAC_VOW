import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appVowvalidatephonenumber]',
  providers: [
    { multi: true, useExisting: forwardRef(() => VowvalidatephonenumberDirective), provide: NG_VALIDATORS }
  ]
})

export class VowvalidatephonenumberDirective implements Validator {
  constructor() {
    console.log("call validate")
  }
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log("control inpout value check ----------------> ", control)
    if (control.value && control.value.length != 10  ) {
      console.log("---->phone ")
      return { 'phonenumbervalidation': true };
    }
    return null;
  }

}
