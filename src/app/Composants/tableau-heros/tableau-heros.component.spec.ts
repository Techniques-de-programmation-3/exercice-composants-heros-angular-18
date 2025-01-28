import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauHerosComponent } from './tableau-heros.component';

describe('TableauHerosComponent', () => {
  let component: TableauHerosComponent;
  let fixture: ComponentFixture<TableauHerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauHerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauHerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
