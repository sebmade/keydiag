import { Component, ViewChild } from '@angular/core';

import { PanelComponent } from './panel/panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keydiag';

  @ViewChild(PanelComponent)
  private editPanel: PanelComponent;


  test(event) {
    console.log(event);
    this.editPanel.open(event);
  }
}
