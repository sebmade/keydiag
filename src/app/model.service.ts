import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModelService {
  public data: any = {
    taille: {
      class: 'cls-3'
    },
    zt: {
      class: 'cls-3'
    },
    zp: {
      class: 'cls-3'
    },
    autres: {
      class: 'cls-3'
    },
    n: {
      class: 'cls-3'
    },
    m: {
      class: 'cls-3'
    },
    t: {
      class: 'cls-3'
    }

  };
  public dataSubject = new Subject<any>();

  constructor() { }

  update() {
    this.dataSubject.next(this.data);
  }

}
