import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyTeamComponent } from './fantasy-team.component';

describe('FantasyTeamComponent', () => {
  let component: FantasyTeamComponent;
  let fixture: ComponentFixture<FantasyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
