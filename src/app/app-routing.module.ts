import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionComponent } from './action/action.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CandidatComponent } from './candidat/candidat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { OffreComponent } from './offre/offre.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path: 'login' ,component:LoginComponent},
  {path: 'action' ,component:ActionComponent},
 // {path: 'test' ,component:BoardAdminComponent},
  {path: 'calendrier' ,component:CalendrierComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path: 'main' ,component:MainComponent},
  {path: 'candidat' ,component:CandidatComponent,canActivate:[AuthGuard]},
  {path:'header',component:HeaderComponent},
  {path:'admin',component:BoardAdminComponent,canActivate:[AuthGuard,RoleGuard],data:{expectedRoles:["ROLE_ADMIN"]}},
  {path:'home',component:HomeComponent},
  {path:'user',component:BoardUserComponent,canActivate:[AuthGuard,RoleGuard],data:{expectedRoles:["ROLE_USER"]}},
  {path:'users',component:UsersComponent,canActivate:[AuthGuard,RoleGuard],data:{expectedRoles:["ROLE_ADMIN"]}},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'offre',component:OffreComponent,canActivate:[AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'**',redirectTo:'login'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// test

