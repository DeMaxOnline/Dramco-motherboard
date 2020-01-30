import { Component, OnInit } from '@angular/core';
import {ElectronService} from "../../../core/services";
import {GlobalVariableNames, GlobalVariablePath} from '../../global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  basePathImage: string = "./assets/icons/";

  readonly imagePathMinimize: string = this.basePathImage;
  readonly imagePathClose: string = this.basePathImage;

  imagePathMaximize: string = this.basePathImage;

  constructor(private electron: ElectronService) {
    this.imagePathMinimize += GlobalVariableNames.IMAGE_NAME_MINIMIZE;
    this.imagePathClose += GlobalVariableNames.IMAGE_NAME_CLOSE;

    this.electron.window.isMaximized() ? this.imagePathMaximize += GlobalVariableNames.IMAGE_NAME_MAXIMIZED
      : this.imagePathMaximize += GlobalVariableNames.IMAGE_NAME_MAXIMIZE;
  }

  ngOnInit() {
  }

  closeWindow() {
    this.electron.window.close();
  }

  minimizeWindow() {
    this.electron.window.minimize();
  }

  maximizeWindow() {
    if(this.electron.window.isMaximized()){
      this.electron.window.unmaximize();
      this.imagePathMaximize = this.basePathImage + GlobalVariableNames.IMAGE_NAME_MAXIMIZE;
    }else{
      this.electron.window.maximize();
      this.imagePathMaximize = this.basePathImage + GlobalVariableNames.IMAGE_NAME_MAXIMIZED;
    }
  }
}
