import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './comopnents/about-us/about-us.component';
import { ContactUsComponent } from './comopnents/contact-us/contact-us.component';
import { HomeComponent } from './comopnents/home/home.component';
import { IndexComponent } from './comopnents/index/index.component';
import { QuestionsComponent } from './comopnents/questions/questions.component';
import { SigninComponent } from './comopnents/signin/signin.component';
import { SignupComponent } from './comopnents/signup/signup.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'index', component: IndexComponent},
  {path:'signin', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:"aboutus", component: AboutUsComponent},
  {path: "contactus", component: ContactUsComponent},
  {path: "questions", component: QuestionsComponent},
  {path:'', redirectTo:'index', pathMatch: 'full'},
  {path:"**", redirectTo: "/index", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
