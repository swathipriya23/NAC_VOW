import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtUnAuthorizedInterceptorService } from './jwt-un-authorized-interceptor.service';
import { MaterialModule } from './material/material.module'
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


//      Components Import 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { SharedModule } from './shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import { SignupComponent } from './signup/signup.component';
import { ProjectSummaryComponent } from './project-details/project-summary/project-summary.component';


// import { UserDetailsComponent } from './user-details/user-details.component';
// import { VowErrorRouteComponent } from './vow-error-route/vow-error-route.component';



const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    NotificationComponent,
    SignupComponent,
    ProjectSummaryComponent,
    
    // UserDetailsComponent,
    // VowErrorRouteComponent

  ],
  imports: [
    ToastrModule.forRoot(),
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule, SharedModule, CommonModule
  ],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtUnAuthorizedInterceptorService,
    multi: true
  },{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
  }
],
  exports:[SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
