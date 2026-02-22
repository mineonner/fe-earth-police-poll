import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileAttachment } from '../../models/FileAttachment.mode';
import { AlertService } from '../../services/alert.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
    selector: 'm-input-file',
    templateUrl: './m-input-file.component.html',
    styleUrl: './m-input-file.component.scss',
    standalone: false
})
export class MInputFileComponent {
  @Input() mode: string;
  @Input() files: FileAttachment[] = [];
  @Output() filesChange: EventEmitter<any> = new EventEmitter<any>();

  imageTypeFile:string[] = ['png', 'jpg', 'jpeg'];
  documentTypeFile:string[] = ['pdf'];
  videoTypeFile:string[] = ['mp4'];


  constructor(
    private _alert: AlertService) {
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var uploadId = this.newGuid();
          let f = this.makeFile(file, uploadId);
          this._upload(f, uploadId);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  private _upload(uploadingFile: FileAttachment, uploadId: string) {
    let errMsgs: string[] = this.validateFiles(uploadingFile, this.files);
    if (errMsgs.length > 0) {
      this._alert.showAlertArr('error','ตรวจสอบข้อผิดพลาดการแนบไฟล์',errMsgs);
      return;
    }

    this.files.push(uploadingFile);
    this.filesChange.emit(this.files);
  }

  removeFile(file: FileAttachment, index: number) {
      this.files.splice(index, 1)
  }

  validateFiles(uploadingFile: FileAttachment, files: FileAttachment[]) {
    let errMsgs: string[] = [];
    let fileTypes: string[] = uploadingFile.name.split('.') ?? [];
    let fileType: string = (fileTypes[fileTypes.length - 1]).toLowerCase();
    let fileName: string = fileTypes.length > 1 ? fileTypes.slice(0, -1).join('.') : uploadingFile.name;
    let notAllowCharInName:string[] = ['!','@', '#', '$', '%', '^', '&', '*', '<', '>', '\\', '/', ':', '\"', '|' , '?', '+'];
    let checkFileTypes = [...this.imageTypeFile, ...this.documentTypeFile, ...this.videoTypeFile];

    if (fileName.length > 50) errMsgs.push('ชื่อไฟล์ยาวเกินไป')
    if (uploadingFile.size > 10485760) errMsgs.push('ขนาดไฟล์ห้ามเกิน 10MB');
    if (uploadingFile.size == 0) errMsgs.push('ขนาดไฟล์น้อยเกินไป');
    if (!checkFileTypes.some(s => s == fileType)) errMsgs.push(`รองรับไฟล์ ${checkFileTypes.join(', ')}`);
    if (notAllowCharInName.some(s => uploadingFile.name.includes(s))) errMsgs.push('ชื่อไฟล์ต้องไม่มีอักขระพิเศษ !, @, #, $, %, ^, &, *, <, >, \, /, :, ", |, ?, + แบบนี้');
    if (files.length >= 1) errMsgs.push('ห้ามอัพโหลดเกินจำนวน 1 ไฟล์');
    files.forEach(file => {
      if (file.name == uploadingFile.name) errMsgs.push('ชื่อไฟล์ซ้ำกัน')
    })

    return [...new Set(errMsgs)];
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }

  makeFile(file: File, uploadId: string) {
    let f: FileAttachment = {
      name: file.name,
      type: file.type,
      size: file.size,
      file: file,
      path: '',
      // fileId: -1,
      // isUploaded: false,
      // isDelete: false,
      // loader: true,
      // progress: 0,
      // uploadId: uploadId
    };
    return f;
  }

  checkFileType(file , type:string[]){
    let chk = type.find(o => file.type.includes(o));

    return !!chk ? true : false;
  }
}
