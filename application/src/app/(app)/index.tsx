import React from 'react';

import { FocusAwareStatusBar, SafeAreaView, Text, View } from '@/components/ui';

export default function Jobs() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-4 text-6xl">💼</Text>
        <Text className="mb-2 text-center text-3xl font-bold">Jobs</Text>
        <Text className="text-center text-base text-neutral-500">
          Browse job listings here
        </Text>
      </View>
    </SafeAreaView>
  );
}
