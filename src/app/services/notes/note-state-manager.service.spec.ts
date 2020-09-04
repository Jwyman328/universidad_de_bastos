// import { TestBed } from '@angular/core/testing';

import { NoteStateService } from "./note-state.service"

 import { NoteStateManagerService } from './note-state-manager.service';
import { NotesService } from 'src/app/services/http-requests/notes.service';
import { VideoDisplayService } from '../video/video-display.service';
import { VideoDisplayServiceMock } from 'src/app/testing/services/videoDisplayServiceMock';
import { BehaviorSubject } from 'rxjs';
import {of} from 'rxjs';
import { noteMock } from 'src/app/testing/mockData/noteMock';


let noteStateManagerService
let noteStateService
let notesService :NotesService
let videoDisplayService:VideoDisplayService

 describe('NoteStateManagerService createNote should call a series of function to create a note in the backend ', () => {
  let service: NoteStateManagerService;

  beforeEach(()=>{
     noteStateService = jasmine.createSpyObj('NoteStateService', ['getValue','setCurrentVideoNotes','orderNotesBasedOffOfTime']);
    noteStateService.noteTitle = {value : 'mock'}
    noteStateService.currentNote = {value : 'mock'}

    notesService = jasmine.createSpyObj('NotesService', ['createNote']);
    notesService.getAllNotesForVideo = jasmine.createSpy('getAllNotesForVideo').and.returnValue(of([noteMock]))
    
    videoDisplayService  = jasmine.createSpyObj('VideoDisplayService', ['player']);
    videoDisplayService.pixelPerSecond = 100
    videoDisplayService.player.getCurrentTime = jasmine.createSpy('getCurrentTime').and.returnValue(100)
    videoDisplayService.video = new BehaviorSubject('mock')
     noteStateManagerService = new NoteStateManagerService(noteStateService,notesService,videoDisplayService)
     spyOn(noteStateManagerService,'createNoteInBackend').and.callThrough()

  })

  it('noteStateManagerService create note should call getCurrentTime', ()=>{

    noteStateManagerService.createNote()
    expect(videoDisplayService.player.getCurrentTime).toHaveBeenCalled();
    //expect(notesService.createNote).toHaveBeenCalled();
 })
 
 it('noteStateManagerService create note should call  createNoteInBackend with correct values', ()=>{
    
    noteStateManagerService.createNote()
    expect(noteStateManagerService.createNoteInBackend).toHaveBeenCalledWith(100,'mock','mock');
 })


 it('getAllNotes should call sanitizeBackendNotes and send the sanitized data to setCurrentVideoNotes', ()=>{
    spyOn(noteStateManagerService,'sanitizeBackendNotes').and.callThrough()
    noteStateManagerService.getAllNotes()
    expect(noteStateManagerService.sanitizeBackendNotes).toHaveBeenCalled();
    expect(noteStateService.setCurrentVideoNotes).toHaveBeenCalledWith([{ _id: '1', timeSpot: '10000px', timeOfNote: 100, noteText: 'noteText', noteTitle: 'noteTitle', timeNoteCreated: '1:40' }]);
 })

 it('getAllNotes should call orderNotesBasedOffOfTime', ()=>{
    spyOn(noteStateManagerService,'sanitizeBackendNotes').and.callThrough()
    noteStateManagerService.getAllNotes()
    expect(noteStateService.orderNotesBasedOffOfTime).toHaveBeenCalled()
 })

 it('displayMinuteBasedTime should turn a over 60 seconds into a text based time', ()=>{
    const minuteBasedTime = noteStateManagerService.displayMinuteBasedTime(66)
    expect(minuteBasedTime).toEqual('1:06')
 })

 it('displayMinuteBasedTime shouldkeep time under 60 seconds in its original form', ()=>{
    const minuteBasedTime = noteStateManagerService.displayMinuteBasedTime(59)
    expect(minuteBasedTime).toEqual(59)
 })



});

