import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMotherboardComponent } from './search-motherboard.component';

describe('SearchMotherboardComponent', () => {
  let component: SearchMotherboardComponent;
  let fixture: ComponentFixture<SearchMotherboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMotherboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMotherboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
