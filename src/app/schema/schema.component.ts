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

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  addEllipse(event) {
    let componentFactory = this.resolver.resolveComponentFactory(EllipseMarkerComponent);
    let cref = this.container.createComponent(componentFactory);
    // HACK pour arriver à sortir ellipse de g sinon il s'affiche pas
    let t = cref.instance.ellipseRef;
    let ellipseElement = t.element.nativeElement;
    ellipseElement.ownerSVGElement.appendChild(ellipseElement);
  }

}
