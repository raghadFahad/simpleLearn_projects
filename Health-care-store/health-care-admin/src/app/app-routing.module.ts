import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { HoomComponent } from './hoom/hoom.component';
import { OrdersComponent } from './orders/orders.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewContactUsComponent } from './view-contact-us/view-contact-us.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {path:"home", component:HoomComponent},
  {path:"sign-in", component: SignInComponent},
  {path:"admin-profile", component:AdminProfileComponent},
  {path:"orders",component:OrdersComponent},
  {path:"add-products", component:AddProductComponent},
  {path:"password-recover", component:PasswordRecoveryComponent},
  {path:"user-comments", component:ViewContactUsComponent},
  {path:"view-product", component: ViewProductComponent},
  
  {path:"**", redirectTo: "/sign-in", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
