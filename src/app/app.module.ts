import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';
import {AddComponent} from "./add/add.component";
import {HomeComponent} from "./home/home.component";
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {ReadComponent} from "./read/read.component";
import {UpdateComponent} from "./update/update.component";
import {DeleteComponent} from "./delete/delete.component";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'add', component: AddComponent },
            { path: 'read', component: ReadComponent },
            { path: 'update', component: UpdateComponent },
            { path: 'delete', component: DeleteComponent }
        ]),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddComponent,
        ReadComponent,
        UpdateComponent,
        DeleteComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
