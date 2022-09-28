import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appVowvalidatescript]',
  providers: [
    { multi: true, useExisting: forwardRef(() => VowvalidatescriptDirective), provide: NG_VALIDATORS }
  ]
})
export class VowvalidatescriptDirective implements Validator {
  constructor() {
    console.log("call validate script")
  }
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log("control inpout value check ----------------> ", control)
    if (control.value && control.value.contains('<script>')  ) {
      console.log("---->phone ")
      return { 'scriptvalidation': true };
    }
    return null;
  }

}
