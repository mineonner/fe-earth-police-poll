import { Injectable } from "@angular/core";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root'
})
export class MUtilsService {
  randomId(length: number = 10): string {
    const crypto = window.crypto;
    let array = new Uint8Array(length);
    crypto.getRandomValues(array); // Compliant for security-sensitive use cases
    return window.btoa(String.fromCharCode(...array));
  }

  clone(value){
    let valueString = JSON.stringify(value);
    return JSON.parse(valueString);
  }

  exportJsonToExcel(data: any, fileName:string = 'example.xlsx'){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const dataBlob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    FileSaver.saveAs(dataBlob, fileName);
  }
}
