import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmsDetailComponent } from './films-detail/films-detail.component';
import { EditFilmsComponent } from './home/edit-films/edit-films.component';
import { AddFilmsComponent } from './home/add-films/add-films.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: 'films', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'details', component: FilmsDetailComponent },
  { path: 'edit', component: EditFilmsComponent },
  { path: 'add', component: AddFilmsComponent },
  { path: '**', redirectTo: 'films' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
