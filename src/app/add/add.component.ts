/**
 * Created by Abhi on 10/9/16.
 */
import { Component } from '@angular/core';
import {Student} from './../student'
import {AddService} from './../services/add.service'

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    providers: [AddService]
})

export class AddComponent{
    submitted= false;
    student = new Student();
    errorMessage: string;
    mode = 'Observable';
    constructor(private addService: AddService){}
    onSubmit(){
        this.submitted = true;
        this.addStudent(this.student);
    }

    addStudent(student: Student){
        if (!student) { return; }
        this.addService.addStudent(student)
            .subscribe(
                data => {},
                error =>  this.errorMessage = <any>error
            )
    }
}