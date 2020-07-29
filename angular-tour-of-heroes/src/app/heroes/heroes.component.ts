import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {// meter em função á parte pois esta informação vem de um servidor, então esta função vai passar a ser async com subscribe
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void { //name of var has to be the same as the one in the Hero Object
    name = name.trim();
    if (!name) { return; }
    //the handler creates a Hero-like object from the name 
    //(it's only missing the id) and passes it to the services addHero() method.
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);//Remover do array por filtagrem
    this.heroService.deleteHero(hero).subscribe();
  }

  /* If you neglect to subscribe(), the service will not send the delete request to the server. As a rule, an Observable does nothing until something subscribes.
     Confirm this for yourself by temporarily removing the subscribe(), clicking "Dashboard", then clicking "Heroes". You'll see the full list of heroes again. */

  /*   onSelect(hero: Hero): void {
      this.selectedHero = hero;
      this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    } */

}
