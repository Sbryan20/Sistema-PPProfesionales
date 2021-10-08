import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-entity',
  templateUrl: './search-entity.component.html',
  styleUrls: ['./search-entity.component.scss']
})
export class SearchEntityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value=>this.searchEmitter.emit(value))
  }

  search =new FormControl('')
  @Output('search') searchEmitter = new EventEmitter<String>();

}
