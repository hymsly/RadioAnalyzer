import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarParticionComponent } from './listar-particion.component';

describe('ListarParticionComponent', () => {
  let component: ListarParticionComponent;
  let fixture: ComponentFixture<ListarParticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarParticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarParticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
