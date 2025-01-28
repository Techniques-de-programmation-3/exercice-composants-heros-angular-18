import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page2Component } from "./Composants/page2/page2.component";
import { Page1Component } from "./Composants/page1/page1.component";
import { TableauHerosComponent } from "./Composants/tableau-heros/tableau-heros.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Page1Component, Page2Component, TableauHerosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercice-composants-heros';
}
