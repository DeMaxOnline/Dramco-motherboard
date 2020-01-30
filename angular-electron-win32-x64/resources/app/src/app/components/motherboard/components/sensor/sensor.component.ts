import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Sensor} from "../../../../entity/motherboard/Sensor";
import {MotherboardInUseService} from "../../../../core/services/motherboardInUse/motherboard-in-use.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  @Input() sensor: Sensor;
  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges){
    console.log(this.sensor);
    console.log(changes);
  }

  ngOnInit() {
    console.log(this.sensor);
  }

  ngOnDestroy(): void {

  }
}
