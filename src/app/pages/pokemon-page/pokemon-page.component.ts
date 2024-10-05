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
  public pokemon = signal<Pokemon | null>(null);
  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.pokemonService.loadPokemon(id).subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
