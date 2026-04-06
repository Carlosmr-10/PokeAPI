import { Component } from '@angular/core';

@Component({
  selector: 'app-pokemon.interface',
  imports: [],
  templateUrl: './pokemon.interface.html',
  styleUrl: './pokemon.interface.css',
})

export class PokemonInterface {

}

// Interfaces para la respuesta de la API y los datos de Pokémon
export interface PokeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBase[];
}

// Interfaces para los datos de Pokémon
export interface PokemonBase {
  name: string;
  url: string;
}

// Detalles adicionales para un Pokémon específico
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}