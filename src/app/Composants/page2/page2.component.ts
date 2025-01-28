import { Component } from '@angular/core';
import { EnteteComponent } from "../entete/entete.component";
import { RechercheComponent } from "../recherche/recherche.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { HeroComponent } from "../hero/hero.component";
import { PiedPageComponent } from "../pied-page/pied-page.component";
import { HEROS } from '../../mocks/heros';
import { Hero } from '../../Interfaces/hero';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [EnteteComponent, RechercheComponent, CarouselComponent, HeroComponent, PiedPageComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css'
})
export class Page2Component {
  heros: Hero[] = []; //HEROS;

  constructor(private heroService:HeroService) {}

  ngOnInit() {
    this.heroService.getHeros().subscribe(
      resultat => this.heros = resultat
    );
  }

  
}
