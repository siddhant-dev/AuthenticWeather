import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { CompassComponent } from './compass/compass.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { TempForcastComponent } from './temp-forcast/temp-forcast.component';
import { NgChartsModule } from 'ng2-charts';
import { AqiComponent } from './aqi/aqi.component';
import { AppRoutingModule } from './app-routing.module';
import { DesignInspirationComponent } from './design-inspiration/design-inspiration.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HomeComponent,
    CompassComponent,
    CircularProgressComponent,
    TempForcastComponent,
    AqiComponent,
    DesignInspirationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
