import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MotherboardInUseService} from "../../../../../../../../core/services/motherboardInUse/motherboard-in-use.service";
import {GlobalVariableCMD, GlobalVariableResponse} from "../../../../../../../../shared/global";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.scss']
})
export class PollingComponent implements OnInit, OnDestroy {
  @Input() metricId: string;
  @Input() unit;
  @Input() base: number;
  @Input() minimum: number;
  public hasError: boolean;
  public valueUser;
  private safeEvenSub: Subscription;
  constructor(private motherboardInUse: MotherboardInUseService) {
    this.safeEvenSub = this.motherboardInUse.ObservableSafe.subscribe(() =>{
      this.safeConfig();
    });
  }

  ngOnInit() {
    this.getValues();
  }
  ngOnDestroy(): void {
    this.safeEvenSub.unsubscribe();
  }

  private safeConfig(){
    if(this.inputValidator()){
      console.log(this.valueUser);
      this.setPollingInterval();
      this.hasError = false;
    }else{
      this.hasError = true;
    }
  }

  private inputValidator(){
    return this.valueUser !== null && typeof this.valueUser !== 'undefined' && !isNaN(this.valueUser)
  }

  private setPollingInterval(){
    let value = this.valueUser * this.base;
    this.motherboardInUse.setValue(this.metricId, GlobalVariableCMD.SET_POLLING_INTERVAL,
      value.toString(), GlobalVariableResponse.AT_SET_POLLING,
      GlobalVariableResponse.AT_SET_POLLING).catch(err => {
        let dataString = err.toString();
        console.log(dataString);
    })
  }

  private getValues(){
    console.log(GlobalVariableCMD.GET_POLLING_INTERVAL);
    this.motherboardInUse.getValues(this.metricId, GlobalVariableCMD.GET_POLLING_INTERVAL,
      GlobalVariableResponse.GET_POLLING_INTERVAL, GlobalVariableResponse.GET_POLLING_INTERVAL).then(data => {
        console.log(data);
        let dataString = data.toString();
        if(dataString){
          this.valueUser = parseInt(dataString)/this.base;
          console.log(this.valueUser);
        }
    }).catch(e => {
      console.log(e);
    })
  }
}
