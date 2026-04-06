import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiPokemon } from './services/api';
import { PokemonBase, PokemonDetail } from './components/pokemon.interface/pokemon.interface';
import { SearchComponent } from './components/search/search';
import { ListComponent } from './components/list/list';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent, ListComponent, Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  private apiService = inject(ApiPokemon);
  private cdr = inject(ChangeDetectorRef);
  public pokemon: PokemonBase[] = [];
  public filteredPokemon: PokemonBase[] = [];
  public selectedPoke: PokemonDetail | null = null;
  public showFavorites: boolean = false;
  public loading: boolean = false;

  ngOnInit() { 
    
    this.loadData();
  }

  // Función para cargar los datos de la API
  loadData() {

    this.loading = true;
    this.apiService.getData().subscribe({

      next: (data) => {

        console.log('API Response:', data);
        this.pokemon = data.results;
        this.filteredPokemon = data.results;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {

        console.error('Error de API:', err);
        this.loading = false;
      }
    });
  }

  // Función para alternar un Pokémon como favorito
  toggleFav(pokemon: PokemonBase) {

    this.apiService.toggleFavorite(pokemon.name);
    this.cdr.detectChanges();
  }

  // Función para manejar la búsqueda de Pokémon
  onSearch(termino: string) {

    this.filteredPokemon = this.pokemon.filter(p => 
      p.name.toLowerCase().includes(termino.toLowerCase())
    );
    this.cdr.detectChanges();
  }

  // Función para mostrar los detalles de un Pokémon seleccionado
  seeDetails(pokemon: PokemonBase): void {

    const url = pokemon.url;

    this.apiService.getDetailsByUrl(url).subscribe({

      next: (res: PokemonDetail) => {

        this.selectedPoke = res;
        this.cdr.detectChanges();
        this.loading = false;
      }
    });
  }

  // Función para obtener la lista de favoritos
  myFavorites() {

    return this.apiService.favorites();
  }

  // Función para filtrar los Pokémon según el término de búsqueda
  filterPokemon(termino: string = '') {

    let result = this.pokemon;

    // Filtro por nombre
    if (termino) {

      result = result.filter(p => 
        p.name.toLowerCase().includes(termino.toLowerCase())
      );
    }

    // Filtro por favoritos
    if (this.showFavorites) {

      const favs = this.apiService.favorites();
      result = result.filter(p => favs.includes(p.name));
    }
    this.filteredPokemon = result;
    this.cdr.detectChanges();
  }

  // Función para alternar el filtro de favoritos
  toggleFavoriteFilter() {
    
    this.showFavorites = !this.showFavorites;
    this.filterPokemon();
  }
}