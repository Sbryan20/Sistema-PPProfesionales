import { Component, Input, OnInit } from '@angular/core';
import { ILeftNavMenu } from '../../../data/interfaces/ileft-nav-menu.metadata';

@Component({
  selector: 'app-left-nav-menu',
  templateUrl: './left-nav-menu.component.html',
  styleUrls: ['./left-nav-menu.component.scss']
})
export class LeftNavMenuComponent implements OnInit {
@Input() data?:ILeftNavMenu;
  constructor() { }

  ngOnInit(): void {
  }

}
