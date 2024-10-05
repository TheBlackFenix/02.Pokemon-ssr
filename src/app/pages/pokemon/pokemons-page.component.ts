import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    console.log(this.currentPage());
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], { queryParams: { page: pageToLoad } });
        }),
        tap(() => {
          this.title.setTitle(`Pokemons Page ${pageToLoad}`);
        })
      )
      .subscribe({
        next: (pokemons) => {
          this.pokemons.set(pokemons);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
