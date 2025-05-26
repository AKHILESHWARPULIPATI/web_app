
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeroPageComponent } from './layout/hero-page/hero-page.component';
import { TableComponent } from './layout/table/table.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'hero', component: HeroPageComponent },
      { path: 'table', component: TableComponent },
      { path: 'sidebar', component: SidebarComponent },
  
    ]
  },
  { path: 'login', component: LoginComponent }
];
