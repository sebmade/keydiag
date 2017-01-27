import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { ReasoningComponent } from './reasoning/reasoning.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ReasoningComponent},
  {path: 'form/:id', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
