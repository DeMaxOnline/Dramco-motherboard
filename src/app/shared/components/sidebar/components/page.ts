import {Subscription} from "rxjs";
import {OnDestroy} from "@angular/core";

interface IPage {
  link: string;
  name: string;
  icon: string;
  iconDefault: string;
  iconUsed: string;
  linkParam: string;
}

export class Page implements IPage, OnDestroy {
  icon: string;
  iconDefault: string;
  iconUsed: string;
  link: string;
  name: string;
  linkParam: string;

  private connectionSubscription: Subscription;

  constructor(name: string, link: string, icon: string, iconDefault: string){
    this.iconUsed = icon;
    this.icon = icon;
    this.link = link;
    this.name = name;
    this.iconDefault = iconDefault;
  }

  onError(){
    this.iconUsed = this.iconDefault;
  }

  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }
}
