import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';

export default [
  new Extend.Admin().setting(() => ({
    setting: 'resofire-mobile-search.style',
    type: 'select',
    label: app.translator.trans('resofire-mobile-search.admin.settings.mobile_search_style_label'),
    help: app.translator.trans('resofire-mobile-search.admin.settings.mobile_search_style_help'),
    options: {
      bar: app.translator.trans('resofire-mobile-search.admin.settings.mobile_search_style_option_bar'),
      icon: app.translator.trans('resofire-mobile-search.admin.settings.mobile_search_style_option_icon'),
    },
    default: 'bar',
  })),
];
