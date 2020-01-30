import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Sensor} from "../../../../entity/motherboard/Sensor";
import {MotherboardInUseService} from "../../../../core/services/motherboardInUse/motherboard-in-use.service";
import {TranslateService} from "@ngx-translate/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  @Input() sensor: Sensor;
  constructor(public translateService: TranslateService) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
  }

}
