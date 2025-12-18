import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_SCREENS = [
  {
    name: 'index',
    title: 'Jobs',
    icon: 'briefcase-outline' as IconName,
    iconActive: 'briefcase' as IconName,
  },
  {
    name: 'search',
    title: 'Search',
    icon: 'search-outline' as IconName,
    iconActive: 'search' as IconName,
  },
  {
    name: 'saved',
    title: 'Saved',
    icon: 'bookmark-outline' as IconName,
    iconActive: 'bookmark' as IconName,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person-outline' as IconName,
    iconActive: 'person' as IconName,
  },
] as const;

const HIDDEN_SCREENS = ['style', 'settings'] as const;

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a', // primary-600
        tabBarInactiveTintColor: isDark ? '#d4d4d4' : '#262626', // neutral-300 / neutral-800
        tabBarStyle: {
          backgroundColor: isDark ? '#171717' : '#ffffff',
          borderTopColor: isDark ? '#404040' : '#e5e5e5',
          borderTopWidth: 1,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      {TAB_SCREENS.map(({ name, title, icon, iconActive }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? iconActive : icon}
                size={22}
                color={color}
              />
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
