import DateFnsUtils from '@date-io/date-fns';

const dateFns = new DateFnsUtils();

const FORMAT = 'dd.MM.yyyy hh:mm';

export const formatDate = date => {
  if (typeof date === 'string') {
    date = dateFns.date(date);
  }
  return dateFns.format(date, FORMAT);
};
