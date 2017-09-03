import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class PageTitleService{

  // pageTitle:string;
  private pageTitle = new Subject<string>();

  setPageTitle(value:string): void{
    console.log("setPageTitle")
    // this.pageTitle = value;
    // let obs = Observable.of(this.pageTitle);
    // this.pageTitle = new Observable(observer => { } );
    this.pageTitle.next(value);
  }

  getPageTitle(): Observable<string>{
    console.log("getPageTitle")
    // return this.pageTitle;
    return this.pageTitle.asObservable();
  }



}
