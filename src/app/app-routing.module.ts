import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import {MotherboardComponent} from "./components/motherboard/motherboard.component";
import {LanguageComponent} from "./components/language/language.component";
import {SearchMotherboardComponent} from "./components/search-motherboard/search-motherboard.component";

const routes: Routes = [
  {
    path: '',
    component: SearchMotherboardComponent
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'motherboard/:sensorId',
    component: MotherboardComponent
  },
  {
    path: 'language',
    component: LanguageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
