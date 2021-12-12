import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {DistrictData } from './district-table.component';

import { InteractionService } from 'src/app/interaction.service';

@Injectable({providedIn:'root'})
export class DistrictDataService{
    statename:string;
    dataArray:DistrictData[]=[];

    constructor(private http:HttpClient, private interactionService:InteractionService ){

    }

    onfetchDistrictData(){
      
    this.interactionService.stateName$.subscribe(name=>{
    this.statename=name;

    return this.http.get('https://api.covid19india.org/state_district_wise.json')
     .pipe(map(responseData => {
     
     for(const key in responseData[this.statename]["districtData"]){
       this.dataArray
       .push({...responseData[this.statename]["districtData"][key],districtname:key});
     }  
       console.log(this.dataArray);
       return this.dataArray;
        
     }));
    });
    
    }

}