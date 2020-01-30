import { Component, OnInit } from '@angular/core';
import {ElectronService} from "../../core/services";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  languages: any[];
  constructor(private electronService: ElectronService, private translate: TranslateService) { }
  currentLanguage: any;

  ngOnInit() {
    this.languages = this.electronService.i18nIsoCodes.getLanguages( this.translate.getLangs());
    this.currentLanguage = this.translate.currentLang;
  }

  languageChange(){
    this.translate.use(this.currentLanguage);
  }
}
