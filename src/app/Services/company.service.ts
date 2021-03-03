import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Companies, Employee, Skills, Education } from '../ViewModels/companies';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable <Companies[]>
  {
    return this.http.get<Companies[]>(`${environment.URLvar}/company`);
  }

  getAllEmployees(): Observable <Employee[]>
  {
    return this.http.get<Employee[]>(`${environment.URLvar}/employee`)
  }
  getAllSkills(): Observable <Skills[]>
  {
    return this.http.get<Skills[]>(`${environment.URLvar}/skillSet`)
  }
  getAllEducations(): Observable <Education[]>
  {
    return this.http.get<Education[]>(`${environment.URLvar}/education`)
  }



  getEmployeesByCompanyID(cID : number) : Observable <Employee[]>
  {
    return this.http.get <Employee[]>(`${environment.URLvar}/employee?CompanyID=${cID}`)
  }
  getSkillsByEmployeesID(eID : number) : Observable <Skills[]>
  {
    return this.http.get <Skills[]>(`${environment.URLvar}/skillSet?employeeID=${eID}`)
  }
  getEducationByEmployeesID(eID : number) : Observable <Education[]>
  {
    return this.http.get <Education[]>(`${environment.URLvar}/education?employeeID=${eID}`)
  }



  addCompany(comp: Companies):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
    return this.http.post<any>(`${environment.URLvar}/company`,JSON.stringify(comp), httpOptions);
  }

  addEmployee(emp: Employee):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
    return this.http.post<any>(`${environment.URLvar}/employee`,JSON.stringify(emp), httpOptions);
  }

  addSkill(skill : Skills) : Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
    return this.http.post<any>(`${environment.URLvar}/skillSet`,JSON.stringify(skill), httpOptions);
  }

  addEducation(edu : Education) : Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
    return this.http.post<any>(`${environment.URLvar}/education`,JSON.stringify(edu), httpOptions);
  }

  deleteCompany(cID: number):Observable<void>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      //,'Accept':' */*'
      //,'Authorization': 'my-auth-token'
        })};
    return this.http.delete<void>(`${environment.URLvar}/company/${cID}`, httpOptions);
  }

  
}
