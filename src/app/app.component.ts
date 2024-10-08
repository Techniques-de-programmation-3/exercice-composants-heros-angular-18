import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Page2Component } from "./Composants/page2/page2.component";
import { Page1Component } from "./Composants/page1/page1.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Page1Component, Page2Component ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercice-composants-heros';
}
