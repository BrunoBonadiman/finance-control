import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Contas } from '../models/contas.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
};

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  private readonly url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  listar(): Observable<Contas[]> {
    return this.http.get<Contas[]>(`${this.url}listar`, httpOptions)
      .pipe(
        tap(contas => console.log('Contas listadas!')),
        catchError(this.handleError('getContas', []))
      );
  }

  recuperar(id: string): Observable<Contas> {
    const url = `${this.url}${id}`;
    return this.http.get<Contas>(url).pipe(
      tap(_ => console.log(`Conta id=${id}`)),
      catchError(this.handleError<Contas>(`getContasById id=${id}`))
    );
  }

  public cadastrar(contas: Contas): Observable<Contas> {
    return this.http.post<Contas>(`${this.url}cadastrar`, contas, httpOptions).pipe(
      tap((s: Contas) => console.log(`Conta cadastrada w/ id=${s._id}`)),
      catchError(this.handleError<Contas>('addConta'))
    );
  }

  editar(contas: Contas): Observable<any> {
    const url = `${this.url}${contas._id}`;
    return this.http.put(url, contas, httpOptions).pipe(
      tap(_ => console.log(`Conta atualizada: id=${contas._id}`)),
      catchError(this.handleError<any>('updateConta'))
    );
  }
  deletar(id: string): Observable<Contas> {
    const url = `${this.url}${id}`;
    return this.http.delete<Contas>(url, httpOptions).pipe(
      tap(_ => console.log(`Conta deletada: id=${id}`)),
      catchError(this.handleError<Contas>('deleteConta'))
    );
  }
}
