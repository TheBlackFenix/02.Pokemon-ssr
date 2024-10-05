import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListSkeletonComponent } from './pokemon-list-skeleton.component';

describe('PokemonListSkeletonComponent', () => {
  let component: PokemonListSkeletonComponent;
  let fixture: ComponentFixture<PokemonListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
