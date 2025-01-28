import { Component, ViewChild } from '@angular/core';

import {MatTableDataSource, MatTable, MatTableModule} from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { Hero } from '../../Interfaces/hero';
import { HeroService } from '../../Services/hero.service';


@Component({
  selector: 'app-tableau-heros',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './tableau-heros.component.html',
  styleUrl: './tableau-heros.component.css'
})

export class TableauHerosComponent {
  dataSourceHeros: MatTableDataSource<Hero> = new MatTableDataSource();
  columnsToDisplay = ['nom'];

  @ViewChild(MatTable) tableHeros!: MatTable<Hero>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  // Facultatif : pour la pagination
  @ViewChild(MatSort) sort!: MatSort;                 // Facultatif : pour le tri

  constructor(private heroService:HeroService) {}

  /**
   * Méthode invoquée après l'initiation des valeurs en entrée (Inputs)
   */
  ngOnInit(): void {
    this.getHeros()
  }

  /**
   * Méthode invoquée après l'initialisation de la vue du composant
   */
  ngAfterViewInit() {
    this.dataSourceHeros.paginator = this.paginator;  // Facultatif : pour la pagination
    this.dataSourceHeros.sort = this.sort;            // Facultatif : pour le tri
  }

  /**
   * Méthode permettant de récupérer les héros à partir du service
   */
  getHeros() { 
    this.heroService.getHeros().subscribe(
      resultat => {
        console.log(resultat);
        this.dataSourceHeros = new MatTableDataSource(resultat);
        if(this.tableHeros) {
          this.tableHeros.renderRows();
        }
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
