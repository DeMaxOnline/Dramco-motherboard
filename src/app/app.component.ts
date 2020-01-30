import {Component, OnDestroy, OnInit} from '@angular/core';
import {SideNavService} from "./core/services/sideNav/side-nav.service";
import { onMainContentChange } from './animations/animations';
import {interval, Subscription} from "rxjs";
import {Motherboard} from "./entity/motherboard/Motherboard";
import { TranslateService } from '@ngx-translate/core';
import {ElectronService} from "./core/services";
import {FileService} from "./core/services/file/file.service";
import {MotherboardService} from "./core/services/motherboard/motherboard.service";
import {MotherboardInUseService} from "./core/services/motherboardInUse/motherboard-in-use.service";
import {SerialportService} from "./core/services/serialport/serialport.service";
import {Router} from "@angular/router";
import {InternetConnectionService} from "./core/services/internetConnection/internet-connection.service";
import {ConnectionService} from "ng-connection-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    onMainContentChange
  ]
})
export class AppComponent implements OnInit, OnDestroy{
  public onSideNavChange: boolean;
  private motherboardsSubscription: Subscription;
  private searchForMotherboardsSubscription: Subscription;
  private timeSearch = 5000;
  private checkLifeCycleMotherboardsSubscription: Subscription;
  private motherboardInUseSubscription: Subscription;
  private motherboardInUse: Motherboard;
  private motherboards: {[id: string] : Motherboard};
  constructor(private _sidenavService: SideNavService,
              private serialportService: SerialportService,
              public electronService: ElectronService,
              private motherboardService: MotherboardService,
              private router: Router,
              private motherboard: MotherboardInUseService,
              private fileService: FileService,
              private internetConnectionService: InternetConnectionService,
              private connectionService: ConnectionService
  ) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.onSideNavChange = res;
    });

    this.motherboards = {};
    this.searchForMotherboardsSubscription = interval(5000).subscribe(() =>{
      console.log('searching');
       if (this.motherboardInUse === null || typeof this.motherboardInUse === 'undefined' || this.motherboardInUse.id === null || this.motherboardInUse.id === "none"){
         this.serialportService.searchForMotherboards();
       }
     });
    //

    this.motherboardInUseSubscription = this.motherboard.Motherboard.subscribe(motherboard => {
       console.log('geraken we hier?');
       if(typeof motherboard !== 'undefined'){
         this.motherboardInUse = motherboard;
         console.log(JSON.stringify(motherboard));
         if(motherboard !== null && motherboard.id !== 'none'){
           this.router.navigateByUrl('/home');
         }
       }
    });

    //
    // this.checkLifeCycleMotherboardsSubscription = interval(this.timeSearch).subscribe(() => {
    //   if(this.motherboardInUse !== null && this.motherboardInUse.id !== 'none' && Object.keys(this.motherboards).length > 1){
    //     this.serialportService.checkLifeCycle();
    //   }
    // });
    //
    this.motherboardsSubscription = this.motherboardService.getAllmotherboards().subscribe(motherboards => {
       if(typeof motherboards !== 'undefined'){
         this.motherboards = motherboards;
         if(typeof  this.motherboardInUse === 'undefined' || this.motherboardInUse === null || this.motherboardInUse.id !== 'none'){
           if(Object.keys(motherboards).length === 1){
             this.motherboard.changeMotherboard(motherboards[Object.keys(motherboards)[0]]);
           }else{
             //pop up mss
             this.motherboard.changeMotherboard(motherboards[Object.keys(motherboards)[0]]);
           }
         }
       }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.motherboardsSubscription.unsubscribe();
    this.searchForMotherboardsSubscription.unsubscribe();
    this.checkLifeCycleMotherboardsSubscription.unsubscribe();
    this.motherboardInUseSubscription.unsubscribe();
  }
}
