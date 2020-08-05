import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    //
    selectedItem = 'Select an item';
    selectOpen = false;
  
    openSelect(){
      this.selectOpen = !this.selectOpen
    }
  
    selectItem(value){
      this.selectedItem = value
      this.selectOpen = false
  
    }
  

}
