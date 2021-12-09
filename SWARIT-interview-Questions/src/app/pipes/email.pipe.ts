import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  
  transform(input: string, position:string, textAppend:string): string {
    return position === 'pre'? textAppend + input : input + textAppend ;
  }

}
