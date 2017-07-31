import { ImprovExercisesAngularPage } from './app.po';

describe('improv-exercises-angular App', () => {
  let page: ImprovExercisesAngularPage;

  beforeEach(() => {
    page = new ImprovExercisesAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
