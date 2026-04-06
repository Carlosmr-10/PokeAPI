import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonBase } from '../pokemon.interface/pokemon.interface'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrls: ['../../app.css']
})
export class ListComponent {

  // Estas son las "puertas" de entrada de datos
  @Input() pokemons: PokemonBase[] = []; 
  @Input() favs: string[] = [];

  // Estas son las "salidas" de eventos
  @Output() clickItem = new EventEmitter<PokemonBase>();
  @Output() toggleFav = new EventEmitter<PokemonBase>();

  getImg(url: string): string {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  isFav(name: string): boolean {
    return this.favs.includes(name);
  }
}