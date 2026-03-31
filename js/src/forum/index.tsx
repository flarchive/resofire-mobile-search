import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';

const ICON_MODE_CLASS = 'resofire-search-icon-mode';

app.initializers.add('resofire-mobile-search', () => {
  extend(IndexPage.prototype, 'viewItems', function (items) {
    items.add('search', <GlobalSearch state={app.search.state} />, -100);
  });

  extend(IndexPage.prototype, 'oncreate', function () {
    if (app.forum.attribute('resofireMobileSearchStyle') === 'icon') {
      $('#app').addClass(ICON_MODE_CLASS);
    }
  });

  extend(IndexPage.prototype, 'onremove', function () {
    $('#app').removeClass(ICON_MODE_CLASS);
  });
});
