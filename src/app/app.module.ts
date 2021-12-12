import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CardTrackerComponent } from './card-tracker/card-tracker.component';
import { HttpClientModule } from '@angular/common/http';
import { TableTrackerComponent } from './table-tracker/table-tracker.component';
import { RouterModule, Routes } from '@angular/router';
import { DistrictTableComponent } from './district-table/district-table.component';

const appRoutes:Routes=[
  {path:'', component:TableTrackerComponent,pathMatch: 'full'}, 
  {path:'district/:id', component:DistrictTableComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CardTrackerComponent,
    TableTrackerComponent,
    DistrictTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TableTrackerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
