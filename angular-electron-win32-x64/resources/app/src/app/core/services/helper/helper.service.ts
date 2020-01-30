import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  splitCharByNChar(n: number, string: string){
    return string.match(/.{1,2}/g);
  }

  addStringsTogether(strings: string[], seperator: string){
    let str = "";
    for(let i = 0; i<strings.length; i++){
      str += strings[i];
      if(i<strings.length-1){
        str += seperator;
      }
    }
    return str;
  }
}
