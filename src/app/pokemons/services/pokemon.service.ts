import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokemonApiResponse } from '../interfaces/pokemon-api.response';
import { delay, map, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private httpClient = inject(HttpClient);
  public loadPage(page: number) {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.httpClient
      .get<PokemonApiResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
      )
      .pipe(
        //agregar espera de 1 seg usando el operador de rxjs
        delay(1000),
        map((resp) => {
          const simplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          return simplePokemons;
        })
      );
  }

  public loadPokemon(id: string) {
    return this.httpClient.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
  }
}
