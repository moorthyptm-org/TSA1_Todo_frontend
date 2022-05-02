import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

// Todo : Lazy loading
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    component: ListComponent,
  },
  {
    path: 'manage',
    canActivate: [AuthGuard],
    component: ManageComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },

  {
    path: '**',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
