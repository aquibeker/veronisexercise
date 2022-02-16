import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BuildJob } from '../core/interfaces/build-job.interface';
import { calcComplexity } from '../core/utils/calc-complexity-utils';

@Component({
  selector: 'app-build-jobs',
  templateUrl: './build-jobs.component.html',
  styleUrls: ['./build-jobs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildJobComponent {

  @Input() data: BuildJob[];

  @Output() remove = new EventEmitter<BuildJob>();
  @Output() add = new EventEmitter<string>();
  label: string;
  @Input() department: string;



  handleEnterKey(event: any) {
    this.add.emit(this.label);
    this.label = '';
  }

  getComplexity(num: number) {
    return calcComplexity(num);
  }
}
