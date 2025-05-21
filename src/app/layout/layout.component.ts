import { Component } from '@angular/core';
import { HeroPageComponent } from "./hero-page/hero-page.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-layout',
  imports: [HeroPageComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
