/**
 * Created by Abhi on 10/9/16.
 */
export class Student{
    public student_ID: number;
    public first_name: string;
    public last_name: string;
    public email: string;
    
    public address : {
        address_line_1: string;
        address_line_2: string;
        city: string;
        current_state: string;
        country: string;
        zip_code: string;
    };
    public GPA: number;
}