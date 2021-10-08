import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skaleton',
  templateUrl: './skaleton.component.html',
  styleUrls: ['./skaleton.component.scss']
})
export class SkaletonComponent implements OnInit {
  public showLeftNav=true;
  public $theme='blue-dark'

  constructor() { }

  ngOnInit(): void {
  }

  showMenu(){
    this.showLeftNav =!this.showLeftNav;
  }

}
