import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/take';

import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { element } from 'protractor';
import { merge } from 'rxjs/observable/merge';

export interface Edges {
  top?: boolean | number;
  bottom?: boolean | number;
  left?: boolean | number;
  right?: boolean | number;
}

const isWithinBoundingY: Function = ({mouseY, rect}: { mouseY: number, rect: ClientRect }) => {
  return mouseY >= rect.top && mouseY <= rect.bottom;
};

const isWithinBoundingX: Function = ({mouseX, rect}: { mouseX: number, rect: ClientRect }) => {
  return mouseX >= rect.left && mouseX <= rect.right;
};

const isNumberCloseTo: Function = (value1: number, value2: number, precision: number = 3): boolean => {
  const diff: number = Math.abs(value1 - value2);
  return diff < precision;
};

const getResizeEdges: Function = ({mouseX, mouseY, elm, allowedEdges}): Edges => {
  const elmPosition: ClientRect = elm.nativeElement.getBoundingClientRect();
  const edges: Edges = {};
  if (allowedEdges.left && isNumberCloseTo(mouseX, elmPosition.left) && isWithinBoundingY({ mouseY, rect: elmPosition })) {
    edges.left = true;
  }
  if (allowedEdges.right && isNumberCloseTo(mouseX, elmPosition.right) && isWithinBoundingY({ mouseY, rect: elmPosition })) {
    edges.right = true;
  }
  if (allowedEdges.top && isNumberCloseTo(mouseY, elmPosition.top) && isWithinBoundingX({ mouseX, rect: elmPosition })) {
    edges.top = true;
  }
  if (allowedEdges.bottom && isNumberCloseTo(mouseY, elmPosition.bottom) && isWithinBoundingX({ mouseX, rect: elmPosition })) {
    edges.bottom = true;
  }
  return edges;
};

const getResizeCursor: Function = (edges: Edges): string => {
  if (edges.left && edges.top) {
    return 'nw-resize';
  } else if (edges.right && edges.top) {
    return 'ne-resize';
  } else if (edges.left && edges.bottom) {
    return 'sw-resize';
  } else if (edges.right && edges.bottom) {
    return 'se-resize';
  } else if (edges.left || edges.right) {
    return 'ew-resize';
  } else if (edges.top || edges.bottom) {
    return 'ns-resize';
  } else {
    return null;
  }
};


@Directive({
  selector: '[resizable]'
})
export class ResizableDirective implements OnInit, OnDestroy {
  private resizeEdges = { left: true, bottom: true, top: true, right: true };
  /**
  * @private
  */
  public mouseup: Subject<any> = new Subject();

  /**
   * @private
   */
  public mousedown: Subject<any> = new Subject();

  /**
   * @private
   */
  public mousemove: Subject<any> = new Subject();

  constructor(private renderer: Renderer, public elm: ElementRef) { }

  ngOnInit() {
    let currentResize = false;

    this.mousemove.subscribe(({mouseX, mouseY, event}) => {

      if (currentResize) {
        event.preventDefault();
      }
      const resizeEdges: Edges = getResizeEdges({ mouseX, mouseY, elm: this.elm, allowedEdges: this.resizeEdges });
      const cursor: string = currentResize ? null : getResizeCursor(resizeEdges);
      this.renderer.setElementStyle(this.elm.nativeElement, 'cursor', cursor);

    });

    let ry = parseFloat(this.elm.nativeElement.getAttribute('ry'));
    let rx = parseFloat(this.elm.nativeElement.getAttribute('rx'));
    let lastCoords: {mouseX: number, mouseY: number};
    const getDiff: Function = moveCoords => {
      return {
        offsetX: moveCoords.mouseX - lastCoords.mouseX,
        offsetY: moveCoords.mouseY - lastCoords.mouseY
      };
    };

    this.mousedown.map(({ mouseX, mouseY }) => {
      lastCoords = {
        mouseX: mouseX,
        mouseY: mouseY
      };
      return {
        edges: getResizeEdges({ mouseX, mouseY, elm: this.elm, allowedEdges: this.resizeEdges }),
        mouseX: mouseX,
        mouseY: mouseY
      };
    }).filter((value: { mouseX, mouseY, edges: Edges }) => {
      return Object.keys(value.edges).length > 0;
    }).subscribe((value: { mouseX, mouseY, edges: Edges }) => {
      console.log('mousedown', value);
      this.mousemove.map((moveCoords) => {
        return getDiff(moveCoords);
      }).takeUntil(this.mouseup).subscribe((diffCoords) => {
        currentResize = true;
        console.log('mousemove', diffCoords);
        this.elm.nativeElement.setAttribute('ry', ry + diffCoords.offsetY);
        this.elm.nativeElement.setAttribute('rx', rx + diffCoords.offsetX);
      });
    });

    this.mouseup.subscribe((mouseCoords) => {
      if (currentResize) {
        console.log('mouseup', mouseCoords);
        currentResize = false;
        lastCoords = mouseCoords;
        ry = parseFloat(this.elm.nativeElement.getAttribute('ry'));
        rx = parseFloat(this.elm.nativeElement.getAttribute('rx'));
        }
    });

  }

  ngOnDestroy(): void {
    this.mousedown.complete();
    this.mouseup.complete();
    this.mousemove.complete();
  }

  @HostListener('document:touchmove', ['$event', '$event.targetTouches[0].clientX', '$event.targetTouches[0].clientY'])
  @HostListener('document:mousemove', ['$event', '$event.clientX', '$event.clientY'])
  onMousemove(event: MouseEvent, mouseX: number, mouseY: number): void {
    this.mousemove.next({ mouseX, mouseY, edges: { left: true, bottom: true, top: true, right: true }, event });
  }

  @HostListener('document:touchstart', ['$event.touches[0].clientX', '$event.touches[0].clientY'])
  @HostListener('document:mousedown', ['$event.clientX', '$event.clientY'])
  onMousedown(mouseX: number, mouseY: number): void {
    this.mousedown.next({ mouseX, mouseY, edges: { left: true, bottom: true, top: true, right: true } });
  }

  @HostListener('document:touchend', ['$event.changedTouches[0].clientX', '$event.changedTouches[0].clientY'])
  @HostListener('document:touchcancel', ['$event.changedTouches[0].clientX', '$event.changedTouches[0].clientY'])
  @HostListener('document:mouseup', ['$event.clientX', '$event.clientY'])
  onMouseup(mouseX: number, mouseY: number): void {
    this.mouseup.next({ mouseX, mouseY, edges: { left: true, bottom: true, top: true, right: true } });
  }

}