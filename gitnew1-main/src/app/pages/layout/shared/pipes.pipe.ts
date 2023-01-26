import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  
  transform(value:any, filterString:string, propertyName:string ) {//pipe user role
    const result:any=[]
    if(!value || filterString=='' || propertyName==''){
      console.log("value is "+value)
      return value
    }
    value.forEach((a:any)=>{
      if(a[propertyName]== filterString){
        result.push(a);
      }
      
    })
      return result;
   
  }

}
