import { Component, OnInit } from '@angular/core';
import {VigiliService} from './vigili.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LogInComponent} from '../log-in/log-in.component';


declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-vigili',
  templateUrl: './vigili.component.html',
  styleUrls: ['./vigili.component.scss'],
  providers: [VigiliService]
})
export class VigiliComponent implements OnInit {
  vigile: FormGroup;
  listVigili: any;
  totaleVigili: number;
  ttleWin: string = '';
  totaleVigiliAttesa: number = 0;
  tmp: any; // supporto per filtro
  grado: any = ['Nessun grado', 'Vigile', 'Caposquadra', 'Capoplotone', 'Comandante', 'Vice comandante', 'Vice ispettore'];
  squadra: any = ['Nessuna squadra', 1, 2, 3, 4, 5, 6];
  lock: boolean = false;
 
  constructor(
    public vigiliService: VigiliService,
    private fb: FormBuilder,
  ) { }
 
  /**
   * 
   * @param value 
   */
  trova (value) {
    this.listVigili = this.tmp;
    this.listVigili= this.listVigili.filter( it => it.nome.toLowerCase().includes(value));
    this.totaleVigili =  this.listVigili.length;
  }
  /**
   * 
   */
  clickNuovo() {
    this.ttleWin = 'Nuovo Vigile'
    this.vigile.reset()
  }
  /**
   * 
   * @param vigile 
   */
  editVigile(vigile) {
    this.ttleWin = 'Modfica Vigile'
    delete vigile.squadra;
    this.vigile.setValue(vigile);
    $('#form-vigili').modal('show')
  }
  /**
   * 
   */
  getVigiliAttesa(): number {
    let count = 0;
    this.listVigili.forEach(element => {
        if (!element.squadra) {
          count++;
        }
    });
    return count;
  }
/**
 * 
 * @param value 
 */
  getLetteraVigile(value) {
    debugger;
    this.vigiliService.getLettereDisp(value).subscribe(rec => {
      if (rec.data.length > 0) {
        this.vigile.controls['letteraVigile'].setValue(rec.data[0].valore);
      }
    });
  }
  /**
   * 
   */
  ngOnInit() {
    //dichiarazione form 
    this.vigile = this.fb.group({
			id: '',
			//nomeScuola: ['', Validators.required ],
      nome: [null, Validators.required ],
      cognome: [null, Validators.required ],
      dataNascita: [null, Validators.required ],
      grado: [null, Validators.required ],
      qualifica: '',
      idSquadra:'',
      patente: '',
      cercaPersone: '',
      capoSquadra: '',
      note: '',
      letteraVigile: null
    });
    
    /**
     *  validazione dei campi custom, idSquadra, se ho una sqaudra la lettera del vigile è oligatoria 
     */
    this.vigile.get('idSquadra').valueChanges.subscribe(value => {
      let cmpLettera = this.vigile.get('letteraVigile');  
      if (value !== null) {
        cmpLettera.setValidators([Validators.required]);
      } else {
          cmpLettera.setValidators(null);
      }
      cmpLettera.updateValueAndValidity();
    });

    this.vigiliService.list().subscribe(rec => {
        this.listVigili = rec.data;
        this.tmp = rec.data;
        this.totaleVigili = rec.data.length;
        this.totaleVigiliAttesa = this.getVigiliAttesa();
        
    });
  }

}
