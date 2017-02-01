import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'svg:g[id=marker]',
  //template: '',
  template: `<svg:ellipse #ellipse resizable draggable stroke="#000000" fill="#FF0000" stroke-width="1" cx="382" cy="297" rx="10" ry="10"></svg:ellipse>`
})
export class EllipseMarkerComponent implements OnInit {
  @ViewChild('ellipse', {read: ViewContainerRef}) ellipseRef;
  constructor() { }

  ngOnInit() { }
}