import { Component, OnInit } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../shared/services/progress-bar.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  constructor(private progress: NgProgress, private progressBar: ProgressBarService) { }

  ngOnInit() {
    this.progressBar.progressRef = this.progress.ref('progressBar');
  }

}
