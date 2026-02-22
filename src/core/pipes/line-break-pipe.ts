import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks',
  standalone: false
})
export class LinebreaksPipe implements PipeTransform {

  transform(text: any): any {
    if(text){
      return text.replace(/\n/g, "<br>");
    }else{
      return '';
    }
  }
}
