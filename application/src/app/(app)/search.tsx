import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, TextInput } from 'react-native';

import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

const RECENT_SEARCHES = [
  { id: '1', query: 'React Native Developer', emoji: '📱' },
  { id: '2', query: 'Senior Frontend Engineer', emoji: '💻' },
  { id: '3', query: 'Mobile Engineer', emoji: '🚀' },
] as const;

const POPULAR_CATEGORIES = [
  { id: 'engineering', label: 'Engineering', emoji: '⚙️' },
  { id: 'design', label: 'Design', emoji: '🎨' },
  { id: 'product', label: 'Product', emoji: '📊' },
  { id: 'marketing', label: 'Marketing', emoji: '📢' },
] as const;

type CategoryId = (typeof POPULAR_CATEGORIES)[number]['id'];

type CategoryChipProps = {
  label: string;
  emoji: string;
  isSelected: boolean;
  onPress: () => void;
};

function CategoryChip({
  label,
  emoji,
  isSelected,
  onPress,
}: CategoryChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-2 mr-2 flex-row items-center rounded-xl border-2 px-4 py-3 ${
        isSelected
          ? 'border-primary-500 bg-primary-500'
          : 'border-neutral-200 dark:border-neutral-700'
      }`}
    >
      <Text className="mr-2 text-lg">{emoji}</Text>
      <Text
        className={`font-medium ${isSelected ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

type RecentSearchItemProps = {
  query: string;
  emoji: string;
};

function RecentSearchItem({ query, emoji }: RecentSearchItemProps) {
  return (
    <Pressable className="mb-2 flex-row items-center rounded-xl border border-neutral-200 p-4 dark:border-neutral-700">
      <Text className="mr-3 text-xl">{emoji}</Text>
      <Text className="flex-1 text-base">{query}</Text>
      <Ionicons name="arrow-forward" size={18} color="#a3a3a3" />
    </Pressable>
  );
}

export default function Search() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(
    null
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-1 px-6 pt-4">
        <Text className="mb-2 text-3xl font-bold">Search Jobs</Text>
        <Text className="mb-6 text-base text-neutral-500">
          Find your dream job
        </Text>

        <View className="mb-6 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-100 px-4 dark:border-neutral-700 dark:bg-neutral-800">
          <Ionicons name="search-outline" size={20} color="#a3a3a3" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Job title, company, or keyword..."
            placeholderTextColor="#a3a3a3"
            className="ml-3 flex-1 py-4 text-base text-black dark:text-white"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#a3a3a3" />
            </Pressable>
          )}
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="mb-3 text-lg font-semibold">Categories</Text>
          <View className="mb-6 flex-row flex-wrap">
            {POPULAR_CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.label}
                emoji={cat.emoji}
                isSelected={selectedCategory === cat.id}
                onPress={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id
                  )
                }
              />
            ))}
          </View>

          <Text className="mb-3 text-lg font-semibold">Recent Searches</Text>
          <View className="mb-6">
            {RECENT_SEARCHES.map((item) => (
              <RecentSearchItem
                key={item.id}
                query={item.query}
                emoji={item.emoji}
              />
            ))}
          </View>

          <Button label="Search Jobs" variant="default" size="lg" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
