import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

private statenameSource = new Subject<string>();
stateName$=this.statenameSource.asObservable();
  constructor() { }

  sendStateName(name:string){
    this.statenameSource.next(name);
  }
}
