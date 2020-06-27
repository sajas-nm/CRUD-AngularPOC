import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, first } from 'rxjs/operators';
import { Employees } from './employees.model';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // url = 'http://dummy.restapiexample.com/api/v1'; to do =>
  url = 'https://fakerestapi.azurewebsites.net/api/Authors';
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: this.headers,
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      console.log(error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAllEmployees(): Observable<Employees> {
    return this.http
      .get<Employees>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createEmployee(item): Observable<Employees> {
    let data = JSON.stringify(item);

    return this.http
      .post<Employees>(this.url, data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getEmployeeById(id): Observable<Employees> {
    console.log('ID<>L>>>>>>>>>>>>', id);

    return this.http
      .get<Employees>(this.url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateEmployee(id, item): Observable<Employees> {
    return this.http
      .put<Employees>(
        this.url + '/' + id,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteEmployee(id) {
    console.log('ID DELETE', id);
    return this.http
      .delete<Employees>(this.url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
