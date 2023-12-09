import { ComponentFixture, TestBed } from '@angular/core/testing';

import MyticketsComponent from './mytickets.component';
import { TicketService } from '../entities/ticket/service/ticket.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { AccountService } from '../core/auth/account.service';
import { Account } from '../core/auth/account.model';
import { TranslationModule } from '../shared/language/translation.module';

describe('MyticketsComponent', () => {
  let component: MyticketsComponent;
  let fixture: ComponentFixture<MyticketsComponent>;
  let service: TicketService;
  let accountService: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'mytickets', component: MyticketsComponent }]),
        HttpClientTestingModule,
        MyticketsComponent,
        TranslationModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(MyticketsComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MyticketsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TicketService);
    accountService = TestBed.inject(AccountService);
    fixture.detectChanges();

    const headers = new HttpHeaders();
    jest.spyOn(service, 'queryMyTickets').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
    jest.spyOn(accountService, 'identity').mockReturnValue(
      new Observable<Account | null>(observer => {
        of({
          activated: true,
          authorities: [],
          email: 'user@a.com',
          firstName: 'user',
          langKey: 'pt-BR',
          lastName: 'user',
          login: 'user',
          imageUrl: null,
        });
      }),
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
