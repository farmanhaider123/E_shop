import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../service/user-auth.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
   email_c?:true;
  errMsg: any;
  data: any;
  status: Boolean=false;
  // constructor (private auth :AuthservService){}
  
  myForm=new FormGroup({
   
    email:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]),
    
  })
  
  constructor(private authSer: UserAuthService, private router: Router) { }
  
 
   get fdata(){
     return this.myForm.controls;
   }
  
  postData() {
    let formData = this.myForm.getRawValue();
    console.log(formData)
    this.authSer.getuserById(formData.email).subscribe((res) => {
      if (res) {
        console.log(this.data = res);
        this.status=this.data.status ;
              console.log("datastatus"+JSON.parse(this.data.status))
      }
      
    })
    this.authSer.postLogin(formData)
      .subscribe((res: any) => {
      console.log(this.status)
        if (this.status == true) {
          if (res.err == 0) {
            localStorage.setItem("_token", res.token);
            localStorage.setItem('userdata', JSON.stringify(this.data))
            this.router.navigate(['/pages/iot-dashboard']).then(() => {
              window.location.reload();
            })
          }
        }
        if (this.status == false) {
           Swal.fire(`Activate your account`, 'Please check your mail to activate your account', 'warning');
          
        }
        if (res.err == 1) {
            Swal.fire(`${res.msg}`, '', 'warning');
          }
      })
  }
 
}
