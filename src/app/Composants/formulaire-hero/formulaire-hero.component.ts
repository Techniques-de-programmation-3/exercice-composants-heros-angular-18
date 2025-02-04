import { Component, Inject } from '@angular/core';
import { HeroService } from '../../Services/hero.service';
import { Hero } from '../../Interfaces/hero';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulaire-hero',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDialogClose, MatDialogContent, MatDialogActions],
  templateUrl: './formulaire-hero.component.html',
  styleUrl: './formulaire-hero.component.css'
})
export class FormulaireHeroComponent {
  hero: Hero = {nom : ''};
  
  constructor(private heroService:HeroService, public dialogRef: MatDialogRef<FormulaireHeroComponent>, @Inject(MAT_DIALOG_DATA) public data: Hero) {
    if(data) {
      this.hero = data;
    }
  }

  /**
   * Méthode permettant d'ajouter un héro
   * @param heroForm formulaire permettant d'assurer que tout est valide avant de faire les actions
   */
  addHero(heroForm: NgForm) {
    if (heroForm.valid) {
      this.heroService.addHero(this.hero).subscribe(_ => 
        {
          heroForm.resetForm();
          this.dialogRef.close("Héro ajouté!");
        });
    }
  }

  /**
   * Méthode permettant d'editer un héro
   * @param heroFormAjout formulaire permettant d'assurer que tout est valide avant de faire l'ajout
   */
  editHero(heroForm: NgForm) {
    if (heroForm.valid) {
      this.heroService.editHero(this.hero).subscribe(_ => 
        {
          heroForm.resetForm();
          this.dialogRef.close("Héro modifié!");
        });
    }
  }
}