import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { BicycleComponent } from './components/bicycle/bicycle.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './components/order/order.component';
import { ToastrModule } from 'ngx-toastr';
import { NewModelModule } from './myModel/new-model/new-model.module';
import {MatStepperModule} from '@angular/material/stepper';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { StpperComponent } from './components/stpper/stpper.component';
import { ModalComponent } from './components/text/text.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BicycleComponent,
    AllproductsComponent,
    OrderComponent,
    StpperComponent,
    ModalComponent,
   // ObjserbelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    // Angular material
    MatCardModule,
    NewModelModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
