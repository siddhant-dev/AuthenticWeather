import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignInspirationComponent } from './design-inspiration/design-inspiration.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'design', component: DesignInspirationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
