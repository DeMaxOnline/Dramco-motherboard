import { onSideNavChange, animateText } from '../../../animations/animations'
import {SideNavService} from "../../../core/services/sideNav/side-nav.service";
import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MotherboardInUseService} from "../../../core/services/motherboardInUse/motherboard-in-use.service";
import {Motherboard} from "../../../entity/motherboard/Motherboard";
import {Router} from '@angular/router';
import {Page} from "./components/page";
import {InternetConnectionService} from "../../../core/services/internetConnection/internet-connection.service";
import {FileService} from "../../../core/services/file/file.service";
import {Sensor} from "../../../entity/motherboard/Sensor";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SidebarComponent implements OnInit {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  private motherboard: Motherboard;
  public pages: Page[] = [];
  private sensorPages: Page[];
  private listIcons: [{}];
  constructor(
    private _sideNavService: SideNavService,
    private _translateService: TranslateService,
    private _motherboardService: MotherboardInUseService,
    private router: Router,
    private internetConnectionService: InternetConnectionService,
    private fileService: FileService
  ) {
    fileService.obersableListIconSensors.subscribe(icons => {
      this.listIcons = icons;
    });

    _translateService.get('PAGES.SIDEBAR.LANGUAGE').subscribe((text:string) => {
      let pageTranslation = new Page(text, '/language', 'language', 'language');
      this.pages.push(pageTranslation);
    });

    _motherboardService.Motherboard.subscribe(motherboard => {
      this.motherboard = motherboard;
    });

    this.internetConnectionService.monitor().subscribe(isOnline => {
      console.log(isOnline);
    })
  }

  ngOnInit() {
  }

  onSineNavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sideNavService.sideNavState$.next(this.sideNavState)
  }

  isActive(instruction: any[]): boolean {
    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }

  close(){
    this._motherboardService.close().then(succes => {
      console.log('worked');
    })
  }

  save(){
    this._motherboardService.save();
  }
}
