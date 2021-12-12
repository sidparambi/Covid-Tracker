import { Component, OnInit } from '@angular/core';
import { timeSeriesData } from './time-series-data.model'
import { CardData} from './card-data.service'
import {HttpClient} from '@angular/common/http';

interface cardType{
  cardcontent:string,
  cardsub:string,
  txtcolour:string,
  bckgrndcolour:string,
  length:string
}

@Component({
  selector: 'card-tracker',
  templateUrl: './card-tracker.component.html',
  styleUrls: ['./card-tracker.component.css']
})
export class CardTrackerComponent implements OnInit {
TSData:timeSeriesData[]=[];
card:cardType;
cards:cardType[]=[];
confirmed:number;
deceased:number;
recovered:number;
cardcount:number=0;
divwidth:number;
stringlen:string;
cardlength:string;
  constructor(private http: HttpClient,private cardData:CardData) { }

  ngOnInit(){

    this.cardData.fetchCardData().subscribe(data => {
      
      this.TSData=data;
      for(var i=0;i<this.TSData.length;i++){
        console.log(this.TSData[i]);
        for(const key in this.TSData[i]){
          
          if(key=="totalconfirmed"){
            this.stringlen=this.TSData[i].totalconfirmed.length.toString();
            this.cardlength=this.stringlen.concat('.0');
            this.card=
            {cardcontent:this.TSData[i].totalconfirmed, cardsub:"Confirmed", txtcolour:"red", bckgrndcolour:"rgb(241, 217, 225)", length:this.cardlength};
            this.cards.push(this.card);
            this.cardcount++;
          }else if(key=="totaldeceased"){
            this.stringlen=this.TSData[i].totaldeceased.length.toString();
            this.cardlength=this.stringlen.concat('.0');
            this.card=
            {cardcontent:this.TSData[i].totaldeceased, cardsub:"Deaths", txtcolour:"slategray", bckgrndcolour:"rgb(210, 224, 241)",length:this.cardlength };
            this.cards.push(this.card);
            this.cardcount++;
          }else if(key=="totalrecovered"){
            this.stringlen=this.TSData[i].totalrecovered.length.toString();
            this.cardlength=this.stringlen.concat('.0');
            this.card=
            {cardcontent:this.TSData[i].totalrecovered, cardsub:"Recovered", txtcolour:"seagreen", bckgrndcolour:"rgb(221, 241, 210)",length:this.cardlength };
            this.cards.push(this.card);
            this.cardcount++;
          }
          
          

        
        }
        this.divwidth=1/this.cardcount;
      console.log(this.divwidth);
        
        
      }
    });
  }

onFetchCardData(){
  this.cardData.fetchCardData().subscribe(data => {
    this.TSData=data;
    
    for(var i=0;i<this.TSData.length;i++){
     
      
    }
  });
}

}
