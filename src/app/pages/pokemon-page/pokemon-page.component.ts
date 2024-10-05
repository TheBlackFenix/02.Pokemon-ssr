import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private activatedRouter = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  public pokemon = signal<Pokemon | null>(null);
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          this.title.setTitle(`${name} - #${id}`);
          this.meta.updateTag({
            name: 'description',
            content: `Pokemon ${name} - #${id}`,
          });
          this.meta.updateTag({
            name: 'og:title',
            content: `${name} - #${id}`,
          });
          this.meta.updateTag({
            name: 'og:description',
            content: `Pokemon ${name} - #${id}`,
          });
          this.meta.updateTag({ name: 'keywords', content: `${name}, ${id}` });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        })
      )
      .subscribe({
        next: (pokemon) => {
          this.pokemon.set(pokemon);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
