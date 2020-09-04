import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { bookCardMockData } from '../mockData/bookCardMockData';


@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): 
              Observable<HttpEvent<any>> {
        if (request.url === `${environment.backendAPIBaseUrl}/books/read/${bookCardMockData._id}` && request.method === "DELETE") {
            return
              of(new HttpResponse({ status: 201, body: {data:'data'} }));
        }

        return next.handle(request);
    }
}