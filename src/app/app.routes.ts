import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FormCompletionComponent } from './features/form-completion/form-completion.component';
import { PreviewPageComponent } from './features/preview-page/preview-page.component';
import { ClientProfileComponent } from './features/client-profile/client-profile.component';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: `Paralegal's Sidekick`
  },
  {
    path: 'form',
    component: FormCompletionComponent,
    title: 'Form Completion'
  },
  {
    path: 'preview',
    component: PreviewPageComponent,
    title: 'Form Preview'
  },
  {
    path: 'profile',
    component: ClientProfileComponent,
    title: 'Profile Page'
  }
];
