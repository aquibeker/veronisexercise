import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BuildJob as BuildJob } from './core/interfaces/build-job.interface';
import { GeneratorService } from './core/services/generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  prodJenkinsJobs: BuildJob[];
  devJenkinsJobs: BuildJob[];
  constructor(private generator: GeneratorService) { }

  ngOnInit(): void {
    this.devJenkinsJobs = this.generator.generate(1024);
    this.prodJenkinsJobs = this.generator.generate(1024);
  }

  remove(list: BuildJob[], item: BuildJob) {
    list.splice(list.indexOf(item), 1);
  }

  add(list: BuildJob[], name: string) {
    list.unshift({ name: name, number: this.generator.generateNumber(10, 10) });
  }
}
