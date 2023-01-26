import { NgModule } from '@angular/core';
import { NbAlertModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UiFeaturesRoutingModule } from './ui-features-routing.module';
import { UiFeaturesComponent } from './ui-features.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { SearchComponent } from './search-fields/search-fields.component';

import { LoginComponent } from './login/login.component';
import { FormsModule } from '../forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { RegisComponent } from './regis/regis.component';

const components = [
  UiFeaturesComponent,
  GridComponent,
  IconsComponent,
  TypographyComponent,
  SearchComponent,
 
];

@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    FormsModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,
    UiFeaturesRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  declarations: [
    ...components,

    LoginComponent,
    OtpPageComponent,
    ForgotpassComponent,
    ChangepassComponent,
    RegisComponent

  ],
})
export class UiFeaturesModule { }
