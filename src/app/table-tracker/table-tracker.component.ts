import { Component, OnInit } from '@angular/core';
import {TableData} from './table-data.service';
import {DistrictDataService} from '../district-table/district-data.service';
import {DistrictData } from '../district-table/district-table.component';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { InteractionService } from '../interaction.service';
import { Router } from '@angular/router';

export interface StateData {
      active: string;	
      confirmed: string;
			deaths: string;
			deltaconfirmed: string;
			deltadeaths: string;
			deltarecovered: string;
			lastupdatedtime: string;
			migratedother: string;
			recovered: string;
			state: string;
			statecode: string;
			statenotes: string;
}





@Component({
  selector: 'app-table-tracker',
  templateUrl: './table-tracker.component.html',
  styleUrls: ['./table-tracker.component.css']
})
export class TableTrackerComponent implements OnInit {

  SWData:StateData[]=[];
  dataArray:DistrictData[] = [];
  finalData:DistrictData[] = [];
  distData:StateData[]=[];
  confirmed:string;
  deceased:string;
  recovered:string;
  statename:string;

  displayedColumns: string[] = ['State', 'Confirmed1', 'Recovered', 'Deaths'];
  dataSource;

  constructor(private tableData:TableData,
    private districtDataService:DistrictDataService,
    private http:HttpClient, private interactionService:InteractionService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableData.fetchStatewiseData().subscribe(data => {
      this.SWData=data;
     this.dataSource=this.SWData;
     console.log(this.dataSource);
     
    });
   
     
  }

  getStateName(event:Event){
    this.statename=String(event);
    this.interactionService.sendStateName(this.statename);
    this.router.navigate(['/district',this.statename]);
    
  }

    

}
