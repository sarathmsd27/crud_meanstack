import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
   employeeForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,private ngZone:NgZone,private crudApi:CrudService) { 
    this.employeeForm =  this.formBuilder.group({
      name:[''],
      age:[''],
      email:[''],
      dept:['']
    })
  }
  ngOnInit(): void {
    
    }
    onSubmit():any{
      this.crudApi.AddEmployee(this.employeeForm.value).subscribe((res:any)=>{
        console.log("data added successfully");
        this.ngZone.run(()=>{
         this.router.navigateByUrl("/employee-list")
        })
      })
  }
  
}
