import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
   Employees:any=[];
  constructor(private crudApi:CrudService ) {}

  ngOnInit(): void {
    this.crudApi.getEmployees().subscribe((res)=>{
    console.log(res)
    this.Employees=res;
    })
  }
  delete(id:any,i:any){
    console.log(id);
    if(window.confirm("Are you sure want to delete!!!")){
      this.crudApi.deleteEmployee(id).subscribe(res=>{
      this.Employees.splice(i,1);
      window.location.reload()
      })
    }
  }

}
