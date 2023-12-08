import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'project',
        data: { pageTitle: 'bugTrackerJHipsterApp.project.home.title' },
        loadChildren: () => import('./project/project.routes'),
      },
      {
        path: 'label',
        data: { pageTitle: 'bugTrackerJHipsterApp.label.home.title' },
        loadChildren: () => import('./label/label.routes'),
      },
      {
        path: 'ticket',
        data: { pageTitle: 'bugTrackerJHipsterApp.ticket.home.title' },
        loadChildren: () => import('./ticket/ticket.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
