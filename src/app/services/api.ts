import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokeResponse, PokemonDetail } from '../components/pokemon.interface/pokemon.interface';

@Injectable({ providedIn: 'root' })
export class ApiPokemon {

  private http = inject(HttpClient);
  public favoritos = signal<string[]>([]);

  // Método para obtener la lista de Pokémon
  getData(): Observable<PokeResponse> {

    return this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=800');
  }

  // Método para obtener los detalles de un Pokémon por su URL
  getDetailsByUrl(url: string): Observable<PokemonDetail> {

    return this.http.get<PokemonDetail>(url);
  }

  // Método para alternar un Pokémon en la lista de favoritos
  toggleFavorite(name: string): void {

    const actual = this.favoritos();

    if (actual.includes(name)) {

      this.favoritos.set(actual.filter(n => n !== name));
    } 
    else {

      this.favoritos.set([...actual, name]);
    }
  }
}