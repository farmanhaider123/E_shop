import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../ui-features/service/user-auth.service';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
user:any
  constructor(private ser : UserAuthService, private route :ActivatedRoute) { }
id:any
  userdata:any
  ngOnInit(): void {
     this.id = this.route.snapshot.paramMap.get('id');
     console.log(this.id)
    
  }
  editdata(){

    this.ser.getuserById(this.id).subscribe((res:any)=>{
      this.userdata=res
  
    })
  }
  
}
