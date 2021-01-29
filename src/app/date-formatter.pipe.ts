import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let date = new Date(value);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

}
