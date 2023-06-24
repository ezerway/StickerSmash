import { Link, usePathname } from 'expo-router';
import { memo, useCallback } from 'react';
import { dispatch } from 'use-bus';

import { i18n } from '../../i18n';
import IconButton from '../atomics/IconButton';

export default memo(function Navigation() {
  const pathname = usePathname();

  const pressLink = useCallback(() => {
    return (targetPathname) => {
      if (targetPathname !== pathname) {
      }

      dispatch('SCROLL_TO_TOP');
    };
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <Link href="/top-scorers" onPress={pressLink('/top-scorers')} asChild>
        <IconButton icon="trophy" iconType="Ionicons" label={i18n.t('TopScorers')} />
      </Link>
      {isHome ? (
        <Link href="/bookmarks" onPress={pressLink('/bookmarks')} asChild>
          <IconButton icon="bookmarks" label={i18n.t('Bookmarks')} />
        </Link>
      ) : null}
      <Link href="/newsfeed" onPress={pressLink('/newsfeed')} asChild>
        <IconButton icon="dynamic-feed" label={i18n.t('Newsfeed')} />
      </Link>
      <Link href="/profile" onPress={pressLink('/profile')} asChild>
        <IconButton icon="person-pin" label={i18n.t('Profile')} />
      </Link>
      {isHome ? null : (
        <Link href="/" onPress={pressLink('/')} asChild>
          <IconButton icon="home" label={i18n.t('Home')} />
        </Link>
      )}
    </>
  );
});
