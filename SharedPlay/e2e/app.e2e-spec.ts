import { SharedPlayPage } from './app.po';

describe('shared-play App', () => {
  let page: SharedPlayPage;

  beforeEach(() => {
    page = new SharedPlayPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
