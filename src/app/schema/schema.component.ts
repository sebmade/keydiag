import * as constants from '../constants';

import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { EllipseMarkerComponent } from '../ellipse-marker.component';

@Component({
  selector: 'app-schema',
  entryComponents: [EllipseMarkerComponent],
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  @ViewChild('svgSchema', {read: ViewContainerRef}) container: ViewContainerRef;
  private selection: EllipseMarkerComponent;
  private showDiagList: boolean;
  private t2zt = constants.T2ZT;
  private diffusion = constants.DIFFUSION;
  private perfusion = constants.PERFUSION;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  addEllipse(event, index?, color?) {
    let componentFactory = this.resolver.resolveComponentFactory(EllipseMarkerComponent);
    let cref = this.container.createComponent(componentFactory);

    cref.instance.selected.subscribe((isSelected) => {
      if (isSelected) {
        this.selection = cref.instance;
        this.showDiagList = true;
      } else {
        this.selection = null;
        this.showDiagList = false;
      }
    });

    // HACK pour arriver à sortir ellipse de g sinon il s'affiche pas
    let t = cref.instance.ellipseRef;
    let ellipseElement = t.element.nativeElement;
    ellipseElement.ownerSVGElement.appendChild(ellipseElement);

    // move si index
    if (index) {
      cref.instance.move(index);
    }

    if (color) {
      cref.instance.fill = color;
    }
  }

  add3Ellipse(event) {
    for (let i=0; i<3 ; i++) {
      this.addEllipse(event, i, '#FF0000');
    }
  }

  

}
