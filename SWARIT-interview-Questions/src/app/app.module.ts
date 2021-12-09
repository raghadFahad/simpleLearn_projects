import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './comopnents/home/home.component';
import { HeaderComponent } from './comopnents/header/header.component';
import { SigninComponent } from './comopnents/signin/signin.component';
import { SignupComponent } from './comopnents/signup/signup.component';
import { FooterComponent } from './comopnents/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';
import { IndexComponent } from './comopnents/index/index.component';
import { ContactUsComponent } from './comopnents/contact-us/contact-us.component';
import { AboutUsComponent } from './comopnents/about-us/about-us.component';
import { QuestionsComponent } from './comopnents/questions/questions.component';
//idle for session 
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { ModalModule } from 'ngx-bootstrap/modal';

import { BnNgIdleService } from 'bn-ng-idle';
import { EmailPipe } from './pipes/email.pipe';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    IndexComponent,
    ContactUsComponent,
    AboutUsComponent,
    QuestionsComponent,
    EmailPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forChild([]),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    ModalModule
  ],

    
  providers: [
    ScreenTrackingService,UserTrackingService,BnNgIdleService
  ],
  bootstrap: [AppComponent,HttpClientModule,HttpClient]
})
export class AppModule { }
