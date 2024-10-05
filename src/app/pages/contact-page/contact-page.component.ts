import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Contact Page Description',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page',
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Contact Page Description',
    });
    this.meta.updateTag({ name: 'keywords', content: 'Contact, Page' });
  }
}
