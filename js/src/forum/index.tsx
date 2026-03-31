import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import Search from 'flarum/forum/components/Search';

app.initializers.add('resofire-mobile-search', () => {
  extend(IndexPage.prototype, 'viewItems', function (items) {
    items.add('search', <Search state={app.search.state} />, -100);
  });
});
