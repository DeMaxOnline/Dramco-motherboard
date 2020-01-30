import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MotherboardComponent} from "./motherboard.component";
import {SensorModule} from "./components/sensor/sensor.module";
import {SharedModule} from "../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {Ng5SliderModule} from "ng5-slider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [MotherboardComponent],
  imports: [
    CommonModule,
    SensorModule,
    SharedModule,
    MatInputModule,
    Ng5SliderModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MotherboardModule { }
