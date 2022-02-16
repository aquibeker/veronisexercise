import { Injectable } from '@angular/core';
import { BuildJob } from '../interfaces/build-job.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  constructor() {}

  name = ['Thor', 'Iron man', 'Spider man', 'Hulk', 'Captain America', 'Hawkeye', 'Black Widow'];

  generate(amount: number): BuildJob[] {
    const arr: BuildJob[] = [];
    let random: number;
    let buildJob: BuildJob;
    let name: string;

    for (let i = 0; i < amount; i++) {
      name = this.name[Math.floor(Math.random() * this.name.length)];
      random = this.generateNumber(10, 13);
      buildJob = { name: name, number: random };
      arr.push(buildJob);
    }

    return arr;
  }

  generateNumber(min: number, amount: number): number {
    return Math.floor(Math.random() * amount) + min;
  }
}
