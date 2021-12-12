import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {timeSeriesData } from './time-series-data.model'


@Injectable({providedIn:'root'})
export class CardData{

    constructor(private http:HttpClient){

    }

    fetchCardData(){
       return this.http.get('https://api.covid19india.org/data.json')
    .pipe(map(responseData => {
      const dataArray:timeSeriesData[] = [];
      const finalData:timeSeriesData[] = [];

      for(const key in responseData){
          
        if(responseData.hasOwnProperty(key) && key==="cases_time_series"){
          dataArray.push(responseData[key]);
          for(var i = 0; i < dataArray.length;i++){
              for(var j=0;j<responseData[key].length;j++){
                
                if(j==responseData[key].length-1){
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