import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  // So we'll output a toggleSidenav property, which will be a new EventEmitter.
  // it automatically imports EventEmitter from Angular Core along with the
  // Output attribute. So whenever the button from the toolbar is pressed 
  // we're going to emit the toggle sidenav event, which we'll listen to in our 
  // sidenav. component to toggle the sidenav.
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

}
