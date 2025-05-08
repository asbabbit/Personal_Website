import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';
import { Project } from '../_models/Project';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-featured-project',
  templateUrl: './featured-project.component.html',
  styleUrls: ['./featured-project.component.css']
})
export class FeaturedProjectComponent implements OnInit{
  project = {} as Project;
    constructor(private titleService: Title, private projectService: ProjectService) {
      this.titleService.setTitle('Alma Babbitt - Home');
    }
    ngOnInit(): void {
      this.project = this.projectService.GetProjectById(0);
    }

}
