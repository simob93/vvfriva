import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../global';

@Injectable()
export class VigiliService {
  constructor(public http: Http) {}
  /**
   *  ritorna la lista di tutti i vigili
   */
  list() {
    return this.http.get(`${GlobalVariable.BASE_API_URL}vvf/ws/vigili/list`)
   .map((res:Response) => res.json());
  }
  /**
   * ritorna una lista di codice valore e extra con la prima lettera disponibile
   * @param id 
   */
  getLettereDisp(id) {
    return this.http.get(`${GlobalVariable.BASE_API_URL}vvf/ws/vigili/getLettere?idSquadra=${id}`)
   .map((res:Response) => res.json());
  }

}
