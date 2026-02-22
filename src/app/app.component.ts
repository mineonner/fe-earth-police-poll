import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserScreenService } from '../core/services/browser-screen.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {

  constructor(private _screen:BrowserScreenService){}
}
