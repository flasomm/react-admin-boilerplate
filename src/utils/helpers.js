import moment from 'moment';

export const formatIsoDate = date => moment(date).format('DD/MM/YYYY HH:mm');
