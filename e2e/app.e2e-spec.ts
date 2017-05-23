import { Angular2ExpressStormpathExamplePage } from './app.po';

describe('angular2-express-stormpath-example App', function() {
  let page: Angular2ExpressStormpathExamplePage;

  beforeEach(() => {
    page = new Angular2ExpressStormpathExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
