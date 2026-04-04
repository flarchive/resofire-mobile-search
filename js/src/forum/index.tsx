import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import IndexPage from 'flarum/forum/components/IndexPage';
import GlobalSearch from 'flarum/forum/components/GlobalSearch';
import Button from 'flarum/common/components/Button';
import GlobalDiscussionsSearchSource from 'flarum/forum/components/GlobalDiscussionsSearchSource';
import GlobalPostsSearchSource from 'flarum/forum/components/GlobalPostsSearchSource';
import GlobalUsersSearchSource from 'flarum/forum/components/GlobalUsersSearchSource';

app.initializers.add('resofire-mobile-search', () => {
  // app.forum is not yet available when initializers run — defer until beforeMount,
  // which fires after app.forum is populated but before the DOM is rendered.
  app.beforeMount(() => {
    if (app.forum.attribute('resofireMobileSearchStyle') === 'icon') {
      document.documentElement.classList.add('resofire-icon-mode');
    }
  });

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
