import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Options} from "ng5-slider";
import {TranslateService} from "@ngx-translate/core";
import {MotherboardInUseService} from "../../../../../../../../core/services/motherboardInUse/motherboard-in-use.service";
import {GlobalVariableCMD, GlobalVariableResponse} from "../../../../../../../../shared/global";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit, OnDestroy {
  @Input() metricId : string;
  @Input() ceil;
  @Input() floor;

  private minimumThreshold = 0;
  private maximumThreshold = 30;
  private enabled: boolean;
  private safeEvenSub: Subscription;
  options: Options = {
    floor: 100,
    ceil: 200
  };

  constructor(private translate: TranslateService,
              private motherboardInUse: MotherboardInUseService) {
    this.safeEvenSub = this.motherboardInUse.ObservableSafe.subscribe(() =>{
      this.safeConfig();
    });
  }


  ngOnChanges(changes: SimpleChanges){
    console.log(this.metricId);
    this.options.floor = this.floor;
    this.options.ceil = this.ceil;
  }

  ngOnInit() {
    this.getValuesThreshold();
  }


  ngOnDestroy(): void {
    this.safeEvenSub.unsubscribe();
  }

  private setValue(command: string, value: string, expectedResponse:string, notExpectedResponse: string){
    let response = '';
    this.motherboardInUse.setValue(this.metricId, command,
      value.toString(), expectedResponse, notExpectedResponse).catch(err => {
      let dataString = err.toString();
      if(dataString){
        response = dataString;
      }
    });
    console.log(response);
    return response;
  }

   private getValuesThreshold() {
    console.log(this.metricId);
    this.motherboardInUse.getValuesThreshold(this.metricId, GlobalVariableCMD.GET_THRESHOLD_VALUES,
      GlobalVariableResponse.GET_THRESHOLD_VALUES, GlobalVariableResponse.GET_THRESHOLD_VALUES).then(data => {
      let dataString = data.toString();
      if(dataString){
        console.log(dataString);
        let responseSplit = dataString.toString().split(' ');
        let minimumValue = parseInt(responseSplit[1]);
        let maximumValue = parseInt(responseSplit[2]);
        minimumValue < this.floor ? this.minimumThreshold = this.floor : this.minimumThreshold = minimumValue;
        maximumValue > this.ceil ? this.maximumThreshold = this.ceil : this.maximumThreshold = 90;
        this.enabled = responseSplit[0].includes('1');
        console.log(this.minimumThreshold);
        console.log(this.maximumThreshold);
        console.log(this.enabled);
      }
    }).catch(err => {
      let errString = err.toString();
      if(errString){
        console.log(errString);
      }
    });
  }

  private safeConfig(){
    this.thresholdSetEnable();
    this.thresholdSetMaximum();
    this.thresholdSetMinimum();
  }

  private thresholdSetMaximum(){
    console.log(this.maximumThreshold);
    let response = this.setValue(GlobalVariableCMD.SET_THRESHOLD_HIGH,
      this.maximumThreshold.toString(), GlobalVariableResponse.AT_SET_THRESHOLD,
      GlobalVariableResponse.AT_SET_THRESHOLD);
    if(response){
      console.log(response);
    }
  }

  private thresholdSetMinimum(){
    let response = this.setValue(GlobalVariableCMD.SET_THRESHOLD_LOW,
      this.minimumThreshold.toString(), GlobalVariableResponse.AT_SET_THRESHOLD,
      GlobalVariableResponse.AT_SET_THRESHOLD);
    if(response){
      console.log(response);
    }
  }
  private thresholdSetEnable(){
    let value = + this.enabled;
    console.log(value);
    let response = this.setValue(GlobalVariableCMD.SET_THRESHOLD_ENABLED,
      value.toString(), GlobalVariableResponse.AT_SET_THRESHOLD,
      GlobalVariableResponse.AT_SET_THRESHOLD);
    if(response){
      console.log(response);
      //pop up hier mss
    }
  }
}
