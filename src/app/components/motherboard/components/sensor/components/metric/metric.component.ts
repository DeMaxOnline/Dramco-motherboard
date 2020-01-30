import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Metric} from "../../../../../../entity/motherboard/Metric";
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject, Subscription} from "rxjs";
import {MotherboardInUseService} from "../../../../../../core/services/motherboardInUse/motherboard-in-use.service";

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit, OnDestroy {
  @Input() metric: Metric;
  @Input() formArray;
  public hasPolling = false;
  public hasThreshold = false;
  constructor(public translate: TranslateService, public motherboardInUse: MotherboardInUseService) {
  }

  ngOnInit() {
    console.log(this.metric['quantity']['nl']);
    this.hasPolling = this.metric['config']['polling']['enabled'];
    this.hasThreshold = this.metric['config']['threshold']['enabled'];
    if(this.metric['quantity']['nl'] === "Luchtkwaliteitsindicatie"){
      console.log(this.metric);
      console.log(this.metric['config']['threshold']['max']);
      console.log(this.metric['config']['threshold']['min']);
      console.log(this.hasPolling);
      console.log(this.hasThreshold);
    }
  }

  ngOnDestroy(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    console.log(this.metric);
    console.log(changes);
  }
}
