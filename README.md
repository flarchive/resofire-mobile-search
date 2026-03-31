# Mobile Search

A Flarum extension that moves the search bar into the index page toolbar on mobile, giving it more room and keeping the header uncluttered.

## Behavior

- **Phone:** The header search is hidden on the index page. A full-width search bar is injected directly into the discussion list toolbar.
- **Tablet and above:** The injected toolbar search is hidden; the header search works as normal.

## Requirements

- Flarum 2.0+
- PHP 8.3+

## Installation

```bash
composer require resofire/mobile-search
```

## Updating

```bash
composer update resofire/mobile-search
php flarum migrate
php flarum cache:clear
```
