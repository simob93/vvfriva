import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { VigiliComponent } from './vigili/vigili.component';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';

const appRoutes: Routes = [
  { path: 'vigili', component: VigiliComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VigiliComponent,
    LogInComponent
  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
