import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { Schema2 } from './schema2';


@Component({
    selector: 'app-form',
    templateUrl: './schema2.component.html',
    styleUrls: ['./schema2.component.css']
})
export class Schema2Component implements OnInit {
    schema2: Schema2;
    multipleSelection: boolean = true;
    withList: boolean = false;
    selectedAreas: string[];

    ngOnInit(): void {
        this.schema2 = {
            href: "/assets/GG_blanc_frontal_axial.png",
            schema2Areas: [
                {
                    id: "1", title: "V. Aortico-cave",
                    d: "m 166.1267,41.60165 32,-3.5 35,0 23.5,0.5 17.5,4.5 5,7 2,12 0.5,22.5 -1,32 0,37 0.5,30.5 -1,31.5 2,22.5 1.5,12 0.5,16.5 -3,7 -9.5,3 -18.5,-0.5 -29,-3 -21.5,-1 -17.5,5.5 -7,3 -4,0 -5.5,-5 -6,-15.5 -3.5,-29.5 1,-27 0,-35 1,-28.5 -2,-18 -3,-23 -2.5,-28 2.5,-18.5 4,-7 z"
                },
                {
                    id: "2", title: "IV. Iliaque commun Droit",
                    d: "m 129.03571,388.51061 1.25,-11.5 17,-49.50001 14.75,-31.25 10.5,-13 7.75,-3.75 14.5,-5.5 13.75,-1.5 10.75,1.75 4.5,3.75 1,5.75 -0.25,28.75 -0.75,16.75 -25.5,31.75 -20,27.50001 -10,6.75 -5,1.75 -23.5,1.5 -6,-1 -4,-3.25 z"
                },
                {
                    id: "3", title: "IV. Iliaque commun Gauche",
                    d: "m 227.72497,279.52069 4.5,-3.75 5,-2 12,0.75 5.5,2 10.75,6 8.5,8 7.25,15 11,32.5 6,22.5 4.75,17.00001 2,11.25 -0.75,5.5 -2.5,4.75 -5.5,1.5 -12,0 -6.5,-0.5 -9.25,-5.5 -7.5,-9.25 -8.5,-15.00001 -9.75,-15 -9.5,-13 -7,-10.75 1,-28.75 -0.5,-16.75 z"
                },
                {
                    id: "4", title: "III. Présacré et pararectal",
                    d: "m 189.99991,373.82275 33.58758,-42.77996 2.82842,0.35356 29.34494,46.31549 1.41421,5.65686 0,5.65685 -3.88909,10.25305 -3.88909,14.14213 1.06066,10.96016 4.24264,20.85965 1.76777,20.5061 -0.7071,20.85965 -3.18199,10.25304 -3.53553,3.88909 -4.59619,2.12132 -10.96016,0.35355 -11.31371,-2.12132 -14.84924,-6.0104 -3.53553,-3.18198 -1.41422,-8.13173 1.41422,-13.08148 1.41421,-20.15254 -1.41421,-18.03122 -3.18198,-23.68808 -2.47487,-12.02082 -4.24265,-8.13172 -2.47487,-8.13173 z"
                }
            ]
        };
        this.selectedAreas = ["2"];
    }

    isAreaSelected(areaId: string) {
        return this.selectedAreas.findIndex(x => x == areaId) == -1 ? false : true;
    }

    onAreaClick(areaId: string) {
        // toggles selected area depending on selectedAreas and multipleSelection
        if (this.isAreaSelected(areaId)) {
            // unselects areaId
            this.selectedAreas = this.selectedAreas.filter(item => item !== areaId);
        } else {
            // selects areaId
            if (!this.multipleSelection && this.selectedAreas.length > 0) this.selectedAreas = [];
            this.selectedAreas.push(areaId);
        }
    }
}
