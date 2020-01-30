import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { OnlineStatusModule } from 'ngx-online-status';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatListModule} from "@angular/material/list";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InfoboxComponent} from "./components/infobox/infobox.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FlexModule} from "@angular/flex-layout";
import {NetworkStatusAngularModule} from "network-status-angular";
import {ConnectionServiceModule} from "ng-connection-service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, HeaderComponent, SidebarComponent, InfoboxComponent],
  imports: [CommonModule,
    NetworkStatusAngularModule.forRoot(),
    ConnectionServiceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), FormsModule, MatListModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatSidenavModule, FlexModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, HeaderComponent, SidebarComponent, InfoboxComponent]
})
export class SharedModule {
  constructor(public  translate: TranslateService){
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
    translate.use(this.translate.getBrowserLang());
  }
}
