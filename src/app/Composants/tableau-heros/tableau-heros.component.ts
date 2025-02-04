import { Component, ViewChild, inject } from '@angular/core';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { Hero } from '../../Interfaces/hero';
import { HeroService } from '../../Services/hero.service';
import { FormulaireHeroComponent } from '../formulaire-hero/formulaire-hero.component';


@Component({
  selector: 'app-tableau-heros',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './tableau-heros.component.html',
  styleUrl: './tableau-heros.component.css'
})

export class TableauHerosComponent {
  dataSourceHeros: MatTableDataSource<Hero> = new MatTableDataSource();
  columnsToDisplay = ['nom', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Facultatif : pour la pagination
  @ViewChild(MatSort) sort!: MatSort;                 // Facultatif : pour le tri

  private _snackBar = inject(MatSnackBar);            // Falcultatif: pour les notifications

  constructor(private heroService:HeroService, public dialog: MatDialog) {}

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
   * Méthode permettant d'ouvrir le dialog
   * @param hero s'il est non défini (undefined), cela signifie que c'est un nouvel héro (ajout). 
   *             s'il est défini, cela signifie que c'est un héro existant (édition)
   */
  openDialog(hero?: Hero) { 
    const dialogRef = this.dialog.open(FormulaireHeroComponent, {
        data: hero,
      });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this._snackBar.open(result, undefined, {
          duration: 2000
        });
        this.getHeros();
      }
    });
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
