import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '../_models/Project';
import { Tag } from '../_models/Tags';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{

  projects = {} as Project[]; 

   constructor(private titleService: Title, private projectService: ProjectService) {
      this.titleService.setTitle('Alma Babbitt - Portfolio');
    }
  ngOnInit(): void {
    this.projects = this.projectService.GetProjects();
  }
}
