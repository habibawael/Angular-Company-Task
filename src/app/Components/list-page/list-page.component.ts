import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Companies} from '../../ViewModels/companies'
import {Employee} from '../../ViewModels/companies'
import {CompanyService} from '../../Services/company.service'
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

export class ListPageComponent implements OnInit {

  displayedColumns = ["name", "email", "phone","createdAt", "Action"];

  filterTerm: string ='';
  subscription : Subscription | null =null;
  subscription2 : Subscription | null = null;
  subscription3 : Subscription | null =null;
  subscription4 : Subscription | null = null;

  datetoday = new Date(Date.now());
  len : number = 0;
  p: number = 1;
  
  comp : Companies[] = [];
  companyy : Companies = {
    id : 0,
    name : '',
    address : '',
    email : '',
    phone : null,
    createdAt : this.datetoday.toDateString()
  }

  onButtonClicked(id : number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this company',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Company has been deleted.',
          'success'
        )
        this.subscription2 = this.compList.deleteCompany(id).subscribe();
        this.subscription = this.compList.getAllCompanies().subscribe(
          (response)=>{
          this.comp = response 
        },
        (err)=>{console.log(err)}

        );
      }
    })
    
  }


  
  constructor(private compList : CompanyService,
              private dialog: MatDialog
              ) { }


  editComp(){
    this.subscription3 = this.compList.deleteCompany(this.companyy.id).subscribe(
      (response)=>{
        this.subscription4 = this.compList.addCompany(this.companyy).subscribe(
          (response2)=>{

            this.subscription = this.compList.getAllCompanies().subscribe(
              (response)=>{
              this.comp = response
      
            },
            (err)=>{console.log(err)}
            );

          }
        )
      }
    )
      let dialogRef = this.dialog.closeAll()
      Swal.fire({
        title: 'Company Edited',
        text: 'Successfully',
        icon: 'success',
        
      })

  }
  sendData(co : Companies){
    this.companyy.id = co.id;
    this.companyy.name = co.name;
    this.companyy.phone = co.phone;
    this.companyy.address = co.address;
    this.companyy.createdAt = co.createdAt;
    this.companyy.email = co.email

  }
  openDialog(templateRef: any, company : Companies) {
    let dialogRef = this.dialog.open(templateRef, {
     width: 'fit-content'
     
   });
   this.sendData(company);
  }

  ngOnInit(): void {
    


    this.subscription = this.compList.getAllCompanies().subscribe(
      (response)=>{
      this.comp = response
      this.len = this.comp.length
    },
    (err)=>{console.log(err)}

    );

  }
  ngOnDestroy():void{
    this.subscription?.unsubscribe;
    this.subscription2?.unsubscribe;
  }
}