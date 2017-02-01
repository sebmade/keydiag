import { Directive, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnInit {
  mousedrag;
  mouseup = new Subject<MouseEvent>();
  mousedown = new Subject<MouseEvent>();
  mousemove = new Subject<MouseEvent>();

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    this.mouseup.next(event);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mousedown.next(event);
    return false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) {
    this.mousemove.next(event);
  }

  constructor(public element: ElementRef) {

  }

  ngOnInit() {
    const svg = this.element.nativeElement.ownerSVGElement;
    const convertCoords = (x, y) => {
      const pt = svg.createSVGPoint();
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };

    this.mousedrag = this.mousedown.map(event => {
      const pt = convertCoords(event.clientX, event.clientY);
      return {
        x: pt.x - parseFloat(this.element.nativeElement.getAttribute('cx')),
        y: pt.y - parseFloat(this.element.nativeElement.getAttribute('cy'))
      };
    }).flatMap(offset => this.mousemove.map(pos => {
      const pt = convertCoords(pos.clientX, pos.clientY);
      return {
        y: pt.y - offset.y,
        x: pt.x - offset.x
      };
    }).takeUntil(this.mouseup))
    .subscribe(pos => {
      this.element.nativeElement.setAttribute('cy', pos.y);
      this.element.nativeElement.setAttribute('cx', pos.x);
    });
  }

}