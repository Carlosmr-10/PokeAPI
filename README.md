# 151 PokéAPI Explorer 151

Este proyecto es una aplicación web interactiva desarrollada con **Angular 21+** que permite explorar la base de datos de Pokémon utilizando la [PokeAPI](https://pokeapi.co/).

## Arquitectura del Servicio (`ApiPokemon`)

El núcleo de la lógica de datos reside en el servicio `ApiPokemon` (`src/app/services/api.ts`).

### 1. Comunicación con la API (HttpClient)
El servicio utiliza el módulo `HttpClient` para realizar peticiones asíncronas.
* **`getData()`**: Recupera la lista inicial de los primeros 800 Pokémon. Devuelve un `Observable<PokeResponse>`.
* **`getDetailsByUrl(url)`**: Realiza una petición secundaria para obtener los detalles específicos (id, peso, altura, sprites) cuando el usuario selecciona un Pokémon.

### 2. Gestión de Estado con Angular Signals
En lugar de variables tradicionales, utilizamos **Signals** para manejar los "Favoritos".
* **`public favorites = signal<string[]>([])`**: Esto crea un estado global reactivo. Cualquier componente que consuma este signal se actualizará automáticamente cuando la lista de favoritos cambie.
* **`toggleFavorite(name)`**: Un método centralizado que añade o elimina un Pokémon de la lista, asegurando que la lógica de persistencia no esté dispersa por los componentes.

## Estructura de Componentes

La aplicación se divide en componentes especializados para mantener el código limpio y escalable:

* **`App`**: Maneja la lógica de filtrado combinado (búsqueda por nombre + filtro de favoritos) y la comunicación entre el servicio y la vista.
* **`Search`**: Un componente que emite eventos (`@Output`) cada vez que el usuario escribe, permitiendo una búsqueda en tiempo real.
* **`List`**: Renderiza el grid de tarjetas. Recibe los datos mediante `@Input` y avisa al padre mediante `@Output` cuando se hace clic en una tarjeta o en el botón de favorito.
* **`Header`**: Componente visual estático para la identidad de la aplicación.

## Requisitos Técnicos Implementados

* **Tipado Estricto**: Uso de interfaces personalizadas (`PokemonBase`, `PokemonDetail`, `PokeResponse`) para eliminar el uso de `any` y garantizar la seguridad del código.
* **Control de Flujo Moderno**: Implementación de las nuevas directivas de Angular (`@if`, `@for`, `@else`) para un renderizado más eficiente.
* **Feedback de Usuario**: Sistema de control de estados para mostrar mensajes de "Cargando..." o "No se encontraron resultados".
* **Filtrado Combinado**: Lógica que permite filtrar por nombre dentro de la lista de favoritos seleccionados.

---
Desarrollado por Carlos Michelena Rueda como proyecto de aprendizaje en Angular.