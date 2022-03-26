import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { LogOutComponent } from './log-out/log-out.component';
import { OrdersComponent } from './orders/orders.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:"home",component: HomeComponent},
  {path:"about-us", component: AboutUsComponent},
  {path:"sign-in", component: SigninComponent},
  {path: "sign-up", component: SignupComponent},
  {path:"forget-password", component: ForgetPasswordComponent},
  {path: "user-profile", component: UserProfileComponent},
  {path: "log-out", component: LogOutComponent},
  {path: "contact-us", component: ContactUsComponent},
  {path: "cart", component: CartComponent},
  {path: "order", component: OrdersComponent},
  {path:"**", redirectTo: "/home", pathMatch: "full"}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
