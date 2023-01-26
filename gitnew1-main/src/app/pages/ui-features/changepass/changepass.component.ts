import { RESTORED_VIEW_CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'ngx-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangepassComponent implements OnInit{
  email = ''
  
  constructor(private userserv: UserAuthService,private route: ActivatedRoute,private router:Router ) { }
  ngOnInit(): void { 
    this.email= this.route.snapshot.paramMap.get('id');
 console.log(this.email)
  }
  myForm=new FormGroup({
    password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}')]),
   
  })
  get fdata(){
    return this.myForm.controls;
  }
 
  postData() {
    console.log(this.email);
    let formdata = this.myForm.getRawValue();
    console.log(formdata);
    let userdata = { "password": formdata.password, 'email': this.email }
    console.log(userdata)
    this.userserv.changepass(userdata).subscribe((res:any) => {
      if(res.err==0)
      {
        Swal.fire(`${res.msg}`, 'now you can log in', 'success') 
        this.router.navigate(['/pages/ui-features/login'])
      }
      
   })

      }
  
}
