import moment from 'moment';

export function dateFromTimestamp(timestamp: string|number): string {
  return moment(+timestamp).format('DD.MM.YY');
}
