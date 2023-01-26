import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../ui-features/service/user-auth.service';

@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route : ActivatedRoute, private ser : UserAuthService) { }
id1:any
user:any
  ngOnInit(): void {
  
   this.id1 = this.route.snapshot.paramMap.get('id')
   console.log(this.id1)
   this.ser.getuserById(this.id1).subscribe((res)=>{
    this.user=res

   })
  }
  
}
