import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProductServicesService } from 'src/app/services/product-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{
  imgsrc='https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg'
  value = 0;
  filteredString:string='';
  count = 0;
  user: any=[];
  islogedin!: boolean ;
  isadmin!: boolean;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  myuser: any;
  img: boolean = false;
constructor(private pser:ProductServicesService,private auth:AuthServiceService,private router:Router){

}
  
  ngOnInit() {
    var user:any=localStorage.getItem('userdata');
    let userdata = JSON.parse(user);
    
   this.pser.getimage(userdata.email).subscribe(res => {
           if (res) {
             console.log("imageurl="+res.imageURL)
             this.imgsrc = res.imageURL;
             this.img = true;
           }
   })
    
    this.islogedin = this.auth.isLogedIn();
    this.isadmin = this.auth.isAdmin();
    
    this.user = localStorage.getItem('userdata');
    this.myuser=JSON.parse(this.user);
     console.log(this.myuser)
    if(localStorage.getItem('mycart')!=undefined){
      let cdata:any=localStorage.getItem('mycart');
      let data=JSON.parse(cdata);
      this.count = data.length;
      
    }
    this.pser.subject.subscribe((res:any)=>{
      let data=res.cartData;
      this.count=data.length;
      console.log(data)
    })
  }
  logout() {
    localStorage.removeItem('_token');
    localStorage.removeItem('userdata');
     this.router.navigate(['/signin']).then(() => {
            window.location.reload();
          })
 }
   toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  myForm=new FormGroup({
    name:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    manufacturer:new FormControl('',[Validators.required]),
    availableItems:new FormControl('',[Validators.required])
  })
  imagePath:any='';
  errMsg='';
  
  upImage(event:any){
      if(event.target.files.length>0){
        this.imagePath = event.target.files[0];
      }
  }

  formData(){
    if(this.imagePath!=''){
       if(this.imagePath.type==="image/jpg" || this.imagePath.type==="image/jpeg" || this.imagePath.type==="image/png"){
          //when we upload any attaachment we send data with formdata 
          let fdata=this.myForm.getRawValue();
          let formData=new FormData();
         var user:any=localStorage.getItem('userdata');
         let userdata = JSON.parse(user);
         console.log("user" + userdata.email)
          formData.append("email",userdata.email)
          formData.append("attach",this.imagePath);
          this.pser.profilePic(formData)
          .subscribe((res:any)=>{
            if(res.err==0){
                Swal.fire(res.msg,'','info');
            }
            if(res.err==1){
              this.errMsg=res.msg;
            }
             setInterval(() => {
               window.location.reload();
            },2000)
      
           
          })
         
       }
       else {
        this.errMsg="Only support jpg or png images";
       }
    }
    else{
      this.errMsg="Please select a image";
    }
   
  }


}
