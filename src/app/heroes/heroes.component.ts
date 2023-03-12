import { Component , OnInit } from '@angular/core';
import { Hero } from '../hero';
///we import the mock with the array og heroes

import { HeroService } from '../hero.service';
///import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',///this is selector for css
  templateUrl: './heroes.component.html',///the location if the component
  styleUrls: ['./heroes.component.css'],///the location of the componen private css styles
 
})
export class HeroesComponent implements OnInit {

  ///firts imported Hero interface
  /// and them indicate than hero is a one Hero interfaca
  selectedHero?: Hero;
  heroes : Hero[]=[];
  
  constructor(private heroService: HeroService,
/*               private messageService: MessageService
 */    ) {}
  
  
  ngOnInit(): void {
    this.getHeroes();
  }

  ///onSelect() method, which assigns the clicked hero 
  ///from the template to the component's selectedHero.
  /* onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected Hero id=${hero.id}`);
  } */
  ///we indicate that heroes is a HEROES array
  getHeroes(): void {
    this.heroService.getHeroes().
    subscribe(heroes => this.heroes = heroes);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
 
}
