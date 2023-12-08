import { ILabel, NewLabel } from './label.model';

export const sampleWithRequiredData: ILabel = {
  id: 1100,
};

export const sampleWithPartialData: ILabel = {
  id: 24998,
};

export const sampleWithFullData: ILabel = {
  id: 9535,
  label: 'austere',
};

export const sampleWithNewData: NewLabel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
