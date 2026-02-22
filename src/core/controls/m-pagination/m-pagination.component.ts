import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'm-pagination',
  templateUrl: './m-pagination.component.html',
  styleUrl: './m-pagination.component.scss',
  standalone: false
})
export class MPaginationComponent implements OnChanges {
  @Input() items: Array<any> = [];
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions = [10, 15, 20, 25];

  @Output() changePage = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if('items' in changes){
      if(changes['items'].currentValue !== changes['items'].previousValue && changes['items'].currentValue.length > 0){
        console.log('this.pageIndex',this.pageIndex);
        this.handlePageEvent({
          pageIndex : 0,
          pageSize : this.pageSize,
          length: changes['items'].currentValue.length,
        })
      }
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    let startIndex:number = this.pageSize * this.pageIndex;
    let endIndex:number = startIndex + this.pageSize;
    let itemsOfPage =  this.items.slice(startIndex, endIndex);
    this.changePage.emit(itemsOfPage);
  }
}
