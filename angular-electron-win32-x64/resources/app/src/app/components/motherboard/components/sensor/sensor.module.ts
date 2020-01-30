import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorRoutingModule } from './sensor-routing.module';
import { SensorComponent } from './sensor.component';
import {MetricModule} from "./components/metric/metric.module";
import {SharedModule} from "../../../../shared/shared.module";


@NgModule({
  declarations: [SensorComponent],
  exports: [
    SensorComponent
  ],
  imports: [
    CommonModule,
    SensorRoutingModule,
    MetricModule,
    SharedModule
  ]
})
export class SensorModule { }
