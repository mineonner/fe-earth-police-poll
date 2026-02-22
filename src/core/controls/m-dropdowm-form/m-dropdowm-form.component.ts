import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { BaseOptionDropdownModel } from '../../models/BaseOptionDropdown.model';

@Component({
  selector: 'm-dropdowm-form',
  standalone: false,
  templateUrl: './m-dropdowm-form.component.html',
  styleUrl: './m-dropdowm-form.component.scss'
})
export class MDropdowmFormComponent {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @Input() title: string;
  @Input() placeholder: string;
  @Input('control') f: FormControl = new FormControl();
  @Input() disabled: boolean = false;
  @Input() serverSide: boolean = true;
  @Input() option: BaseOptionDropdownModel[] = [];

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedChange: EventEmitter<BaseOptionDropdownModel> = new EventEmitter<BaseOptionDropdownModel>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();



  private _unsubscribeAll: Subject<any> = new Subject<any>();
  valueObject: FormControl<any> = new FormControl<any>(null);
  filteredBanks: ReplaySubject<any> = new ReplaySubject<any>(1);
  bankFilterCtrl: FormControl<string> = new FormControl<string>('');

  ngOnChanges(changes: SimpleChanges): void {

    if ('f' in changes) {
      // this.valueObject.setValue(this.option.find(o => o.id == this.f.value));
      this.valueObject.setValidators(this.f.validator);
      this.valueObject.setAsyncValidators(this.f.asyncValidator);
      this.valueObject.updateValueAndValidity();
    }

    if ('option' in changes) {
      this.filteredBanks.next(this.option.slice());
      this.valueObject.setValue(this.option.find(o => o.id == this.f.value));
    }

    if ('disabled' in changes) {
      if (this.disabled) {
        this.valueObject.disable();
      } else {
        this.valueObject.enable();
      }
    }
  }

  ngOnInit() {

    this.f.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.valueObject.setValue(this.option.find(o => o.id == value));
      });

    this.filteredBanks.next(this.option.slice());

    this.bankFilterCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.filterBanks();
      });
  }

  filterBanks() {
    if (!this.option) {
      return;
    }



    if (!this.serverSide) {
      let search = this.bankFilterCtrl.value;
      if (!search) {
        this.filteredBanks.next(this.option.slice());
      } else {
        search = search.toLowerCase();
      }

      this.filteredBanks.next(
        this.option.filter(bank => bank.name.toLowerCase().indexOf(search) > -1 || bank.id == this.f.value)
      );
    } else {
      this.searchChange.emit(this.bankFilterCtrl.value);
    }
  }

  onValueChange(obj) {
    this.f.setValue(obj.id);
    this.valueChange.emit(obj.id);
    this.selectedChange.emit(obj);
  }

  get isRequired() { return this.valueObject?.hasValidator(Validators.required); }
}
