import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';

app.initializers.add('resofire-mobile-search', () => {
  extend(IndexPage.prototype, 'viewItems', function (items) {
    items.add('search', <GlobalSearch state={app.search.state} />, -100);
  });
});
