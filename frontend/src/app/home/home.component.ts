import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Info } from '../_models/Info';
import { InfosService } from '../_services/infos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  infos = {} as Info[];
  constructor(private titleService: Title, private infoService: InfosService) {
    this.titleService.setTitle('Alma Babbitt - Resume');
  }
  ngOnInit(): void {
    this.infos = this.infoService.GetInfos();
  }
}
