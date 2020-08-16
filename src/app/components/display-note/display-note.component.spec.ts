import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNoteComponent } from './display-note.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotesService } from 'src/app/services/http-requests/notes.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpNoteServiceMock } from 'src/app/services/notes/httpNoteServiceMock';
import { UserAuthDataMockService } from 'src/app/services/http-requests/userData/user-auth-data-mock.service';
import { UserAuthDataService } from 'src/app/services/http-requests/userData/user-auth-data.service';
import { NoteStateService } from 'src/app/services/notes/note-state.service';
import { noteMock } from 'src/app/testing/mockData/noteMock';
import { NotesMockService } from 'src/app/services/http-requests/notesMock.service';

let deleteSpy;
fdescribe('DisplayNoteComponent set note and display it', () => {
  let component: DisplayNoteComponent;
  let fixture: ComponentFixture<DisplayNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DisplayNoteComponent],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpNoteServiceMock,
          multi: true,
        },
        { provide: UserAuthDataService, useClass: UserAuthDataMockService },
        { provide: NotesService, useClass: NotesMockService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  describe('test display note', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DisplayNoteComponent);
      component = fixture.componentInstance;
      component.note = { ...noteMock };
      component.isNoteDeleted = false;
      fixture.detectChanges();
    });

    it('should display timeNoteCreated of note', () => {
      const noteVideoTimeElement: HTMLElement = fixture.debugElement.query(
        By.css('.video-time')
      ).nativeElement;
      expect(noteVideoTimeElement.textContent.trim()).toEqual(
        noteMock.timeNoteCreated.toString()
      );
    });

    it('should display title of note', () => {
      const noteVideoTitleElement: HTMLElement = fixture.debugElement.query(
        By.css('.display-note__title')
      ).nativeElement;
      expect(noteVideoTitleElement.textContent.trim()).toEqual(
        noteMock.noteTitle
      );
    });

    it('should display text of note', () => {
      const noteVideoTextElement: HTMLElement = fixture.debugElement.query(
        By.css('.display-note__text')
      ).nativeElement;
      expect(noteVideoTextElement.textContent.trim()).toEqual(
        noteMock.noteText
      );
    });

    it('should have click of edit note button set editMode to true', () => {
      const editNoteButton: HTMLElement = fixture.debugElement.queryAll(
        By.css('.display-note__button')
      )[0].nativeElement;
      editNoteButton.click();
      fixture.detectChanges();
      expect(component.isInEditMode).toEqual(true);
    });

    it('should have click of delete note button set showDeleteNoteModal to true', () => {
      const deleteNoteButton: HTMLElement = fixture.debugElement.queryAll(
        By.css('.display-note__button')
      )[1].nativeElement;
      deleteNoteButton.click();
      fixture.detectChanges();
      expect(component.showDeleteNoteModal).toEqual(true);
    });
  });

  describe('test editNote', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DisplayNoteComponent);
      component = fixture.componentInstance;
      component.note = { ...noteMock };
      component.isNoteDeleted = false;
      component.isInEditMode = true;
      fixture.detectChanges();
    });

    it('should display timeNoteCreated of edit note', () => {
      const editNoteVideoTimeElement: HTMLElement = fixture.debugElement.query(
        By.css('.create-note-area__currentTime-bubble')
      ).nativeElement;
      expect(editNoteVideoTimeElement.textContent.trim()).toEqual(
        noteMock.timeNoteCreated.toString()
      );
    });

    it('should have cancelNote button set note title back to original values', () => {
      component.noteTitle = 'new note title';
      fixture.detectChanges();

      const editNoteVideoCancelButton: HTMLElement = fixture.debugElement.query(
        By.css('.create-note-area__buttons')
      ).children[1].nativeElement;
      editNoteVideoCancelButton.click();
      fixture.detectChanges();

      expect(component.noteTitle).toEqual(noteMock.noteTitle);
    });

    it('should have cancelNote button set note text back to original values', () => {
      component.currentNote = 'new note text';
      fixture.detectChanges();

      const editNoteVideoCancelButton: HTMLElement = fixture.debugElement.query(
        By.css('.create-note-area__buttons')
      ).children[1].nativeElement;
      editNoteVideoCancelButton.click();
      fixture.detectChanges();

      expect(component.currentNote).toEqual(noteMock.noteText);
    });

    it('should have saveNote button set note text to original value after save', () => {
      component.currentNote = 'new note text';

      fixture.detectChanges();
      const editNoteVideoSaveButton: HTMLElement = fixture.debugElement.query(
        By.css('.create-note-area__buttons')
      ).children[0].nativeElement;
      editNoteVideoSaveButton.click();

      fixture.detectChanges();
      expect(component.currentNote).toEqual('new note text');
    });
  });

  describe('Test delete note modal', () => {
    beforeEach(() => {
      deleteSpy = jasmine.createSpyObj('NotesService',['deleteNote'])

      fixture = TestBed.createComponent(DisplayNoteComponent);
      component = fixture.componentInstance;
      component.note = { ...noteMock };
      component.isNoteDeleted = false;
      component.showDeleteNoteModal = true;
      fixture.detectChanges();
    });

    it('should show delete note title message on note delete modal', () => {
      const deleteNoteCardTitle: HTMLElement = fixture.debugElement.query(
        By.css('.delete-note-card__text')
      ).nativeElement;

      expect(deleteNoteCardTitle.textContent).toEqual(
        `Are you sure you want to delete your note "${noteMock.noteTitle}"?`
      );
    });

    it('should have delete note cancel button click remove delete modal from screen making it unfindable.', () => {
      const deleteNoteCardCancelButton: HTMLElement = fixture.debugElement.query(
        By.css('.delete-note-card__button-cancel')
      ).nativeElement;

      deleteNoteCardCancelButton.click();
      fixture.detectChanges();

      expect(component.showDeleteNoteModal).toEqual(false);
    });

    it('should have delete note delete button click remove delete modal from screen making the note empty', () => {
      const deleteNoteCardDeleteButton: HTMLElement = fixture.debugElement.query(
        By.css('.delete-note-card__button-ok')
      ).nativeElement;

      deleteNoteCardDeleteButton.click();
      fixture.detectChanges();

      expect(component.showDeleteNoteModal).toEqual(false);
    });

    it('should have delete note delete button click make isNoteDeleted true', async() => {
        const deleteNoteCardDeleteButton: HTMLElement = fixture.debugElement.query(
          By.css('.delete-note-card__button-ok')
        ).nativeElement;
  
        await deleteNoteCardDeleteButton.click();
        fixture.detectChanges();
  
        expect(component.isNoteDeleted).toEqual(true);

      });
  });
});

