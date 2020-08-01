import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-button-2',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent2 implements OnInit {

  @Input('handleSubmit')  handleSubmit: () => void;
  constructor() { }

  ngOnInit(): void {
  }

}
