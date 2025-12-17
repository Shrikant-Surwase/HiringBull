import { Ionicons } from '@expo/vector-icons';
import { SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth } from '@/lib';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_SCREENS = [
  { name: 'index', title: 'Jobs', icon: 'briefcase-outline' as IconName },
  { name: 'search', title: 'Search', icon: 'search-outline' as IconName },
  { name: 'saved', title: 'Saved', icon: 'bookmark-outline' as IconName },
  { name: 'profile', title: 'Profile', icon: 'person-outline' as IconName },
] as const;

const HIDDEN_SCREENS = ['style', 'settings'] as const;

function TabLayout() {
  return (
    <Tabs>
      {TAB_SCREENS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={icon} size={size} color={color} />
            ),
            tabBarButtonTestID: `tab-${name}`,
          }}
        />
      ))}
      {HIDDEN_SCREENS.map((name) => (
        <Tabs.Screen key={name} name={name} options={{ href: null }} />
      ))}
    </Tabs>
  );
}

export default TabLayout;
