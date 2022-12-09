import moment from 'moment';

const DATE_FORMAT = 'DD.MM.YY';

export function formatPeriod(start: number, finish: number | null): string {
  return `${moment(start * 1000).format(DATE_FORMAT)} - ${finish ? moment(finish * 1000).format(DATE_FORMAT) : '...'}`;
}
