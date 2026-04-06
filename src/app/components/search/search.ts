import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.html',
  styleUrls: ['../../app.css'] // Reutilizamos el estilo del app.css
})
export class SearchComponent {
  @Output() onSearch = new EventEmitter<string>();

onInput(valor: string) {
  this.onSearch.emit(valor);
}
}