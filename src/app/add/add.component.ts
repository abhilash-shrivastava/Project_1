/**
 * Created by Abhi on 10/9/16.
 */
import { Component } from '@angular/core';
import {Student} from './../student'

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
})

export class AddComponent{
    student = new Student();
    address = {};
    onSubmit(){
        console.log("submit");
    }
}