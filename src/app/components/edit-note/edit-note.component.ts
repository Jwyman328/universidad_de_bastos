import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  //@Input('note') currentNoteData;
  @Input('note') note;

   noteTitle = ''
   currentNote = ''
   videoTime = 0
  constructor() { }

  ngOnInit(): void {
    console.log(this.note, 'cnt')
    this.noteTitle = this.note.noteTitle
    this.currentNote = this.note.noteText
    this.videoTime = this.note.timeNoteCreated
  }

  saveNote(){

  }

  cancelNote(){}

}
