import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( private messageService : MessageService) { } //Service is private because it there is no need to be acessed on a view (HTML)


  //Como usar observable
  //The new version waits for the Observable to emit the array of heroes—which could happen now or several minutes from now. 
  //The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: fetched heroes!');
    return of(HEROES);
  }

}
