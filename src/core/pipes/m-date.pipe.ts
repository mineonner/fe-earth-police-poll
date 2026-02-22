import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_FORMAT = 'dd MMM yyyy';

@Pipe({
  name: 'mDate',
  standalone: false
})
export class MDatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){

  }
  transform(value: Date | string | number, haveTime: boolean = false): string | null {
    if (!!value) {
      let d = new Date(value);
      let monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
      "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม"];

      let dayNames = ["วันอาทิตย์ที่","วันจันทร์ที่","วันอังคารที่","วันพุทธที่","วันพฤหัสบดีที่","วันศุกร์ที่","วันเสาร์ที่"];

      let monthNamesEng = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        let dayNamesEng = ['Sunday','Monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        if(haveTime){
          const hours = String(d.getHours()).padStart(2, '0');
          const minutes = String(d.getMinutes()).padStart(2, '0');
          return `${d.getDate()} ${monthNamesThai[d.getMonth()]} ${d.getFullYear()}  ${hours}:${minutes}`
        }else{
          return `${d.getDate()} ${monthNamesThai[d.getMonth()]} ${d.getFullYear()}`
        }

    } else {
      return null;
    }

  }

}
