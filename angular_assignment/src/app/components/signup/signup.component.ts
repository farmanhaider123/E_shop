import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  status: boolean = true;
  myForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
    lastName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]+')]),
        email:new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
        contactNumber:new FormControl('',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]),
      
        password:new FormControl('',[Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
       
   

   })
  constructor(private authSer:AuthServiceService,private router:Router) { }
  errMsg:any;
  succMsg:any;
  ngOnInit(): void {
  }
   get fdata(){
     return this.myForm.controls;
   }
 postData(){
   let formData = this.myForm.getRawValue();

   this.authSer.postRegis(formData)
   .subscribe((res:any)=>{
     if(res.err==0){
        Swal.fire(`${res.msg}`,'To Login this account First you need to activate this account activation link is send to your registred mail  ','success');
     }
     if(res.err==1){
      Swal.fire(`${res.msg}`,'','warning');
     }
   })
 }
}
