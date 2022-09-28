import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[appVowvalidatenumber]',
  providers: [
    { multi: true, useExisting: forwardRef(() => VowvalidatenumberDirective), provide: NG_VALIDATORS }
  ]
})
export class VowvalidatenumberDirective implements Validator {
  constructor() {
    console.log("call validate")
  }
  
  validate(control: AbstractControl) : {[key: string]: any} | null {
    console.log("control inpout value check ----------------> ", control)
    console.log("control inpout value check ----------------> ", control.value)

    if (control.value && typeof(control.value) && control.value >= 0  ) {
      console.log("---->number ")
      return { 'numbervalidation': true };
    }
    return null;
  }

}
