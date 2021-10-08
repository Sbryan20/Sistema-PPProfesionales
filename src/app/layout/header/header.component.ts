import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showMenu= new EventEmitter<any>();
  public faBars=faBars;
  public logo='assets/images/logo.png'
  public nombres=sessionStorage.getItem('nombres')

  constructor() { }

  ngOnInit(): void {
  }

}
