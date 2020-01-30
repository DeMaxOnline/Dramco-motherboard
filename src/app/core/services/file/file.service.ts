import { Injectable } from '@angular/core';
import * as DownloadGitRepo from 'download-git-repo';
import {BehaviorSubject, Observable} from "rxjs";
import {ConnectionService} from "ng-connection-service";
import {GlobalVariableNames, GlobalVariablePath} from "../../../shared/global";
import {Sensor} from "../../../entity/motherboard/Sensor";
import {ElectronService} from "..";
import * as Yamlinc from 'yaml-include';
import * as Yaml from 'js-yaml';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private hasDownloadedDocuments;
  private readonly downloadGitRepo: typeof DownloadGitRepo;
  private yamlinc: typeof Yamlinc;
  private yaml: typeof Yaml;
  private assetsYaml = this.electronService.path.join('src', 'assets', 'yaml');
  private listAtCommands: string[];
  private _observableListAtCommands: BehaviorSubject<string[]>;

  get observableListAtCommands(): Observable<string[]>
  {
    return this._observableListAtCommands.asObservable()
  }

  private listATResponds: string[];
  private _observableListAtResponds: BehaviorSubject<string[]>;

  get observableListAtResponds(): Observable<string[]>
  {
    return this._observableListAtResponds.asObservable()
  }

  private listAllKnownSensors: Sensor[];
  private _observableAllKnownSensors: BehaviorSubject<Sensor[]>;

  get observableAllKnownSensors(): Observable<Sensor[]>
  {
    return this._observableAllKnownSensors.asObservable()
  }

  private listIconsSensors: [{}];
  private _observableListIconSensors: BehaviorSubject<[{}]>;

  get obersableListIconSensors(): Observable<[{}]>{
    return this._observableListIconSensors.asObservable();
  }

  constructor(private connectionService: ConnectionService,
              private electronService: ElectronService,
              private translateService: TranslateService)
  {
    this.yamlinc = window.require('yaml-include');
    this.yaml = window.require('js-yaml');
    this.downloadGitRepo = window.require('download-git-repo');

    this._observableAllKnownSensors = new BehaviorSubject<Sensor[]>([]);
    this._observableListAtCommands = new BehaviorSubject<string[]>([]);
    this._observableListAtResponds = new BehaviorSubject<string[]>([]);
    this._observableListIconSensors = new BehaviorSubject<[{}]>([{}]);
    console.log('voor connected');
    //this.downloadGitRepository(GlobalVariablePath.BASE_GIT_URL, GlobalVariablePath.BASE_PATH_YAML);
    this.fillYamlVariables();

    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        console.log('hier ben ik na connectede');
        if(!this.hasDownloadedDocuments){
          this.downloadGitRepository(GlobalVariablePath.BASE_GIT_URL, GlobalVariablePath.BASE_PATH_YAML);
          this.hasDownloadedDocuments = true;
          this.fillYamlVariables();
        }
      }
    })
  }

  private downloadGitRepository(url: string, fileDir: string){
    this.downloadGitRepo(url,  fileDir, err =>{
      if(err){
        console.log("error: " + err);
        console.log("url: " + url);
        console.log("filedir: " + fileDir);
        this.fillYamlVariables();
      }else{
        this.fillYamlVariables();
      }
    });
  }

  private fillKnownSensors(){
    let filePath = this.electronService.path.join(this.assetsYaml,  GlobalVariableNames.FILE_NAME_KNOWN_SENSORS+ '.yaml');
    let sensorsJson = this.yamlToJson(filePath, true);
    if(!this.checkFilesEqual(sensorsJson, this.listAllKnownSensors)){
      this.listAllKnownSensors = sensorsJson;
      this._observableAllKnownSensors.next(this.listAllKnownSensors);
    }
  }

  private fillATResponses(){
    let filePath = this.electronService.path.join(this.assetsYaml,  GlobalVariableNames.FILE_NAME_AT_RESPONDS+ '.yaml');
    let responsesJson = this.yamlToJson(filePath, false);
    if(!this.checkFilesEqual(responsesJson, this.listATResponds)){
      this.listATResponds = responsesJson;
      this._observableListAtResponds.next(this.listATResponds);
    }
  }

  private fillATCommands(){
    let filePath = this.electronService.path.join(this.assetsYaml,  GlobalVariableNames.FILE_NAME_AT_COMMANDS+ '.yaml');
    let commandsJson = this.yamlToJson(filePath, false);
    if(!this.checkFilesEqual(commandsJson, this.listAtCommands)){
      this.listAtCommands = commandsJson;
      this._observableListAtCommands.next(this.listAtCommands);
    }
  }

  private fillIconSensors(){
    let filePath = this.electronService.path.join(this.assetsYaml,  GlobalVariableNames.FILE_NAME_ICON_SENSORS+ '.yaml');
    let commandsJson = this.yamlToJson(filePath, false);
    console.log(commandsJson);
    if(!this.checkFilesEqual(commandsJson, this.listIconsSensors)){
      this.listIconsSensors = commandsJson;
      this._observableListIconSensors.next(this.listIconsSensors["sensors"]);
    }
  }

  private fillYamlVariables(){
    this.fillATCommands();
    this.fillATResponses();
    this.fillIconSensors();
    this.fillKnownSensors();
    console.log(JSON.stringify(this.listIconsSensors));
  }

  private yamlToJson(filePath, goIntoFile: boolean) {
    const src = this.electronService.fs.readFileSync(filePath, 'utf8');
    if(goIntoFile){
      process.chdir(this.assetsYaml);
    }
    return this.electronService.yaml.load(src, {schema: this.electronService.yamlinc.YAML_INCLUDE_SCHEMA});
  }

  private checkFilesEqual(file1, file2){
    console.log('check if files are equal' +  file2 + " " + file1);
    let flag = true;
    if(typeof file2 === 'undefined') return  false;
    if(Object.keys(file1).length==Object.keys(file2).length){
      for(let key in file1) {
        if(file1[key] != file2[key]) {
          flag=false;
          break;
        }
      }
    }
    else {
      flag=false;
    }
    return flag;
  }
}
