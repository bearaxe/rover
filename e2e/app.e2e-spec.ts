import { RoverPage } from './app.po';

describe('rover App', () => {
  let page: RoverPage;

  beforeEach(() => {
    page = new RoverPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
