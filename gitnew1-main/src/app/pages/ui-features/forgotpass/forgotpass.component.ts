import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'ngx-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent {
  msg = ' '
  constructor(private userServ:UserAuthService,private router:Router){}
  myForm=new FormGroup({
   
    email:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
  })
 
  get fdata(){
    return this.myForm.controls;
  }
myFunction(){
  let formdata = this.myForm.getRawValue();
  let email = formdata.email;
 
  this.userServ.resetmail(formdata).subscribe((res: any) => {
    setInterval(() => {
 this.router.navigate(['pages/ui-features/login']).then(() => {
            this.userServ.setData(email);
          })
        })
    
        if (res)
    {
      Swal.fire("Mail sent",`${res.msg}`,'success')
      }
  
    
  })
  }

}
