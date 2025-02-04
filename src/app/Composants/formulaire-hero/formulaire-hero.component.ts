import { Component } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../Interfaces/hero';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulaire-hero',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogClose, MatDialogContent, MatDialogActions],
  templateUrl: './formulaire-hero.component.html',
  styleUrl: './formulaire-hero.component.css'
})
export class FormulaireHeroComponent {
  
  constructor(private heroService:HeroService, public dialogRef: MatDialogRef<FormulaireHeroComponent>) {}
  newHero: Hero = {nom : ''};


  /**
   * Méthode permettant d'ajouter un héro
   * @param heroFormAjout formulaire permettant d'assurer que tout est valide avant de faire l'ajout
   */
  addHero(heroFormAjout: NgForm) {
    if (heroFormAjout.valid) {
      this.heroService.addHero(this.newHero).subscribe(_ => 
        {
          heroFormAjout.resetForm();
          this.dialogRef.close("Héro ajouté!");
        });
    }
  }
}
