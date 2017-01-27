import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'keydiag-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input() options;
  @Input() id;
  @Output() close: EventEmitter<PanelComponent> = new EventEmitter();
  isOpen: boolean;
  private opener;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.options = Object.assign({ title: '', size: '400px' }, this.options);
  }

  ngOnDestroy() {
  }

  open(event?: MouseEvent) {
    console.log('open');
    this.isOpen = true;
    if (event) {
      this.opener = event.target;
    }
  }

  onClose(event?: MouseEvent) {
    console.log('onClose');
    this.isOpen = false;
    this.close.next(this);
    if (event) {
      event.stopPropagation();
    }
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    console.log('onOutsideClick');
    if (this.isOpen && !this.element.nativeElement.contains(event.target) && this.opener != event.target) {
      this.onClose(event);
    }
  }

}
