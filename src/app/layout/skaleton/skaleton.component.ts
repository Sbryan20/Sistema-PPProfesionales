import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skaleton',
  templateUrl: './skaleton.component.html',
  styleUrls: ['./skaleton.component.scss']
})
export class SkaletonComponent implements OnInit ,AfterViewInit{
  public showLeftNav=true;
  public $theme='blue-dark'
  loader='assets/images/loader.gif'
  issloading=true;

  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(()=>{
    this.issloading=false;
    },1000)
  }

  ngOnInit(): void {
  }

  showMenu(){
    this.showLeftNav =!this.showLeftNav;
  }

}
