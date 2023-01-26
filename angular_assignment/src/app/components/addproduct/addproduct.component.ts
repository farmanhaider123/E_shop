import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServicesService } from 'src/app/services/product-services.service';
import Swal from 'sweetalert2';
FormBuilder
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
  constructor(private pser: ProductServicesService, private router: Router,public fb: FormBuilder) { }
categories: any = ['men', 'women', 'kids']
 
 
   myData = { category: '', pname: '', price: '', quantity: '', description: '', image: '' }
  ngOnInit(): void {
  }
 
  postdata() {
    
    this.pser.postData(this.myData)
     .subscribe(res=>{
      if(res){
         Swal.fire("Product Added Sucessfully",'','success');
         this.router.navigate(['/products']);
      }
     })
  }
}