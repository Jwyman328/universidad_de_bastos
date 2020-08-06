import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  @Input('selectOptions') selectOptions: any[];
  @Input('defaultSelected') defaultSelected;

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.defaultSelected
  }

    //
    selectedItem: any = 'Select an item' 
    selectOpen = false;
  
    openSelect(){
      this.selectOpen = !this.selectOpen
    }
  
    selectItem(value){
      this.selectedItem = value
      this.selectOpen = false
  
    }
  

}
