import { Injectable } from '@angular/core';
import { BuildJob } from '../interfaces/build-job.interface';
import { calcComplexity } from '../utils/calc-complexity-utils';

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
    let id: number;
    let complexity: number;

    for (let i = 0; i < amount; i++) {
      name = this.name[Math.floor(Math.random() * this.name.length)];
      random = this.generateNumber(10, 13);
      id = this.getUniqueId();
      complexity = calcComplexity(random);
      buildJob = { id: id, name: name, number: random, complexity: complexity };
      arr.push(buildJob);
    }

    return arr;
  }

  generateNumber(min: number, amount: number): number {
    return Math.floor(Math.random() * amount) + min;
  }

  // Not to use in production, but for this example is enough
  getUniqueId(): number {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
  }
}
