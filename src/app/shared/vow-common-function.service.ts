import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VowCommonFunctionService {

  constructor() { }

  except_numbers(event){
    let char;
    console.log(event)
    char = event.charCode;
    return ((char == 47) || (char >= 33 && char <= 45) || (char >= 65 && char <= 90) || (char >= 91 && char <= 126));
  }

  except_special_char(event) {
    let char;
    char = event.charCode;
    return ( (char >= 33 && char <= 45) || (char == 47) || (char >= 58 && char <= 64) || (char >= 91 && char <= 96) || (char >= 123 && char <= 126));
  }





}
