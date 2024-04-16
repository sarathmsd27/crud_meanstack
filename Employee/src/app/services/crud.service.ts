import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable, throwError } from 'rxjs';
import {catchError,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

//node api link
REST_API:string="http://localhost:8000/api"; 

//client couldn't directly interact with server.which throws error.To rectify those errors backend enables the cors.for this cors we have to use httpheaders.
httpHeaders = new HttpHeaders().set("Content-Type",'application/json')

  constructor(private httpClient:HttpClient) { }

  //add records
  AddEmployee(data:Employee):Observable<any>{
     let API_URL = `${this.REST_API}/add-employee`;
     return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }
//get records
getEmployees(){
  return this.httpClient.get(`${this.REST_API}`);
}

//getEmployeeby id

getEmployee(id:any):Observable<any>{
  let API_URL = `${this.REST_API}/read-employee/${id}`;
  return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
    return res || {}  
  }),
  catchError(this.handleError)
  )
}

//updateemployee

updateEmployee(id:any,data:any):Observable<any>{
  let API_URL =`${this.REST_API}/update-employee/${id}`;
  return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
  )
  }

  //delete employee
deleteEmployee(id:any):Observable<any>{
   let API_URL = `${this.REST_API}/delete-employee/${id}`;
   return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
    catchError(this.handleError)
   )
}
  
//error

handleError(error:HttpErrorResponse){
  let errorMessage = "";
  if(error.error instanceof ErrorEvent){
    //handle client error
    errorMessage =error.error.message;
  }
  else{
    //handle server error
    errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}


}