import { Pipe, PipeTransform } from 'angular2/core';
import { Runner } from './runner.service';

@Pipe({ name: 'sortRunners' })
export class SortRunnersPipe implements PipeTransform {
  transform(value: Runner[], args: any[]) {
    if (!value || !value.sort) { return value; }

    return value.sort((a: Runner, b: Runner) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }
}