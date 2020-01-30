import { Injectable } from '@angular/core';
import {Motherboard} from "../../../entity/motherboard/Motherboard";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {MotherboardService} from "../motherboard/motherboard.service";
import {CommandBuilderService} from "../commandBuilder/command-builder.service";
import {CommunicateService} from "../communicate/communicate.service";
import * as SerialPort from 'serialport';
import {GlobalVariableCMD, GlobalVariableNames, GlobalVariableResponse} from "../../../shared/global";
import {CommunicateBuilderService} from "../communicateBuilder/communicate-builder.service";
import { from } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import {Metric} from "../../../entity/motherboard/Metric";

@Injectable({
  providedIn: 'root'
})

export class MotherboardInUseService {
  private observableSafe: Subject<void> = new Subject<void>();
  get ObservableSafe(){
    return this.observableSafe.asObservable();
  }
  private motherboard: Motherboard;
  private observableMotherboard: BehaviorSubject<Motherboard>;

  get Motherboard():Observable<Motherboard>{
    return this.observableMotherboard.asObservable();
  }

  private usedSensorId: string;

  setUsedSensorId(sensorId: string){
    console.log('set userid');
    this.usedSensorId = sensorId;
  }

  getUsedSensorId(){
    return this.usedSensorId;
  }

  constructor(private motherboardService: MotherboardService,
              private commandBuilderService: CommandBuilderService,
              private communicateService: CommunicateService,
              private communicateBuilder: CommunicateBuilderService
  ){
    this.motherboard = new Motherboard();
    this.motherboard.id = 'none';
    this.observableMotherboard = new BehaviorSubject<Motherboard>(null);
  }

  changeMotherboard(motherboard:Motherboard){
    console.log('motherboard updated');
    this.motherboard = motherboard;
    this.observableMotherboard.next(motherboard);
    this.usedSensorId = 'undefined';
  }

  getValues(metricId:string, cmd:string, expectedResponse:string, onExpectedResponse){
    let command = this.communicateBuilder.BuildCommandGetMetricValue(cmd, this.usedSensorId, metricId);
    console.log('motherboard get values' + command);
    let responseOk = this.commandBuilderService.respondsSuccess(expectedResponse);
    let responseNotOk = this.commandBuilderService.respondsFail(onExpectedResponse);
    return this.communicateService.communicate(command, this.motherboard.serialPort, responseOk, responseNotOk);
  }

  removeMotherboard(){
    console.log('motherboard removed');
    this.motherboardService.removeMotherboard(this.motherboard.id);
    this.motherboard = new Motherboard();
    this.motherboard.id = 'none';
    this.usedSensorId = 'undefined';
    this.observableMotherboard.next(this.motherboard);
  }

  setValue(metricId: string, ATcmd: string, value:string, expectedResponse: string, notExpectedResponse: string){
    let command = this.communicateBuilder.BuildCommandSetMetricValue(ATcmd, this.usedSensorId, metricId, value);
    console.log('motherboard set values' + command);
    let responseOk = this.commandBuilderService.respondsSuccess(expectedResponse);
    let responseNotOk = this.commandBuilderService.respondsFail(notExpectedResponse);
    return this.communicateService.communicate(command, this.motherboard.serialPort, responseOk, responseNotOk);
  }

  close(){
    let command = this.communicateBuilder.buildCommandMotherboard(GlobalVariableCMD.CLOSE);
    let responseOk = this.communicateBuilder.respondsSuccess(GlobalVariableResponse.CLOSE);
    this.removeMotherboard();
    return this.communicateService.communicate(command, this.motherboard.serialPort, responseOk, '');
  }

  save(){
    this.observableSafe.next();
  }
}
