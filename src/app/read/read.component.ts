/**
 * Created by Abhi on 10/9/16.
 */
import {Component} from '@angular/core'
import {ReadService} from './../services/read.service'
import {Student} from "../student";


@Component({
    selector: 'read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.css'],
    providers: [ReadService]
})

export class ReadComponent{
    student = new Student();
    students = [];
    errorMessage: string;
    mode = 'Observable';
    constructor(private addService: ReadService){}
    ngOnInit(){
        this.viewAllStudents();
    }

    viewAllStudents(){
        this.addService.viewAllStudents()
            .subscribe(
                data => {
                    this.students = data;
                },
                error =>  this.errorMessage = <any>error
            )
    }
}