import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserAuthService } from '../../ui-features/service/user-auth.service'
;

@Component({
  selector: 'ngx-regis',
  templateUrl: './regis.component.html',
  styleUrls: ['./regis.component.scss']
})

export class RegisComponent implements OnInit{

  cat:''
  data:''
users:any
  userDetails:any
role=["user","executiveUser","fieldExecutiveUser"]
myForm=new FormGroup({
  firstName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$'),Validators.minLength(2),Validators.maxLength(20)]),
  lastName:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$'),Validators.minLength(2),Validators.maxLength(20)]),
  email:new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")]),
  password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]),
  contactNumber:new FormControl('',[Validators.required,Validators.pattern('[6-9][0-9]{9}')]),
  role:new FormControl('',[Validators.required])
  // otp:new FormControl('',[Validators.required,Validators.pattern('[0-9]{ ,6}')]),
})

constructor (private userServ:UserAuthService,private router:Router){}
ngOnInit(): void {
  this.userServ.Getalluser().subscribe((res: any) => {
    this.users=res
  })
}
get fdata(){
  return this.myForm.controls;
}
  postData()
  {
    let formdata = this.myForm.getRawValue();
    console.log(formdata)
   
    this.userServ.postRegis(formdata).subscribe((res: any) => {
     
      console.log("res1:" + res.uid)
    
      if (res.err == 0) {
        setInterval(() => {
 this.router.navigate(['pages/ui-features/otp-page']).then(() => {
            this.userServ.setData(res.uid);
          })
        })
      }
      if (res.err == 1) {
        Swal.fire(`${res.msg}`,'','warning');
      }
    })
  }

}
