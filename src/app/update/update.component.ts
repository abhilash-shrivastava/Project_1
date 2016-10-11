/**
 * Created by Abhi on 10/10/16.
 */
import {Component} from '@angular/core';
import {UpdateService} from "../services/update.service";
import {Student} from "../student";

@Component({
    selector: 'update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
    providers:[UpdateService]
})

export class UpdateComponent{
    submitted= false;
    student = new Student();
    errorMessage: string;
    mode = 'Observable';
    constructor(private updateService: UpdateService){}
    onSubmit(){
        this.submitted = true;
        this.addStudent(this.student);
    }

    addStudent(student: Student){
        if (!student) { return; }
        this.updateService.updateStudent(student)
            .subscribe(
                data => {},
                error =>  this.errorMessage = <any>error
            )
    }
}