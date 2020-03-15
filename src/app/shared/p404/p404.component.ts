import { Component, OnInit } from '@angular/core';
declare function init_plugin();
@Component({
  selector: 'app-p404',
  templateUrl: './p404.component.html',
  styleUrls: ['./p404.component.css']
})
export class P404Component implements OnInit {
anio: number = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    init_plugin();
  }

}
