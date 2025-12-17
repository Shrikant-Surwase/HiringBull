import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { completeOnboarding } from '@/lib';

const EXPERIENCE_LEVELS = [
  {
    id: 'junior',
    label: 'Junior',
    description: '0-2 years of experience',
    icon: '🌱',
  },
  {
    id: 'mid',
    label: 'Mid-Level',
    description: '2-5 years of experience',
    icon: '🚀',
  },
  {
    id: 'senior',
    label: 'Senior',
    description: '5-8 years of experience',
    icon: '⭐',
  },
  {
    id: 'lead',
    label: 'Lead / Principal',
    description: '8+ years of experience',
    icon: '👑',
  },
] as const;

const COMPANIES = [
  { id: 'google', name: 'Google', emoji: '🔍' },
  { id: 'apple', name: 'Apple', emoji: '🍎' },
  { id: 'meta', name: 'Meta', emoji: '👤' },
  { id: 'amazon', name: 'Amazon', emoji: '📦' },
  { id: 'microsoft', name: 'Microsoft', emoji: '💻' },
  { id: 'netflix', name: 'Netflix', emoji: '🎬' },
  { id: 'spotify', name: 'Spotify', emoji: '🎵' },
  { id: 'stripe', name: 'Stripe', emoji: '💳' },
  { id: 'airbnb', name: 'Airbnb', emoji: '🏠' },
  { id: 'uber', name: 'Uber', emoji: '🚗' },
] as const;

type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number]['id'];
type CompanyId = (typeof COMPANIES)[number]['id'];

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View className="mb-8 w-full flex-row items-center px-2">
      <View
        className={`size-8 items-center justify-center rounded-full ${
          currentStep >= 1
            ? 'bg-blue-500'
            : 'bg-neutral-200 dark:bg-neutral-700'
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            currentStep >= 1 ? 'text-white' : 'text-neutral-500'
          }`}
        >
          1
        </Text>
      </View>

      <View className="mx-3 h-1 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
        <View
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      </View>

      <View
        className={`size-8 items-center justify-center rounded-full ${
          currentStep >= 2
            ? 'bg-blue-500'
            : 'bg-neutral-200 dark:bg-neutral-700'
        }`}
      >
        <Text
          className={`text-sm font-semibold ${
            currentStep >= 2 ? 'text-white' : 'text-neutral-500'
          }`}
        >
          2
        </Text>
      </View>
    </View>
  );
}

type OptionCardProps = {
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

function OptionCard({ selected, onPress, children }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 flex-row items-center rounded-xl border-2 p-4 ${
        selected
          ? 'border-blue-500 bg-blue-500'
          : 'border-neutral-200 dark:border-neutral-700'
      }`}
    >
      <View className="flex-1">{children}</View>
      <Ionicons
        name={selected ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        color={selected ? '#fff' : '#d1d5db'}
      />
    </Pressable>
  );
}

type Step1Props = {
  selectedLevel: ExperienceLevel | null;
  onSelect: (level: ExperienceLevel) => void;
};

function Step1({ selectedLevel, onSelect }: Step1Props) {
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      className="flex-1"
    >
      <Text className="mb-2 text-3xl font-bold">
        What's your experience level?
      </Text>
      <Text className="mb-6 text-base text-neutral-500">
        This helps us show you the most relevant jobs
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {EXPERIENCE_LEVELS.map((level) => {
          const isSelected = selectedLevel === level.id;
          return (
            <OptionCard
              key={level.id}
              selected={isSelected}
              onPress={() => onSelect(level.id)}
            >
              <View className="flex-row items-center">
                <Text className="mr-3 text-2xl">{level.icon}</Text>
                <View className="flex-1">
                  <Text
                    className={`text-lg font-semibold ${isSelected ? 'text-white' : ''}`}
                  >
                    {level.label}
                  </Text>
                  <Text
                    className={`text-sm ${isSelected ? 'text-blue-100' : 'text-neutral-500'}`}
                  >
                    {level.description}
                  </Text>
                </View>
              </View>
            </OptionCard>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

type Step2Props = {
  selectedCompanies: CompanyId[];
  onToggle: (companyId: CompanyId) => void;
};

function Step2({ selectedCompanies, onToggle }: Step2Props) {
  const [search, setSearch] = useState('');

  const filteredCompanies = useMemo(() => {
    if (!search.trim()) return COMPANIES;
    return COMPANIES.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutLeft.duration(300)}
      className="flex-1"
    >
      <Text className="mb-2 text-3xl font-bold">Companies you'd love</Text>
      <Text className="mb-4 text-base text-neutral-500">
        Select companies you're interested in working for
      </Text>

      <View className="mb-4 flex-row items-center rounded-xl border border-neutral-200 bg-neutral-100 px-4 dark:border-neutral-700 dark:bg-neutral-800">
        <Text className="mr-2">🔍</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search companies..."
          placeholderTextColor="#9ca3af"
          className="flex-1 py-3 text-base text-black dark:text-white"
        />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredCompanies.map((company) => {
          const isSelected = selectedCompanies.includes(company.id);
          return (
            <OptionCard
              key={company.id}
              selected={isSelected}
              onPress={() => onToggle(company.id)}
            >
              <View className="flex-row items-center">
                <Text className="mr-3 text-2xl">{company.emoji}</Text>
                <Text
                  className={`text-lg font-semibold ${isSelected ? 'text-white' : ''}`}
                >
                  {company.name}
                </Text>
              </View>
            </OptionCard>
          );
        })}
        {filteredCompanies.length === 0 && (
          <Text className="py-8 text-center text-neutral-500">
            No companies found
          </Text>
        )}
      </ScrollView>
    </Animated.View>
  );
}

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel | null>(null);
  const [selectedCompanies, setSelectedCompanies] = useState<CompanyId[]>([]);

  const handleToggleCompany = useCallback((companyId: CompanyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  }, []);

  const handleContinue = useCallback(() => {
    setStep(2);
  }, []);

  const handleFinish = useCallback(() => {
    // TODO: Save experienceLevel and selectedCompanies to storage/API
    completeOnboarding();
    router.replace('/');
  }, [router]);

  const canContinue = step === 1 ? experienceLevel !== null : true;

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-4">
          <StepIndicator currentStep={step} totalSteps={2} />

          {step === 1 ? (
            <Step1
              selectedLevel={experienceLevel}
              onSelect={setExperienceLevel}
            />
          ) : (
            <Step2
              selectedCompanies={selectedCompanies}
              onToggle={handleToggleCompany}
            />
          )}
        </View>
      </SafeAreaView>

      <View className="border-t border-neutral-200 bg-white px-6 pb-8 pt-4 dark:border-neutral-700 dark:bg-neutral-900">
        <Pressable
          onPress={step === 1 ? handleContinue : handleFinish}
          disabled={!canContinue}
          className={`h-14 items-center justify-center rounded-xl ${
            canContinue ? 'bg-blue-500' : 'bg-neutral-300'
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              canContinue ? 'text-white' : 'text-neutral-500'
            }`}
          >
            {step === 1 ? 'Continue' : 'Finish'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
