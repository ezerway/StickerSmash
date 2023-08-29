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
      <NavigationItem
        href="/top-scorers"
        label="TopScorers"
        icon="trophy"
        iconType="Ionicons"
        onPress={pressLink}
      />
      {isHome ? (
        <NavigationItem href="/bookmarks" label="Bookmarks" icon="bookmarks" onPress={pressLink} />
      ) : null}
      <NavigationItem href="/newsfeed" label="Newsfeed" icon="dynamic-feed" onPress={pressLink} />
      <NavigationItem href="/profile" label="Profile" icon="person-pin" onPress={pressLink} />

      {isHome ? null : <NavigationItem href="/" label="Home" icon="home" onPress={pressLink} />}
    </>
  );
});
