import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import {
  FocusAwareStatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

type Job = {
  id: string;
  company: string;
  segment: string;
  title: string;
  careerpage_link: string;
  company_id: string;
  created_at: string;
  created_by: string | null;
};

const DUMMY_JOBS: Job[] = [
  {
    id: '1',
    company: 'Google',
    segment: 'Experience: <1 Year',
    title: 'Software Engineer, AI/ML Infrastructure',
    careerpage_link: 'https://google.com',
    company_id: 'google-1',
    created_at: '2024-12-18T10:30:00Z',
    created_by: null,
  },
  {
    id: '2',
    company: 'Meta',
    segment: 'Experience: 1-3 Years',
    title: 'Frontend Engineer, React Native',
    careerpage_link: 'https://meta.com',
    company_id: 'meta-1',
    created_at: '2024-12-17T14:00:00Z',
    created_by: 'admin',
  },
  {
    id: '3',
    company: 'Amazon',
    segment: 'Experience: <1 Year',
    title: 'SDE I, AWS Cloud Services',
    careerpage_link: 'https://amazon.jobs',
    company_id: 'amazon-1',
    created_at: '2024-12-16T09:00:00Z',
    created_by: null,
  },
  {
    id: '4',
    company: 'Microsoft',
    segment: 'Experience: 2-4 Years',
    title: 'Product Manager, Azure DevOps',
    careerpage_link: 'https://microsoft.com',
    company_id: 'microsoft-1',
    created_at: '2024-12-15T11:30:00Z',
    created_by: 'admin',
  },
  {
    id: '5',
    company: 'Apple',
    segment: 'Experience: 1-2 Years',
    title: 'iOS Developer, Health Team',
    careerpage_link: 'https://apple.com/careers',
    company_id: 'apple-1',
    created_at: '2024-12-14T16:00:00Z',
    created_by: null,
  },
  {
    id: '6',
    company: 'Netflix',
    segment: 'Experience: 3-5 Years',
    title: 'Senior Backend Engineer, Streaming',
    careerpage_link: 'https://netflix.com/jobs',
    company_id: 'netflix-1',
    created_at: '2024-12-13T08:45:00Z',
    created_by: 'admin',
  },
];

type JobCardProps = {
  job: Job;
  onSave: () => void;
};

function JobCard({ job, onSave }: JobCardProps) {
  const handleOpenLink = useCallback(() => {
    Linking.openURL(job.careerpage_link);
  }, [job.careerpage_link]);

  return (
    <View className="mb-3 rounded-xl bg-primary-50 p-4 dark:bg-neutral-800">
      <Text className="mb-0.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        {job.company}
      </Text>

      <Text className="mb-1 text-base font-semibold text-neutral-900 dark:text-white">
        {job.title}
      </Text>

      <Text className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
        {job.segment}
      </Text>

      <View className="flex-row items-center gap-5">
        <Pressable onPress={handleOpenLink} hitSlop={8}>
          <Ionicons name="link-outline" size={24} color="#3b82f6" />
        </Pressable>

        <Pressable onPress={onSave} hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color="#3b82f6" />
        </Pressable>
      </View>
    </View>
  );
}

export default function Jobs() {
  const handleSaveJob = useCallback((jobId: string) => {
    // TODO: Implement save job functionality
    console.log('Save job:', jobId);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <View className="flex-1 px-5 pt-4">
        <Text className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
          Explore Jobs
        </Text>
        <Text className="mb-5 text-sm text-neutral-500">
          Jobs matching your experience level
        </Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {DUMMY_JOBS.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => handleSaveJob(job.id)}
            />
          ))}
          <View className="h-4" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
