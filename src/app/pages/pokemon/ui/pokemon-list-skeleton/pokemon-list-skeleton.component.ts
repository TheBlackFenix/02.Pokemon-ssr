import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list-skeleton.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListSkeletonComponent {

}
