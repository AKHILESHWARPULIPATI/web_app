import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationItem } from '../../interfaces/header-interface/navigation-item';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  header: NavigationItem[] = [
    { title: 'Home' },
    {
      title: 'About us',
      children: ['Who we are', 'Our offices', 'Meet the team', 'Work with us']
    },
    {
      title: 'Services',
      children: ['ENC Validation', 'Production Support', 'Distribution', 'Coverage and Members']
    },
    { title: 'Events' },
    {
      title: 'News',
      children: ['News', 'Secondments', 'Revenue Management']
    },
    {
      title: 'Contact',
      children: ['News', 'Secondments', 'S-100 Services']
    },
    {
      title: 'Contact',
      children: ['News', 'Secondments', 'S-100 Services']
    },
    {
      title: 'Login',
      route:'/login',
      children: [
        'HOs Login',
        'VAR Login',
        'DP Login',
        'LMS Login',
        'Conversion Readiness',
        'PDT Licence',
        'Activity Fund'
      ]
    }

  ];
}
