import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxComponent } from './select-box.component';

describe('SelectBoxComponent', () => {
  let component: SelectBoxComponent;
  let fixture: ComponentFixture<SelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoxComponent);
    component = fixture.componentInstance;
    component.selectOptions = [{displayName:'mockOne'},{displayName:'mockTwo'}]
    component.defaultSelected = {displayName:'mockOne'}
    component.selectLabel = 'mockLabel'
    fixture.detectChanges();
  });

  it('should have selectOpen set to false by default', () => {
    expect(component.selectOpen).toEqual(false)
  });

  it('should have ngOnInit set selectedItem to the default selectedItem', () => {
    component.ngOnInit()
    expect(component.selectedItem).toEqual(component.defaultSelected)
  });

  it('should have openSelect set openSelect to true if it is false ', () => {
    component.selectOpen = false
    component.openSelect()
    expect(component.selectOpen).toEqual(true)
  });

  it('should have openSelect set openSelect to false if it is true ', () => {
    component.selectOpen = true
    component.openSelect()
    expect(component.selectOpen).toEqual(false)
  });

  it('should have selectItem() set openSelect to false ', () => {
    component.selectOpen = true
    component.selectItem({displayName:'mockValue1'})
    expect(component.selectOpen).toEqual(false)
  });

  it('should have selectItem() set selectedItem to the passed in value ', () => {
    component.selectItem({displayName:'mockValue10'})
    expect(component.selectedItem).toEqual({displayName:'mockValue10'})
  });

  it('should have selectItem() emit changeSelectEvent with selectedValue', () => {
    spyOn(component.changeSelectEvent,'emit')
    component.selectItem('mockValue10')
    expect(component.changeSelectEvent.emit).toHaveBeenCalledWith('mockValue10')
  });
});
