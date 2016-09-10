import { MarathonTracker1Page } from './app.po';

describe('marathon-tracker1 App', function() {
  let page: MarathonTracker1Page;

  beforeEach(() => {
    page = new MarathonTracker1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
