import { Component } from '@angular/core';
import { SharedService } from './Shared/Services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'blog-uoc-project-front';
  isLoading!: boolean;
  constructor(private loading: SharedService) {
    this.loading.isLoading.subscribe((value) => (this.isLoading = value));
    console.log(this.isLoading);
  }
}
