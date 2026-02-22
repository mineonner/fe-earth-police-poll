import { Component, Input } from '@angular/core';

@Component({
  selector: 'm-loader',
  standalone: false,
  templateUrl: './m-loader.component.html',
  styleUrl: './m-loader.component.scss'
})
export class MLoaderComponent {
  @Input() title:string;
  @Input() theme:any = { 'border-radius': '10px', height: '50px' }
}
