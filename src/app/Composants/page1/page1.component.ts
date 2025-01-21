import { Component } from '@angular/core';
import { EnteteComponent } from "../entete/entete.component";
import { RechercheComponent } from "../recherche/recherche.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { HeroComponent } from "../hero/hero.component";
import { PiedPageComponent } from "../pied-page/pied-page.component";
import { HEROS } from '../../mocks/heros';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [EnteteComponent, RechercheComponent, CarouselComponent, HeroComponent, PiedPageComponent],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css'
})
export class Page1Component {
  heros = HEROS;
}
