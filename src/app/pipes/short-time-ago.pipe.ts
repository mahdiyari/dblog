import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shortTimeAgo'
})
export class ShortTimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'a few seconds ago') return 'now'
    if (value === 'a minute ago') return 'now'
    if (value === 'an hour ago') return '1 h'
    if (value === 'a day ago') return '1 d'
    if (value === 'a month ago') return '1 M'
    if (value === 'a year ago') return '1 Y'
    let minuteRegex = /(minutes ago)/
    let hourRegex = /(hours ago)/
    let dayRegex = /(days ago)/
    let monthRegex = /(months ago)/
    let yearRegex = /(years ago)/
    if (value.match(minuteRegex)) return parseInt(value)+' min'
    if (value.match(hourRegex)) return parseInt(value)+' h'
    if (value.match(dayRegex)) return parseInt(value)+' d'
    if (value.match(monthRegex)) return parseInt(value)+' M'
    if (value.match(yearRegex)) return parseInt(value)+' Y'
    return value
  }
}
