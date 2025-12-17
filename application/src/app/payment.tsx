import { useRouter } from 'expo-router';
import React from 'react';

import {
  FocusAwareStatusBar,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { subscribe } from '@/lib';

export default function Payment() {
  const router = useRouter();

  const handleSubscribe = () => {
    subscribe();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-4 text-5xl">💳</Text>
          <Text className="mb-2 text-center text-3xl font-bold">
            Unlock Premium
          </Text>
          <Text className="mb-8 text-center text-lg text-neutral-500">
            Subscribe to access all features and find your dream job faster
          </Text>

          <View className="w-full rounded-xl border-2 border-blue-500 bg-blue-50 p-6 dark:bg-blue-950">
            <Text className="mb-2 text-center text-2xl font-bold text-blue-500">
              $9.99/month
            </Text>
            <Text className="text-center text-sm text-neutral-500">
              Cancel anytime
            </Text>
          </View>
        </View>

        <View className="px-6 pb-8">
          <Pressable
            onPress={handleSubscribe}
            className="h-14 items-center justify-center rounded-xl bg-blue-500"
          >
            <Text className="text-lg font-semibold text-white">
              Subscribe Now
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
