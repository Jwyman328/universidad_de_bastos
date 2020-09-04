import { TestBed } from '@angular/core/testing';

import { NoteStateService } from './note-state.service';
import { sanitizedNoteMock } from '../../testing/mockData/sanitizedNoteMock';

describe('NoteStateService', () => {
  let service: NoteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteStateService);
  });

  it('clear notepad should reset noteTitle and curentNote to empty string', () => {
    service.noteTitle.next('first note');
    service.currentNote.next('current note text');
    service.clearNotePad();
    expect(service.noteTitle.value).toEqual('');
    expect(service.currentNote.value).toEqual('');
  });

  it('setCurrentNote should set the currentNotes', () => {
    const laterSanitizedNoteMock = { ...sanitizedNoteMock };
    laterSanitizedNoteMock.timeOfNote = 500;

    service.currentVideoNotes.next([
        sanitizedNoteMock,
      ]);
    
      service.setCurrentVideoNotes([laterSanitizedNoteMock])
 
    expect(service.currentVideoNotes.value).toEqual([laterSanitizedNoteMock]);
  });

  it('orderNotesBasedOffOfTime should put the notes in order based on timeOfNote', () => {
    const laterSanitizedNoteMock = { ...sanitizedNoteMock };
    const earliestSanitizedNoteMock = { ...sanitizedNoteMock };
    earliestSanitizedNoteMock.timeOfNote = 1;
    laterSanitizedNoteMock.timeOfNote = 500;
    service.currentVideoNotes.next([
      sanitizedNoteMock,
      laterSanitizedNoteMock,
      earliestSanitizedNoteMock,
    ]);
    service.orderNotesBasedOffOfTime();
    expect(service.currentVideoNotes.value).toEqual([
      earliestSanitizedNoteMock,
      sanitizedNoteMock,
      laterSanitizedNoteMock,
    ]);
  });
});
