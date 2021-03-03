import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/Services/company.service';
import { Companies, Employee, Skills, Education } from '../../ViewModels/companies';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})

export class FormPageComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('',[Validators.required])
  name = new FormControl('',[Validators.required])
  date = new FormControl('',[Validators.required])
  company = new FormControl('',[Validators.required])
  other = new FormControl('',[Validators.required])

  desSelectedValue: string | undefined ;
  comSelectedValue: string | undefined ;

  subscription : Subscription | null = null;
  subscription2: Subscription | null =null;
  subscription3: Subscription | null =null;
  subscription4: Subscription | null =null;
  subscription5: Subscription | null =null;

  x : number = 0;
  y : number = 0;
  z : number = 0;
  t : number = 0;

  companys: Companies[] = [];
  employees : Employee[] =[];
  allEmployees : Employee[] =[];
  skills : Skills[] =[];
  edus : Education[] =[];

  designations : string[] = ['Developer', 'Manager', 'System Admin', 'Team Lead', 'PM']
  skillsSet : string[] = ['Java', 'Angular', 'CSS', 'HTML', 'JavaScript', 'UI', 'SQL', 'React', 'PHP',
    'GIT', 'AWS', 'Python', 'Django', 'C','C++', 'C#', 'Unity', 'R', 'AI', 'NLP', 'Photoshop', 'Nodejs' ]
  skillsRate : number[] = [1,2,3,4,5]

  datetoday = new Date(Date.now());

  newCompany : Companies = {
    id : this.x,
    name : '',
    address : '',
    email : '',
    phone : null,
    createdAt : this.datetoday.toDateString()
  }

  newEmployee : Employee = {
    id : this.y,
    name : '',
    phone : null,
    email : '',
    designation : '',
    companyID : null,
    date : ''
  }

  newSkill : Skills = {
    id : this.z,
    skill : '',
    rate : null,
    employeeID : null
  }

  newEducation : Education = {
    id : this.t,
    name : '',
    course : '',
    year : '',
    employeeID : null
  }
  


  addComp(){

    if(!this.email.hasError('required') && ! this.email.hasError('email') && 
        !this.name.hasError('required') && !this.phone.hasError('required'))
    {
      this.x++;

      this.subscription5 = this.comp.addCompany(this.newCompany).subscribe()

      this.subscription = this.comp.getAllCompanies().subscribe(
        (response)=>{
        this.companys = response

      },
      (err)=>{console.log(err)}
      );
      
      let dialogRef = this.dialog.closeAll()
      Swal.fire({
        title: 'Company Added',
        text: 'Successfully',
        icon: 'success',
        
      })

    }
    else
    Swal.fire({
      title: 'Please Check',
      text: 'Your Company\'s Info',
      icon: 'error',
      
    })

    
  }

  addEmp(){
    if(!this.email.hasError('required') && ! this.email.hasError('email') && 
        !this.name.hasError('required') && !this.phone.hasError('required') &&
        !this.date.hasError('required')
        )
    {
      this.y++;

      this.subscription5 = this.comp.addEmployee(this.newEmployee).subscribe()

      this.subscription2 = this.comp.getAllEmployees().subscribe(
        (response)=>{
        this.allEmployees = response
        this.y = this.allEmployees.length
      },
      (err)=>{console.log(err)}
  
      );
      
      let dialogRef = this.dialog.closeAll()
      Swal.fire({
        title: 'Employee Added',
        text: 'Successfully',
        icon: 'success',
        
      })

    }
    else
    Swal.fire({
      title: 'Please Check',
      text: 'Your Employee\'s Info',
      icon: 'error',
      
    })

  }

  addSkill(){

    if(!this.name.hasError('required') && !this.phone.hasError('required') && !this.other.hasError('required'))
        {

          this.z++;

          this.subscription5 = this.comp.addSkill(this.newSkill).subscribe()
    
          this.subscription3 = this.comp.getAllSkills().subscribe(
            (response)=>{
            this.skills = response
            this.z = this.skills.length;
          },
          (err)=>{console.log(err)}
          );
          
          let dialogRef = this.dialog.closeAll()
          Swal.fire({
            title: 'Skill Added',
            text: 'Successfully',
            icon: 'success',
            
          })
        }
        else
        Swal.fire({
          title: 'Please Check',
          text: 'Your Skill\'s Info',
          icon: 'error',
          
        })

  }

  addEducation(){
    if(!this.name.hasError('required') && !this.company.hasError('required') 
        && !this.other.hasError('required') && !this.date.hasError('required'))
        {
      this.t++;

      this.subscription5 = this.comp.addEducation(this.newEducation).subscribe()

      this.subscription4 = this.comp.getAllEducations().subscribe(
        (response)=>{
        this.edus = response
        this.t = this.edus.length;
      },
      (err)=>{console.log(err)}
      );
      
      let dialogRef = this.dialog.closeAll()
      Swal.fire({
        title: 'Education Added',
        text: 'Successfully',
        icon: 'success',
        
      })
    }
    else
        Swal.fire({
          title: 'Please Check',
          text: 'Your Education\'s Info',
          icon: 'error',
          
        })

  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter an email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPhoneErrorMessage() {
    return this.phone.hasError('required') ? 'You must enter a number' :
            '';
  }
  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' :
            '';
  }
  getDateErrorMessage() {
    return this.date.hasError('required') ? 'You must enter a date' :
            '';
  }

  constructor(private dialog: MatDialog,
              private comp : CompanyService) { }

  openDialog(templateRef: any) {
    this.email.reset();
    this.phone.reset();
    this.name.reset();
    this.date.reset();
    this.other.reset();
    let dialogRef = this.dialog.open(templateRef, {
     width: 'fit-content'
     
   });
  }

  ngOnInit(): void {
    console.log("Today")
    console.log(new Date(Date.now()))
    this.subscription = this.comp.getAllCompanies().subscribe(
      (response)=>{
      this.companys = response
      this.x = this.companys.length
    },
    (err)=>{console.log(err)}

    );

    this.subscription2 = this.comp.getAllEmployees().subscribe(
      (response)=>{
      this.allEmployees = response
      this.y = this.allEmployees.length
    },
    (err)=>{console.log(err)}

    );

    this.subscription3 = this.comp.getAllEducations().subscribe(
      (response)=>{
      this.edus = response
      this.t = this.edus.length
    },
    (err)=>{console.log(err)}

    );

    this.subscription4 = this.comp.getAllSkills().subscribe(
      (response)=>{
      this.skills = response
      this.z = this.skills.length
    },
    (err)=>{console.log(err)}

    );

  }
  }


