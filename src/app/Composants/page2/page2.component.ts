import { Component } from '@angular/core';
import { EnteteComponent } from "../entete/entete.component";
import { RechercheComponent } from "../recherche/recherche.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { HeroComponent } from "../hero/hero.component";
import { PiedPageComponent } from "../pied-page/pied-page.component";

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [EnteteComponent, RechercheComponent, CarouselComponent, HeroComponent, PiedPageComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {
  hero1 = "Superman";
  hero2 = "The Flash";
  hero3 = "Batman";
  hero4 = "Green Arrow";
  hero5 = "Spiderman";
  hero6 = "Iron man";
}
