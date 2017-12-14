import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../global';

@Injectable()
export class VigiliService {
  constructor(public http: Http) {}
  list() {
    return this.http.get(`${GlobalVariable.BASE_API_URL}vvfriva/rest/vigile/list`)
   .map((res:Response) => res.json());
  }

}
