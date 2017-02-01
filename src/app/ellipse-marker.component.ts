import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  //selector: 'g[data-name=ellipse-marker]',
  template: `<svg:ellipse kdResizable stroke="#000000" fill="#FF0000" stroke-width="1" cx="200" cy="278.5" id="svg_10" rx="25.5" ry="29.5"></svg:ellipse>`
})
export class EllipseMarkerComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}