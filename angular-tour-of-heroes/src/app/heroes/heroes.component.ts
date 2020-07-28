import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

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

/*   onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  } */

}
