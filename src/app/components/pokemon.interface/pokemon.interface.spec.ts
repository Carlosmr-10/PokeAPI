import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInterface } from './pokemon.interface';

describe('PokemonInterface', () => {
  let component: PokemonInterface;
  let fixture: ComponentFixture<PokemonInterface>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonInterface]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonInterface);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
