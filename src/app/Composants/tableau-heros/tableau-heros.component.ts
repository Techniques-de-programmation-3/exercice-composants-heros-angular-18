import { Component, ViewChild, inject } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar'

import { Hero } from '../../Interfaces/hero';
import { HeroService } from '../../Services/hero.service';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-tableau-heros',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './tableau-heros.component.html',
  styleUrl: './tableau-heros.component.css'
})

export class TableauHerosComponent {
  dataSourceHeros: MatTableDataSource<Hero> = new MatTableDataSource();
  columnsToDisplay = ['nom', 'actions'];
  newHero: Hero = {nom : ''};

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Facultatif : pour la pagination
  @ViewChild(MatSort) sort!: MatSort;                 // Facultatif : pour le tri

  private _snackBar = inject(MatSnackBar);            // Falcultatif: pour les notifications

  constructor(private heroService:HeroService) {}

  /**
   * Méthode invoquée après l'initiation des valeurs en entrée (Inputs)
   */
  ngOnInit(): void {
    this.getHeros();
  }

  /**
   * Méthode invoquée après l'initialisation de la vue du composant
   */
  ngAfterViewInit() {
    this.dataSourceHeros.paginator = this.paginator;  // Facultatif : pour la pagination
    this.dataSourceHeros.sort = this.sort;            // Facultatif : pour le tri
  }

  ngOnChanges() {
    this.dataSourceHeros.paginator = this.paginator;  // Facultatif : pour la pagination
    this.dataSourceHeros.sort = this.sort;            // Facultatif : pour le tri
  }

  /**
   * Méthode permettant de récupérer les héros à partir du service
   */
  getHeros() { 
    this.heroService.getHeros().subscribe(
      resultat => this.dataSourceHeros.data = resultat
    );
  }

  /**
   * Méthode permettant d'ajouter un héro
   * @param heroFormAjout formulaire permettant d'assurer que tout est valide avant de faire l'ajout
   */
  addHero(heroFormAjout: NgForm) {
    if (heroFormAjout.valid) {
      this.heroService.addHero(this.newHero).subscribe(
        _ => {
          this._snackBar.open("Hero ajouté!", undefined, {duration: 2* 1000});
          heroFormAjout.resetForm();
          this.getHeros();  
          if (this.dataSourceHeros.paginator) { // Facultatif : pour aller à la dernière page s'il y a pagination
              this.dataSourceHeros.paginator.lastPage(); 
              console.log(this.dataSourceHeros.data.length);
          }
        });
      }
  }

  /**
   * Méthode permettant de supprimer un héro
   * @param _id L'id du héro
   */
  deleteHero(_id: string) {
    this.heroService.deleteHero(_id).subscribe(
      _ => {
        this._snackBar.open("Hero supprimé!", undefined, {duration: 2* 1000});
        this.getHeros();
      }
    );
  }



  /**
   * Méthode permettant de filtrer les éléments du tableau 
   * Crédits: Angular Material 
   * https://material.angular.io/components/table/examples#table-overview 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHeros.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHeros.paginator) {
      this.dataSourceHeros.paginator.firstPage();
    }
  }
}
