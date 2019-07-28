import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './Authgaurd/authgaurd';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './myModel/new-model/customer/customer.component';
import { StpperComponent } from './components/stpper/stpper.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'login', component: LoginComponent },
 // { path: 'order', component: OrderComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'text1', component: CustomerComponent },
  { path: 'order', component: StpperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
