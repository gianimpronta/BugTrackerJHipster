import { Component, OnInit } from '@angular/core';
import { ITicket } from 'app/entities/ticket/ticket.model';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { TicketService } from 'app/entities/ticket/service/ticket.service';
import { AccountService } from 'app/core/auth/account.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import SharedModule from '../shared/shared.module';
import { SortByDirective, SortDirective } from '../shared/sort';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from '../shared/date';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemCountComponent } from '../shared/pagination';
import { Alert, AlertService } from '../core/util/alert.service';
import { ParseLinks } from '../core/util/parse-links.service';
import { EventManager } from '../core/util/event-manager.service';

@Component({
  standalone: true,
  selector: 'jhi-mytickets',
  templateUrl: './mytickets.component.html',
  styles: [],
  imports: [
    RouterModule,
    FormsModule,
    SharedModule,
    SortDirective,
    SortByDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    ItemCountComponent,
  ],
})
export default class MyticketsComponent implements OnInit {
  tickets?: ITicket[];
  account?: Account | null;
  eventSubscriber?: Subscription;
  predicate: any;
  reverse: any;
  links: any;
  totalItems: any;

  constructor(
    private accountService: AccountService,
    private ticketService: TicketService,
    private jhiAlertService: AlertService,
    private eventManager: EventManager,
    private parseLinks: ParseLinks,
  ) {}

  ngOnInit(): void {
    this.loadSelf();
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
    this.registerChangeInTickets();
  }

  loadSelf(): void {
    this.ticketService.queryMyTickets().subscribe(
      (res: HttpResponse<ITicket[]>) => this.paginateTickets(res.body ? res.body : [], res.headers),
      (res: HttpErrorResponse) => this.onError(res.message),
    );
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  registerChangeInTickets(): void {
    this.eventSubscriber = this.eventManager.subscribe('ticketListModification', (response: any) => this.loadSelf());
  }

  protected paginateTickets(data: ITicket[], headers: HttpHeaders): void {
    this.links = this.parseLinks.parse(headers.get('link') ?? '');
    this.totalItems = parseInt(headers.get('X-Total-Count') ? this.totalItems : '', 10);
    this.tickets = data;
  }

  protected onError(errorMessage: string): void {
    const alert: Alert = {
      type: 'danger',
      message: errorMessage,
    };
    this.jhiAlertService.addAlert(alert);
  }
}
