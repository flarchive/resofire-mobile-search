import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';
import Button from 'flarum/common/components/Button';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import GlobalPostsSearchSource from 'flarum/forum/components/GlobalPostsSearchSource';
import GlobalUsersSearchSource from 'flarum/forum/components/GlobalUsersSearchSource';

app.initializers.add('resofire-mobile-search', () => {
  // If the admin has chosen icon-only mode, mark the root element so CSS can
  // suppress the bar at ALL phone widths, not just <=468px.
  if (app.forum.attribute('resofireMobileSearchStyle') === 'icon') {
    document.documentElement.classList.add('resofire-icon-mode');
  }

  extend(IndexPage.prototype, 'viewItems', function (items) {
    const openSearchModal = () => {
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
    };

    // Always render both. CSS decides which is visible based on viewport width
    // and whether the admin has chosen icon-only mode.
    items.add('search-bar', <GlobalSearch state={app.search.state} />, -90);
    items.add(
      'search-icon',
      <Button
        className="Button Button--icon"
        icon="fas fa-search"
        aria-label={app.translator.trans('core.forum.header.search_placeholder')}
        title={app.translator.trans('core.forum.header.search_placeholder')}
        onclick={openSearchModal}
      />,
      -100
    );
  });
});
