import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input('selectOptions') selectOptions: {displayName:string}[];
  @Input('defaultSelected') defaultSelected;
  @Input('selectLabel') selectLabel: string;
  @Output() changeSelectEvent = new EventEmitter<string>();
  selectedItem: any = 'Select an item' 
  selectOpen = false;

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.defaultSelected
  }
    openSelect(){
      this.selectOpen = !this.selectOpen
    }
  
    selectItem(value){
      this.selectedItem = value
      this.selectOpen = false

      this.changeSelectEvent.emit(value);
    }
  

}
