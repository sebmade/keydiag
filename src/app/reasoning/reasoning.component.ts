import { Component, OnInit } from '@angular/core';

import { ModelService } from '../model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reasoning',
  templateUrl: './reasoning.component.html',
  styleUrls: ['./reasoning.component.css']
})
export class ReasoningComponent implements OnInit {
  private ztClass: string;
  private zpClass: string;
  private autresClass: string;
  private tClass: string;
  private nClass: string;
  private mClass: string;
  private tailleClass: string;

  constructor(private router: Router, private model: ModelService) {
    this.ztClass = model.data.zt.class;
    this.zpClass = model.data.zp.class;
    this.autresClass = model.data.autres.class;
    this.tClass = model.data.t.class;
    this.nClass = model.data.n.class;
    this.mClass = model.data.m.class;
    this.tailleClass = model.data.taille.class;
  }

  ngOnInit() {
  }

  open(id) {
    this.router.navigate(['/form', id]);
  }

  highlightZt(flag) {
    this.ztClass = this.highlight(flag, this.model.data.zt.class);
  }
  highlightZp(flag) {
    this.zpClass = this.highlight(flag, this.model.data.zp.class);
  }
  highlightAutres(flag) {
    this.autresClass = this.highlight(flag, this.model.data.autres.class);
  }
  highlightT(flag) {
    this.tClass = this.highlight(flag, this.model.data.t.class);
  }
  highlightN(flag) {
    this.nClass = this.highlight(flag, this.model.data.n.class);
  }
  highlightM(flag) {
    this.mClass = this.highlight(flag, this.model.data.m.class);
  }
  highlightTaille(flag) {
    this.tailleClass = this.highlight(flag, this.model.data.taille.class);
  }
  highlight(flag, defaultClass) {
    return (flag) ? 'over' : defaultClass;
  }

}
