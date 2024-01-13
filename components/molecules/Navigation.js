import { usePathname } from 'expo-router';
import { memo, useCallback } from 'react';
import { Platform, Settings } from 'react-native';
import { dispatch } from 'use-bus';

import { DEBUG_MODE } from '../../constants/AppSettings';
import NavigationItem from '../atomics/NavigationItem';

export default memo(function Navigation() {
  const pathname = usePathname();
  const isIos = Platform.OS === 'ios';

  const isDebugMode = isIos ? Settings.get(DEBUG_MODE) : false;

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

      {isDebugMode ? (
        <NavigationItem href="/debug" label="Debug" icon="bug-report" onPress={pressLink} />
      ) : null}
    </>
  );
});
