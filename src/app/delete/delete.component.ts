/**
 * Created by Abhi on 10/10/16.
 */
import {Component} from '@angular/core'
import {Student} from "../student";
import {DeleteService} from "../services/delete.service";

@Component({
    selector: 'delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css'],
    providers:[DeleteService]
})

export class DeleteComponent{
    submitted= false;
    student = new Student();
    errorMessage: string;
    mode = 'Observable';
    constructor(private deleteService: DeleteService){}
    onSubmit(){
        this.submitted = true;
        this.addStudent(this.student);
    }

    addStudent(student: Student){
        if (!student) { return; }
        this.deleteService.deleteStudent(student)
            .subscribe(
                data => {},
                error =>  this.errorMessage = <any>error
            )
    }
}