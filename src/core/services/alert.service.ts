import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert(icon: SweetAlertIcon, title: string = 'Title Message', message: string = 'Test description message !!') {
    let confirmButtonColorList = {
       success : '#a5dc86',
       error: '#f27474',
       warning: '#f27474',
       info: '#f27474',
       question: '#f27474',
     }
     return Swal.fire({
       title: title,
       html: message,
       icon: icon,
       confirmButtonText: 'ตกลง',
       confirmButtonColor: confirmButtonColorList[icon]
     });
   }

   confirmAlert(title: string = 'Title Message', message: string = 'Test description message !!') {
      return Swal.fire({
        title: title,
        html: message,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#a5dc86',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        cancelButtonColor: '#f27474',
      });
    }

   showAlertArr(icon: SweetAlertIcon, title: string = 'Validate error', msgs: string[]): Promise<SweetAlertResult> {
     let msg = '<ul class="validate-error">';

     msgs.forEach(o => {
       msg += `<li>${o}</li>`;
     })

     msg += '</ul>'

     return this.alert(icon, title, msg);
   }
}
