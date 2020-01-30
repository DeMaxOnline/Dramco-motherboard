import {Injectable} from '@angular/core';
import * as SerialPort from 'serialport';
import {FileService} from "../file/file.service";
import {ElectronService} from "..";

const Delimiter = require('@serialport/parser-delimiter');
@Injectable({
  providedIn: 'root'
})
export class CommunicateService {
  private timeOutTime = 3000;
  private counter = 0;
  private responseObservable;
  private responds;
  constructor(private fileSerivce: FileService, private electronService: ElectronService, ) {
    this.responseObservable = fileSerivce.observableListAtResponds.subscribe(responds => {
      console.log('communicate responds updated');
      this.responds = responds;
    })
  }

  communicate(cmd: string, serialPort: SerialPort, expectedResponse: string, notExpectedResponse){
    const parser = serialPort.pipe(new Delimiter({delimiter: '\n'}));
    return new Promise((resolve, reject) => {
      serialPort.write(cmd, () => {
        console.log('message written');
        parser.on('data', data => {
          const dataString = data.toString();
          if (dataString != null && dataString.includes(expectedResponse)) {
            let responseRemoved = dataString.replace(expectedResponse + ' ', '');
            resolve(responseRemoved);
          } else {
            let response;
            if (dataString != null && dataString.includes(notExpectedResponse)) {
              response = dataString.replace(notExpectedResponse + ' ', '');
            }
            reject(response);
          }
        });
        setTimeout(() => {
          reject('');
        }, this.timeOutTime);
      });
    });
  }
}
