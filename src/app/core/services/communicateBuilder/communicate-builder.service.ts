import { Injectable } from '@angular/core';
import {HelperService} from "../helper/helper.service";
import {Subscription} from "rxjs";
import {FileService} from "../file/file.service";

@Injectable({
  providedIn: 'root'
})
export class CommunicateBuilderService {
  private nextLine = "\n";
  private ATCmdsSubscription: Subscription;
  private ATCmds;

  private ATResponsesSubscription: Subscription;
  private ATResponses;

  constructor(private helperService: HelperService, private fileService: FileService) {
    this.ATCmdsSubscription = fileService.observableListAtCommands.subscribe(commands => {
      this.ATCmds = commands;
    });

    this.ATResponsesSubscription = fileService.observableListAtResponds.subscribe(responses => {
      this.ATResponses = responses;
    })
  }

  BuildCommandSetMetricValue(ATCmd: string, sensorId: string, metricId: string, value:string){
    if(ATCmd in this.ATCmds){
      let sensorIdHex = parseInt(sensorId).toString(16);
      let metricIdHex = parseInt(metricId).toString(16);
      if(sensorIdHex.length === 1){
        sensorIdHex = "0" + sensorIdHex;
      }
      if(metricIdHex.length === 1){
        metricIdHex = "0" + metricIdHex;
      }

      let commandInfo = this.helperService.addStringsTogether([sensorIdHex.toString(), metricIdHex.toString(), value], " ");
      console.log(commandInfo);
      let command = this.ATCmds[ATCmd] +
        commandInfo
        + this.nextLine;
      console.log(command);
      return command;
    }else{
      console.log('wrong cmd');
    }
  }

  BuildCommandGetMetricValue(ATCmd: string, sensorId: string, metricId: string){
    if(ATCmd in this.ATCmds){
      let sensorIdHex = parseInt(sensorId).toString(16);
      let metricIdHex = parseInt(metricId).toString(16);
      if(sensorIdHex.length === 1){
        sensorIdHex = "0" + sensorIdHex;
      }
      if(metricIdHex.length === 1){
        metricIdHex = "0" + metricIdHex;
      }
      let command = this.ATCmds[ATCmd] +
        this.helperService.addStringsTogether([sensorIdHex, metricIdHex], " ")
        + this.nextLine;
      return command;
    }else{
      console.log('wrong cmd');
    }
  }

  respondsSuccess(key){
    return this.ATResponses[key]['SUCCESS'];
  }

  respondsFail(key){
    if(typeof this.ATResponses[key]['FAIL'] !== 'undefined'){
      return this.ATResponses[key]['FAIL']
    }else{
      return '';
    }
  }

  buildCommandMotherboard(cmd: string){
    console.log(this.ATCmds[cmd]);
    console.log(this.nextLine);
    return this.ATCmds[cmd] + this.nextLine;
  }
}
