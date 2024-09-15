import { format, isToday, parseISO } from 'date-fns';

export const formatDate = (isoDate) => {
  const date = parseISO(isoDate);

  if (isToday(date)) {
    return `Today ${format(date, 'h:mm:ss a')}`;
  } else {
    return format(date, 'MMMM d, yyyy h:mm:ss a');
  }
};
