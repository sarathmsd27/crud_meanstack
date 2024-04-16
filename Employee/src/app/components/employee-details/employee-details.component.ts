import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  getId!:any;
  updateForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private router:Router,
    private ngZone:NgZone,
    private activatedRoute:ActivatedRoute,private crudApi:CrudService) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudApi.getEmployee(this.getId).subscribe(res=>{
        this.updateForm.setValue({
          name:res['name'],
          age:res["age"],
          email:res["email"],
          dept:res["dept"]
        })
      });
      this.updateForm = this.formBuilder.group({
        name:[""],
        age:[""],
        email:[""],
        dept:[""]
      })
    }

  ngOnInit(): void { }
  onUpdate(){
    this.crudApi.updateEmployee(this.getId,this.updateForm.value).subscribe(res=>{
      console.log("Data Updated Successfully");
      this.ngZone.run(()=>{this.router.navigateByUrl("/employee-list")})
    },(err)=>{
      console.log(err)
    })
  }
}