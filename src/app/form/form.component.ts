import * as constants from '../constants';

import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ModelService } from '../model.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private formType;
  private t2zp = constants.T2ZP;
  private t2zt = constants.T2ZT;
  private diffusion = constants.DIFFUSION;
  private perfusion = constants.PERFUSION;
  private positions = constants.POSITIONS;

  constructor(private route: ActivatedRoute, private model: ModelService) {
    this.route.params.subscribe((params: Params) => {
      this.formType = params['id'];
    });
  }

  ngOnInit() {
  }

  changeData() {
    this.model.data[this.formType].class = 'start';
    this.model.update();
  }

}
