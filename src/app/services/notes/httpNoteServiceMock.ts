import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";

import { Observable, of } from "rxjs";

@Injectable()
export class HttpNoteServiceMock implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      console.log(request.url,request.method)
    if (request.url === "http://localhost:5000/notes/1" && request.method === "PUT") {
      return of(
        new HttpResponse({ status: 200, body: 'noteUpdated' }) 
      );
    } else if (
      request.url === "/http://localhost:5000/notes/1" &&
      request.method === "DELETE"
    ) {
      return of(
        new HttpResponse({
          status: 200,
          body: 'note deleted', 
        })
      );
    }
}}