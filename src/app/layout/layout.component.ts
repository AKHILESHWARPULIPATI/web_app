import { Component } from '@angular/core';    
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  showAlert() {
    alert('This is a custom action');
  }
}
