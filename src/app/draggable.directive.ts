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
    let svg = this.element.nativeElement.ownerSVGElement;
    this.mousedrag = this.mousedown.map(event => {
      let pt = svg.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      pt = pt.matrixTransform(svg.getScreenCTM().inverse());
      return {
        left: pt.x - parseFloat(this.element.nativeElement.getAttribute('cx')),
        top: pt.y - parseFloat(this.element.nativeElement.getAttribute('cy'))
      };
    }).flatMap(imageOffset => this.mousemove.map(pos => {
      let pt = svg.createSVGPoint();
      pt.x = pos.clientX;
      pt.y = pos.clientY;
      pt = pt.matrixTransform(svg.getScreenCTM().inverse());
      console.log('offset', imageOffset);
      return {
        top: pt.y - imageOffset.top,
        left: pt.x - imageOffset.left
      };
    }).takeUntil(this.mouseup));

    this.mousedrag.subscribe(pos => {
      console.log('drag', pos);
      this.element.nativeElement.setAttribute('cy', pos.top);
      this.element.nativeElement.setAttribute('cx', pos.left);
    });
  }

}