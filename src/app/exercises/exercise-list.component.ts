import { Component, OnInit } from '@angular/core';
import { IExercise } from './exercise';
import { ExerciseService } from './exercise.service'
import { Observable } from 'rxjs/Observable';
import { PageTitleService } from '../services/page-title.service'

@Component({
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})

export class ExerciseListComponent implements OnInit {
  pageTitle: string='All Exercises';
  errorMessage: string;
  deletedExercise: IExercise;

  exercises: IExercise[] = [];
  filteredExercises: IExercise[];

  allTags: string[] = [];
  uniqueTags: string[] = [];

  _listFilter: string;

  get listFilter(): string{
    // console.log("getter")
    return this._listFilter;
  }

  set listFilter(value:string){
    // console.log("setter")
    this._listFilter = value;
    this.filteredExercises = this.listFilter ? this.performFilter(this.listFilter) : this.exercises;
  }

  tagFilter(value:string){
    this.listFilter = value;
  }

  performFilter(filterBy:string): IExercise[] {
    // console.log("performFilter", filterBy)
    filterBy = filterBy.toLocaleLowerCase();
    let filteredList = this.exercises.filter( (exercise: IExercise) =>
      exercise.tags.some(this.containsTag(filterBy)));
    // console.log("filteredList", filteredList)
    return filteredList;
  }

  containsTag(filterBy) {
    return function(element) {
      return element.toLocaleLowerCase() == filterBy;
    }
  }

  constructor(
    private _exerciseService: ExerciseService,
    private _pageTitleService: PageTitleService ) {
      this._pageTitleService.setPageTitle('All Exercises');
  }

  ngOnInit():void {
    this._exerciseService.getExercises()
      .subscribe(
        exercises => {
          this.exercises = exercises
          this.filteredExercises = this.exercises;
          this.getAllTags();
          this.setUniqueTags();
        },
        error => this.errorMessage = <any>error);
  }

  getAllTags(): void{
    for (let exercise of this.exercises) {
      for (let tag of exercise.tags){
        this.allTags.push(tag.toLocaleLowerCase());
      }
    }
  }

  setUniqueTags(): void{
    this.uniqueTags = this.allTags.filter((element, index, array) => element && array.indexOf(element) === index);
  }

  deleteExercise(id:number) {
    console.log("exercise id",id)

    let exerciseOperation:Observable<IExercise>;
    // Call removeComment() from CommentService to delete comment
    exerciseOperation = this._exerciseService.removeExercise(id)

    exerciseOperation.subscribe(
      deletedExercise => {
        console.log("deletedExercise", deletedExercise)
        this.deletedExercise = deletedExercise;
        this.removeDeletedExercise(deletedExercise);
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

  removeDeletedExercise(deletedExercise: IExercise): void {
    console.log("removeDeletedExercise")
    console.log("deletedExercise", deletedExercise);
    console.log("exercises:", this.exercises);
    this.exercises = this.exercises.filter(obj => obj.id !== deletedExercise.id);
    console.log("exercises:", this.exercises);
  }

}
