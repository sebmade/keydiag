import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { EllipseMarkerComponent } from './ellipse-marker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ModelService } from './model.service';
import { NgModule } from '@angular/core';
import { PanelComponent } from './panel/panel.component';
import { ReasoningComponent } from './reasoning/reasoning.component';
import { ResizableDirective } from './resizable.directive';
import { SchemaComponent } from './schema/schema.component';
import { Schema2Component } from './schema2/schema2.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ReasoningComponent,
    FormComponent,
    ResizableDirective,
    EllipseMarkerComponent,
    DraggableDirective,
    SchemaComponent,
    Schema2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
