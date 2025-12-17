import { useRouter } from 'expo-router';
import React from 'react';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useIsFirstTime } from '@/lib';

export default function Landing() {
  const router = useRouter();
  const [_, setIsFirstTime] = useIsFirstTime();

  const handleContinue = () => {
    setIsFirstTime(false);
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-4 text-4xl font-bold">👋</Text>
          <Text className="mb-2 text-center text-3xl font-bold">
            Welcome to MyApp
          </Text>
          <Text className="text-center text-lg text-neutral-500">
            Find your dream job at top companies
          </Text>
        </View>

        <View className="px-6 pb-8">
          <Pressable
            onPress={handleContinue}
            className="h-14 items-center justify-center rounded-xl bg-blue-500"
          >
            <Text className="text-lg font-semibold text-white">
              Get Started
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
