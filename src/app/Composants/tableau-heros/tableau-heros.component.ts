import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTable, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { Hero } from '../../Interfaces/hero';
import { HeroService } from '../../Services/hero.service';

@Component({
  selector: 'app-tableau-heros',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './tableau-heros.component.html',
  styleUrl: './tableau-heros.component.css'
})

export class TableauHerosComponent {
  dataSourceHeros: MatTableDataSource<Hero> = new MatTableDataSource();
  columnsToDisplay = ['nom'];

  @ViewChild(MatTable) tableHeros!: MatTable<Hero>;

  constructor(private heroService:HeroService) {}

  ngOnInit(): void {
    this.getHeros()
  }

  getHeros() { 
    this.heroService.getHeros().subscribe(
      resultat => {
        this.dataSourceHeros = new MatTableDataSource(resultat);
        this.tableHeros.renderRows();
      }
    );
  }

}
