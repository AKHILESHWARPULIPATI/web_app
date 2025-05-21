import { Routes } from '@angular/router';
import { HeroPageComponent } from './layout/hero-page/hero-page.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children:[
            {path:'heropage',component:HeroPageComponent},
            {path:'header',component:HeaderComponent},
            { path: '', redirectTo: 'layout', pathMatch: 'full' }
        ]
    },
    {path:'login',component:LoginComponent}
    
];
