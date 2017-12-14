import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  username: string = '';
  password: string = '';
  messagge: string = '';
  isLogin: boolean = false;
  @Output() doLogin = new EventEmitter();
  constructor() {
   
  }

  doExit() {
    this.messagge = '';
  }

  doLogOut() {
    this.isLogin = false;
    this.username = '';
    this.password = '';
    this.doLogin.emit(false);
  }

  logIn() {
    this.isLogin = false;
    if ((this.username === 'capoplotone' && this.password === 'capoplotone') ||
        (this.username === 'segretario' && this.password === 'segretario')) {
          this.isLogin = true;
    }

    if(!this.isLogin) {
      this.messagge = 'Nome utente o password errati';
    } else {
      $('#login').modal('hide')
    }
    this.doLogin.emit(this.isLogin);
  }
  ngOnInit() {
  }

}
