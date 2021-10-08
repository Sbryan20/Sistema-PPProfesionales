import { Component, Input, OnInit } from '@angular/core';
import { Ientity } from '@shared/models/entidad';


@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent implements OnInit {
  @Input() data?:Ientity;
  constructor() { }

  ngOnInit(): void {
  }

}
