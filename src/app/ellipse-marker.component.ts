import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'g[diagMarker]',
  //template: '',
  template: `<svg:ellipse #ellipse resizable draggable [attr.stroke]="stroke" [attr.fill]="fill" stroke-width="1" [attr.cx]="x" [attr.cy]="y" rx="10" ry="10" (click)="toggleSelect($event)"></svg:ellipse>`
})
export class EllipseMarkerComponent implements OnInit {
  fill: string = this.getRandomColor();
  stroke: string = '#000000';
  isSelected: boolean;
  x: number = 350;
  y: number = 320;
  @Output() selected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ellipse', { read: ViewContainerRef }) ellipseRef;

  constructor() { }

  ngOnInit() { }

  toggleSelect(event) {
    this.isSelected = !this.isSelected;
    this.selected.next(this.isSelected);
    this.stroke = (this.isSelected) ? '#00FF00' : '#000000';
  }

  move(index) {
    this.x += 50 * index;
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
