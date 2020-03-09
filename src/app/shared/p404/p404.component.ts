import { Component, OnInit } from '@angular/core';
declare function init_plugin();
@Component({
  selector: 'app-p404',
  templateUrl: './p404.component.html',
  styles: []
})
export class P404Component implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugin();
  }

}
