import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BuildJob as BuildJob } from './core/interfaces/build-job.interface';
import { GeneratorService } from './core/services/generator.service';
import { calcComplexity } from './core/utils/calc-complexity-utils';

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

  remove(list: BuildJob[], item: BuildJob): void {
    // This is not the best in performance, a better way will be to send the index
    // or maybe a data structure more like "dictionary" that holds an "id" as a key
    // See under interfaces "BuildJobDictionary"

    list.splice(list.indexOf(item), 1);
  }

  add(list: BuildJob[], name: string): void {
    const random = this.generator.generateNumber(10, 10);
    const id = this.generator.getUniqueId();
    const complexity = calcComplexity(random);
    list.unshift({ id: id, name: name, number: random, complexity: complexity });
  }
}
