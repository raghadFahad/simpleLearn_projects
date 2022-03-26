import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HoomComponent } from './hoom/hoom.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { OrdersComponent } from './orders/orders.component';
import { AddProductComponent } from './add-product/add-product.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ViewContactUsComponent } from './view-contact-us/view-contact-us.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HoomComponent,
    SignInComponent,
    AdminProfileComponent,
    OrdersComponent,
    AddProductComponent,
    PasswordRecoveryComponent,
    ViewContactUsComponent,
    ViewProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
