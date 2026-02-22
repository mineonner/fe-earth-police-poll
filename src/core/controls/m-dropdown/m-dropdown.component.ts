import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { BaseOptionDropdownModel } from '../../models/BaseOptionDropdown.model';



@Component({
  selector: 'm-dropdown',
  standalone: false,
  templateUrl: './m-dropdown.component.html',
  styleUrl: './m-dropdown.component.scss'
})
export class MDropdownComponent implements OnChanges {
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @Input() title: string;
  @Input() isRequired: boolean = false;
  @Input() value: any;
  @Input() option: BaseOptionDropdownModel[] = [];
  @Input() disabled: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedChange: EventEmitter<BaseOptionDropdownModel> = new EventEmitter<BaseOptionDropdownModel>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();


  valueObject: BaseOptionDropdownModel;
  filteredBanks: ReplaySubject<any> = new ReplaySubject<any>(1);
  bankFilterCtrl: FormControl<string> = new FormControl<string>('');

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.valueObject = this.option.find(o => o.id == this.value);
    }

    if ('option' in changes) {
      this.filteredBanks.next(this.option.slice());
      this.valueObject = this.option.find(o => o.id == this.value);
    }
  }

  ngOnInit() {


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

    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.option.slice());
    } else {
      // search = search.toLowerCase();
    }
    this.searchChange.emit(search);

    // this.filteredBanks.next(
    //   this.option.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    // );
  }

  onValueChange(obj: BaseOptionDropdownModel) {
    // console.log(obj);
    this.valueChange.emit(obj.id);
    this.selectedChange.emit(obj);
  }

}
