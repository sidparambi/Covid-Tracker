import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {StateData } from './table-tracker.component'


@Injectable({providedIn:'root'})
export class TableData{

    constructor(private http:HttpClient){

    }

    fetchStatewiseData(){
        return this.http.get('https://api.covid19india.org/data.json')
     .pipe(map(responseData => {
       const dataArray:StateData[] = [];
       const finalData:StateData[] = [];
 
       for(const key in responseData){
           
         if(responseData.hasOwnProperty(key) && key==="statewise"){
           dataArray.push(responseData[key]);
           for(var i = 0; i < dataArray.length;i++){
               for(var j=0;j<responseData[key].length;j++){
                   if(dataArray[i][j].state!="Total" && dataArray[i][j].state!="State Unassigned"){
                     finalData.push(dataArray[i][j]);
                    
                    }
                 
               }
           
             }
         }
       }
       
       return finalData;
     }))
     }


}