import { Component, Input} from '@angular/core';
import { Project } from '../_models/Project';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.css']
})
export class CustomCarouselComponent{
    @Input() project = {} as Project;
}
