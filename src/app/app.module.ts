import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { CompassComponent } from './compass/compass.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { TempForcastComponent } from './temp-forcast/temp-forcast.component';
import { ChartsModule } from 'ng2-charts';
import { AqiComponent } from './aqi/aqi.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    CompassComponent,
    CircularProgressComponent,
    TempForcastComponent,
    AqiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
