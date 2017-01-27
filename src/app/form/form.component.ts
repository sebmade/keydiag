import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ModelService } from '../model.service';

const T2ZP = [
  'Hypersignal uniforme',
  'Hyposignal linéaire, triangulaire ou géographique mal défini',
  'Apparence intermédiaire 1/2 ou 4/5',
  'Hyposignal discret, homogène, focal/masse limitée à la prostate',
  'Hyposignal focal homogène avec extension extracapsulaire',
  'Hyposignal focal homogène de caractère invasif',
  'Hyposinal focal homogène avec effet de masse sur la capsule',
  'Hyposignal focal homogène avec contact capsulaire >15 mm'
];
const T2ZT = [
  'Hypersignal homogène de contours bien définis',
  'Hypersignal hétérogène bien limité ("chaos organisé")',
  'Zone d\'hyposignal plus homogène, restant bien délimitée',
  'Apparence intermédiaire 1/2 ou 4/5',
  'Zone d\'hyposignal plus homogène, mal délimitée ("comme effacée au fusain")',
  'Hyposignal mal délimité du SFMA en goutte ou lenticulaire',
  'Hyposignal mal délimité de la corne antérieure de la ZP en goutte ou lenticulaire',
];

const DIFFUSION = [
  '1- ADC et diffusion normaux',
  '2- ADC bas + hypersignalen diffusion diffus, sans lésion focale',
  '2- ADC bas + hypersignalen diffusion de forme linéaire, triangulaire ou géométrique',
  '3- Apparence intermédiaire 1/2 ou 4/5',
  '4- ADC bas focal + Diffusion isointense',
  '5- ADC bas + Hypersignal Diffusion focal/masse'
];

const PERFUSION = [
  '1- courbe de type 1',
  '2- courbe de type 2 symétrique sans caractère focal',
  '3- courbe de type 2 asymétrique',
  '4- courbe de type 2 focale, asymétrique',
  '3- courbe de type 3 symétrique sans caractère focal',
  '4- courbe de type 3 asymétrique',
  '5- courbe de type 3 focale, asymétrique',
  '3- SFMA: courbe de type 2 symétrique',
  '4- SFMA: courbe de type 2 focale',
  '4- SFMA: courbe de type 3 symétrique',
  '5- SFMA: courbe de type 3 focale',
];

const POSITIONS: any = [
  { text: '', cols: 1, rows: 1, color: 'white' },
  { text: 'D', cols: 2, rows: 1, color: 'white' },
  { text: 'G', cols: 2, rows: 1, color: 'white' },
  { text: 'Base', cols: 1, rows: 2, color: 'white' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'Milieu', cols: 1, rows: 3, color: 'white' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-médial', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-médial', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'Apex', cols: 1, rows: 3, color: 'white' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'Antérieur', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-latéral', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-médial', cols: 2, rows: 1, color: '#DDBDF1' },
  { text: 'postéro-médial', cols: 2, rows: 1, color: '#DDBDF1' },
];

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private formType;
  private t2zp = T2ZP;
  private t2zt = T2ZT;
  private diffusion = DIFFUSION;
  private perfusion = PERFUSION;
  private positions = POSITIONS;

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
