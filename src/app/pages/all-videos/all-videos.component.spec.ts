import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVideosComponent } from './all-videos.component';
import { VideoWatchedService } from 'src/app/services/http-requests/video-watched.service';
import { videoDataMock } from 'src/app/testing/mockData/videoDataMock';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let videoWatchedService:VideoWatchedService;
fdescribe('AllVideosComponent', () => {
  let component: AllVideosComponent;
  let fixture: ComponentFixture<AllVideosComponent>;

  beforeEach(async(() => {
    videoWatchedService = jasmine.createSpyObj('VideoWatchedService',['getAllVideos'])
    videoWatchedService.getAllVideos = jasmine.createSpy('getAllVideos').and.returnValue(of([videoDataMock]))
    TestBed.configureTestingModule({
      declarations: [ AllVideosComponent ],
      providers: [{provide:VideoWatchedService, useValue:videoWatchedService}],
      schemas: [NO_ERRORS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have ngOnInIt call getAllVideos', () => {
    component.ngOnInit()
    expect(videoWatchedService.getAllVideos).toHaveBeenCalled()
  });

  it('should have all videos set by the videos returned from getAllVideos', () => {
    component.ngOnInit()
    expect(component.allVideos).toEqual([videoDataMock])
  });

  it('should call queryVideos and sortVideos in ngOninit', () => {
    spyOn(component,'queryVideos')
    spyOn(component,'sortVideos')

    component.ngOnInit()
    expect(component.queryVideos).toHaveBeenCalled()
    expect(component.sortVideos).toHaveBeenCalledWith('newest')

  });

  it('setInstitute should set selectedInstitue and call queryVideos', () => {
    spyOn(component,'queryVideos')

    component.setInstitution( { value: 'mockInstitute', displayName: 'mockInstitute' })
    expect(component.selectedInstitue).toEqual('mockInstitute')
    expect(component.queryVideos).toHaveBeenCalled()
  });

  it('setType sets sortType and queryVideos', () => {
    spyOn(component,'queryVideos')

    component.setType({ value: 'mockType', displayName: 'mockType' })
    expect(component.selectedType).toEqual('mockType')
    expect(component.queryVideos).toHaveBeenCalled()
  });

  it('setYear sets year and calls queryVideos', () => {
    spyOn(component,'queryVideos')

    component.setYear({ value: 2012, displayName: '2012' })
    expect(component.yearSelected).toEqual('2012')
    expect(component.queryVideos).toHaveBeenCalled()
  });

  it('openSelect changes selectOpen', () => {
    component.selectOpen = false
    component.openSelect()
    expect(component.selectOpen).toEqual(true)
  });

  fit('queryVideos() should set selectedVideos of videos that match the selected sorts', () => {
    component.yearSelected =  'any'
    component.watchedSortStatus = 'All'
    let videoDataMockToGetSelected = {...videoDataMock}
    videoDataMockToGetSelected.categories = ['allInstitute','allType']
    videoDataMockToGetSelected.year = 1999
    videoDataMockToGetSelected.hasBeenWatchedByUser = true
    component.allVideos = [videoDataMockToGetSelected]
    component.queryVideos()
    
    expect(component.selectedVideos).toEqual([videoDataMockToGetSelected])
  });




  
});
