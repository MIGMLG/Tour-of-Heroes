import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { } //Service is private because it there is no need to be acessed on a view (HTML)

  //Como usar observable
  //The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now. 
  //The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): Observable<Hero[]> {
    /* return of(HEROES); */
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes!')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );//HTTP Client
  }
  /* 
    Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map() operator.
  Although not discussed here, there's an example of map() in the getHeroNo404() method included in the sample source code. */

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}}`;
    /* return of(HEROES.find(hero => hero.id === id)); *///Find position on array where id is equal to the requested one
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}!`)),
      catchError(this.handleError<Hero>(`getHero id=${id}!`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) { //result can be nothing(optional) or T a generic
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed : ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)), //newHero to get the id
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;// if hero is number then set hero, if note set hero.id
    const url = `${this.heroesUrl}/${id}}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) { //If user inputs spaces dont send request
      return of([]);//return empty array on Observable
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
