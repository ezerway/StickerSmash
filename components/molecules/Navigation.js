import { usePathname } from 'expo-router';
import { memo, useCallback } from 'react';
import { dispatch } from 'use-bus';

import NavigationItem from '../atomics/NavigationItem';

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
      {isHome ? (
        <NavigationItem href="/trending" label="Trending" icon="trending-up" onPress={pressLink} />
      ) : null}
      <NavigationItem href="/bookmark" label="Bookmark" icon="bookmarks" onPress={pressLink} />

      <NavigationItem href="/newsfeed" label="Newsfeed" icon="dynamic-feed" onPress={pressLink} />
      <NavigationItem href="/profile" label="Profile" icon="person-pin" onPress={pressLink} />

      {isHome ? null : <NavigationItem href="/" label="Home" icon="home" onPress={pressLink} />}
    </>
  );
});
