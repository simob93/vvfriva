import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   *  composizione del menu principale
   */
  itemsMenu:any[] = [
      {
        descr:'Gestione Vigili',
        view: '/vigili',
        admin: true
      },
      {
        descr: 'Gestione Protocolli',
        view: '/protocolli',
        admin: true
      },
      {
        descr: 'Gestione rubrica',
        view: '',
        admin: true
      },
      {
        descr: 'Gestione Squadre',
        view: '',
        admin: true
      } 
  ];
  title = 'app';
}
