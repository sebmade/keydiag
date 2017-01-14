import { KeydiagPage } from './app.po';

describe('keydiag App', function() {
  let page: KeydiagPage;

  beforeEach(() => {
    page = new KeydiagPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
