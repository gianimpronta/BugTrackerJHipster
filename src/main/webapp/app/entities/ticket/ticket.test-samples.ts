import dayjs from 'dayjs/esm';

import { ITicket, NewTicket } from './ticket.model';

export const sampleWithRequiredData: ITicket = {
  id: 32109,
  title: 'on save',
};

export const sampleWithPartialData: ITicket = {
  id: 11928,
  title: 'pfft along',
  dueDate: dayjs('2023-12-08'),
};

export const sampleWithFullData: ITicket = {
  id: 8517,
  title: 'commission',
  descriptiton: 'heat track absent',
  dueDate: dayjs('2023-12-07'),
  done: false,
};

export const sampleWithNewData: NewTicket = {
  title: 'melt than',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
