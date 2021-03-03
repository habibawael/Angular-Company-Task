import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './Components/form-page/form-page.component';
import { HomeComponent } from './Components/home/home.component';
import { ListPageComponent } from './Components/list-page/list-page.component';

const routes: Routes = [
  // {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'companies', component: ListPageComponent},
  {path: 'add', component: FormPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
