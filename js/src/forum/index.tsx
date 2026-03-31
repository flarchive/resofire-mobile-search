import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';
import Button from 'flarum/common/components/Button';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import GlobalPostsSearchSource from 'flarum/forum/components/GlobalPostsSearchSource';
import GlobalUsersSearchSource from 'flarum/forum/components/GlobalUsersSearchSource';

app.initializers.add('resofire-mobile-search', () => {
  extend(IndexPage.prototype, 'viewItems', function (items) {
    if (app.forum.attribute('resofireMobileSearchStyle') === 'icon') {
      items.add(
        'search',
        <Button
          className="Button Button--icon"
          icon="fas fa-search"
          aria-label={app.translator.trans('core.forum.header.search_placeholder')}
          title={app.translator.trans('core.forum.header.search_placeholder')}
          onclick={() => {
            const sources = [];
            if (app.forum.attribute('canViewForum')) {
              sources.push(new GlobalDiscussionsSearchSource());
              sources.push(new GlobalPostsSearchSource());
            }
            if (app.forum.attribute('canSearchUsers')) {
              sources.push(new GlobalUsersSearchSource());
            }
            app.modal.show(() => import('flarum/common/components/SearchModal'), {
              searchState: app.search.state,
              sources,
            });
          }}
        />,
        -100
      );
    } else {
      items.add('search', <GlobalSearch state={app.search.state} />, -100);
    }
  });
});
