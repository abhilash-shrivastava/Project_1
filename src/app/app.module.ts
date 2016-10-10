import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';
import {AddComponent} from "./add/add.component";
import {HomeComponent} from "./home/home.component";
import { FormsModule }   from '@angular/forms';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'add', component: AddComponent }
        ]),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
