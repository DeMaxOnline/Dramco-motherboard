import { Component, OnInit } from '@angular/core';
import {Motherboard} from "../../entity/motherboard/Motherboard";
import {TranslateService} from "@ngx-translate/core";
import {MotherboardInUseService} from "../../core/services/motherboardInUse/motherboard-in-use.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sensor} from "../../entity/motherboard/Sensor";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.scss']
})
export class MotherboardComponent implements OnInit {
  public sensor: Sensor;
  private sub: Subscription[] = [];
  private motherboard: Motherboard;

  constructor(public translate: TranslateService,
              private motherboardInUse: MotherboardInUseService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.sub.push( motherboardInUse.Motherboard.subscribe(motherboard => {
      this.motherboard = motherboard;
      if(this.motherboard === null || typeof this.motherboard === 'undefined' || this.motherboard.id === "none"){
        this.router.navigate(['']).then(() => console.log(this.router.url));
      }
    }));
  }

  ngOnInit() {
    if(this.motherboard === null || typeof this.motherboard === 'undefined' || this.motherboard.id === "none"){
      this.router.navigate(['']).then(() => console.log(this.router.url));
    }
    this.sub.push(this.route.params.subscribe(params => {
      let sensorId = params['sensorId'];
      this.sensor = this.motherboard.sensors[sensorId];
      this.motherboardInUse.setUsedSensorId(sensorId);
    }));
  }
}
