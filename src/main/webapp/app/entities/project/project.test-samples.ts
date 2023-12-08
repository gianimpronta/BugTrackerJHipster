import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 4356,
};

export const sampleWithPartialData: IProject = {
  id: 24051,
  name: 'disguised folder although',
};

export const sampleWithFullData: IProject = {
  id: 12531,
  name: 'of faithfully',
};

export const sampleWithNewData: NewProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
