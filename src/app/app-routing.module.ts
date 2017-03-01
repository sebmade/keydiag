import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { ReasoningComponent } from './reasoning/reasoning.component';
import { SchemaComponent } from './schema/schema.component';
import { Schema2Component } from './schema2/schema2.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ReasoningComponent},
  {path: 'form/:id', component: FormComponent},
  { path: 'schema', component: SchemaComponent },
  { path: 'schema2', component: Schema2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
