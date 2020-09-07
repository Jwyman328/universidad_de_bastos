import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { video } from 'src/app/models/video';
import { NotesService } from 'src/app/services/http-requests/notes.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  quantityOfNotes = 0;
  @Input('videoData') videoData:video;
  constructor(public route: Router, private notesService:NotesService) {    
  }

  ngOnInit(): void {
    const videoId = this.videoData.videoUrl
    this.notesService.getAllNotesForVideo(videoId).subscribe((allVideoNotes)=>{
      this.quantityOfNotes = allVideoNotes.length
    })
  }

  goToNoteCenter(){
    this.route.navigate(['video-center',`${this.videoData.videoUrl}`,`${this.videoData.title}`])
  }

}
