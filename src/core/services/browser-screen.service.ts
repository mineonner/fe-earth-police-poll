import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DataShareService } from "./data-share.service";
import { appCoreConfig } from "../core-configs/app-core-config";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class BrowserScreenService {

  constructor(private _dataShare:DataShareService,
    @Inject(DOCUMENT) private _document: Document,
  ){
    this.adjustWindowWidth();
    window.addEventListener('resize', () => {
      this.adjustWindowWidth();
    });
  }

  adjustWindowWidth() {

    // this._dataShare.setMobile(true);
    let isMobile:boolean = window.innerWidth < appCoreConfig.screens.sm
    let isTablet: boolean = window.innerWidth < appCoreConfig.screens.md && window.innerWidth > appCoreConfig.screens.sm
    let isSmallDesktop: boolean = window.innerWidth < appCoreConfig.screens.lg && window.innerWidth > appCoreConfig.screens.md

    this._dataShare.setMobile(isMobile);
    this._dataShare.setTablet(isTablet);
    this._dataShare.setSmallDesktop(isSmallDesktop);

    if (isMobile) {
      this._document.body.classList.add('mobile');
      // this._document.documentElement.classList.add('mobile', 'responsive');
    }
    else {
      this._document.body.classList.remove('mobile');
      // this._document.documentElement.classList.remove('mobile', 'responsive');
    }

    if (isTablet) {
      this._document.body.classList.add('tablet');
      // this._document.documentElement.classList.add('tablet', 'responsive');
    }
    else {
      this._document.body.classList.remove('tablet');
      // this._document.documentElement.classList.remove('tablet', 'responsive');
    }

    if (isSmallDesktop) {
      this._document.body.classList.add('small-desktop');
      // this._document.documentElement.classList.add('small-desktop', 'responsive');
    }
    else {
      this._document.body.classList.remove('small-desktop');
      // this._document.documentElement.classList.remove('small-desktop', 'responsive');
    }

    if(isMobile || isTablet || isSmallDesktop){
      this._document.body.classList.add('responsive');
    }else{
      this._document.body.classList.remove('responsive');
    }
  }




}
