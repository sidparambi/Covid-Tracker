import { Component, Input, OnInit } from '@angular/core';
import {DistrictDataService} from './district-data.service';
import {TableTrackerComponent} from '../table-tracker/table-tracker.component';
import { InteractionService } from 'src/app/interaction.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


export interface DistrictData{
  notes:string;
  active:number;
  confirmed:number;
  migratedother:number;
  deceased:number;
  recovered:number;
  delta:[];
  districtname:string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA= [
  {active: 0,
confirmed: 0,
deceased: 0,
delta: {confirmed: 0, deceased: 0, recovered: 0},
districtname: "Nicobars",
migratedother: 0,
notes: "District-wise numbers are out-dated as cumulative counts for each district are not reported in bulletin",
recovered: 0}
]


@Component({
  selector: 'app-district-table',
  templateUrl: './district-table.component.html',
  styleUrls: ['./district-table.component.css']
})
export class DistrictTableComponent implements OnInit {
  districtData:DistrictData[]=[];
  displayedColumns: string[] = [ 'District','Confirmed','Recovered', 'Deaths'];
  dataSource;
  statename:string;
  dataArray:DistrictData[] = [];
  name:string;
  
  

  constructor(private districtDataService:DistrictDataService,
    private interactionService:InteractionService,
    private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['id'];
    console.log(this.name);
  
      this.fetchDistrictData(this.name);
      
 
    // this.fetchDistrictData();
    // this.dataSource=ELEMENT_DATA;
  
  }



  private fetchDistrictData(statename:string){
   
    return this.http.get('https://api.covid19india.org/state_district_wise.json')
     .subscribe(responseData => {
     const data=[];
     for(const key in responseData[statename]["districtData"]){
       const distData={districtname:key,
        confirmed:responseData[statename]["districtData"][key]['confirmed'],
       recovered:responseData[statename]["districtData"][key]['recovered'],
       deceased:responseData[statename]["districtData"][key]['deceased']
      };
       data
      //  .push({...responseData[this.statename]["districtData"][key],districtname:key});
      .push(distData);
     }
     this.dataSource=data;  
  
       console.log(this.dataSource);
       //return this.dataArray;
     });
    
  }

}
