import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { AngularMaterialModule } from './angular-material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, AngularMaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = '584ProjectClient';
}