//
// import { TestBed, async } from "@angular/core/testing";

// import { ModelPreferencesStateManagerService } from "./model-preferences-state-manager.service";
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from "@angular/common/http/testing";
// import { HTTP_INTERCEPTORS } from "@angular/common/http";
// import { HttpRequestPreferencesAndThemesSuccessCaseInterceptorMock } from "../../shared/test-helpers/httpInterceptor/HttpRequestPreferencesAndThemesSuccessCaseInterceptorMock";
// import { userPreferencesDataMock } from "../../shared/test-helpers/data/mockBackendData/userPreferencesDataMock";
// import { preBuiltThemesInBackend } from "../../shared/test-helpers/data/mockBackendData/prebuiltThemesInBackend";
// import { BackendService } from "app/shared/services/backend.service";
// import { MockBackendService } from "../../../../../test/component/mocks/backend.service.mock";
// import { HttpRequestPreferencesAndThemesFailureCaseInterceptorMock } from "../../shared/test-helpers/httpInterceptor/HttpRequestPreferencesAndThemesFailureCaseInterceptorMock";
// import {
//   modelPreferencesDataMockAlpha,
//   modelPreferencesDefaultDataMock,
// } from "app/preferences/shared/test-helpers/data/mockBackendData/modelPreferenceDataMock";

// let httpTestingController: HttpTestingController;
// let service: ModelPreferencesStateManagerService;
// describe("ModelPreferencesStateManagerService", () => {
//   describe("set up ModelPreferencesStateManagerService with success case Http mock", () => {
//     beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule],
//         providers: [
//           {
//             provide: HTTP_INTERCEPTORS,
//             useClass: HttpRequestPreferencesAndThemesSuccessCaseInterceptorMock,
//             multi: true,
//           },
//           { provide: BackendService, useClass: MockBackendService },
//         ],
//       });
//       httpTestingController = TestBed.get(HttpTestingController);
//       service = TestBed.get(ModelPreferencesStateManagerService);
//     });

//     it("should have getModelPreferencesInDbAndLoadToLocalState set modelPreferece data locally after http mock call", async (done) => {
//       await service.modelColorPageStateService.modelId.next(
//         modelPreferencesDataMockAlpha.modelId
//       );
//       expect(service.modelColorPageStateService.modelId.value).toEqual(
//         modelPreferencesDataMockAlpha.modelId
//       );

//       const response = service.getModelPreferencesInDbAndLoadToLocalState(
//         "5f00a0abf6a7d376711a1001"
//       );
//       response
//         .then((response) => {
//           const modelPreferenceFontSizePx =
//             service.modelFontStateService.fontSize.value;
//           const modelPreferenceThemeName =
//             service.modelColorPageStateService.currentThemeName.value;
//           const modelPreferenceColorThemeNames =
//             service.modelColorPageStateService.currentChartColorThemes.value;
//           expect(modelPreferenceFontSizePx).toEqual(
//             modelPreferencesDataMockAlpha.fontSizePx
//           );
//           expect(modelPreferenceThemeName).toEqual("Alpha");
//           expect(modelPreferenceColorThemeNames).toEqual({
//             Categorical: "Alpha",
//             Density: "Alpha",
//             Bar: "Alpha",
//             Dsa: "Alpha",
//             Singular: "Alpha",
//           });
//           done();
//         })
//         .catch((err) => {
//           expect(true).toEqual(false);
//           done();
//         });
//     });
// })
// });
