import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
@Input() objects:any
  constructor() { }

  ngOnInit(): void {
  }

}
