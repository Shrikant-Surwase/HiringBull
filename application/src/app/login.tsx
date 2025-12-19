import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, TextInput as RNTextInput } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import {
  FocusAwareStatusBar,
  Input,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { useAuth } from '@/lib';

type Step = 'email' | 'otp';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleGoogleLogin = () => {
    // TODO: Implement Google Sign In
    console.log('Google Login');
  };

  const handleInitialContinue = () => {
    if (email.length > 0) {
      setStep('otp');
    }
  };

  const handleVerify = () => {
    if (otp.length > 0) {
      // simulate verification
      signIn({ access: 'access-token', refresh: 'refresh-token' });
      router.replace('/');
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <FocusAwareStatusBar />
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-12">
          {step === 'otp' && (
             <Pressable
                onPress={handleBack}
                className="mb-8 flex-row items-center self-start"
              >
                <Ionicons
                  name="arrow-back"
                  size={20}
                  className="text-neutral-900 dark:text-white"
                  color="#525252"
                />
                <Text className="ml-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Change email
                </Text>
              </Pressable>
          )}

          <Animated.View
            entering={FadeInRight.duration(300)}
            key={step}
            className="flex-1"
          >
            <Text className="mb-2 text-3xl font-bold dark:text-white">
              {step === 'email' ? 'Welcome' : 'Check your inbox'}
            </Text>
            <Text className="mb-8 text-base text-neutral-500">
              {step === 'email'
                ? 'Enter your email to continue'
                : `We've sent a 6-digit code to ${email}`}
            </Text>

            {step === 'email' ? (
              <View>
                <Pressable
                  onPress={handleGoogleLogin}
                  className="mb-8 flex-row items-center justify-center rounded-xl border border-neutral-200 bg-white py-4 active:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:active:bg-neutral-700"
                >
                  <Ionicons name="logo-google" size={20} color={""} />
                  <Text className="ml-3 text-base font-semibold dark:text-white">
                    Continue with Google
                  </Text>
                </Pressable>

                <View className="mb-8 flex-row items-center gap-4">
                  <View className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
                  <Text className="text-sm text-neutral-400">
                    Or continue with email
                  </Text>
                  <View className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
                </View>

                <View className="gap-4">
                  <Input
                    placeholder="name@work-email.com"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="go"
                    onSubmitEditing={handleInitialContinue}
                  />

                  <Pressable
                    onPress={handleInitialContinue}
                    disabled={email.length === 0}
                    className={`items-center justify-center rounded-xl py-4 ${
                      email.length > 0
                        ? 'bg-neutral-900 dark:bg-white'
                        : 'bg-neutral-200 dark:bg-neutral-800'
                    }`}
                  >
                    <Text
                      className={`text-base font-semibold ${
                        email.length > 0
                          ? 'text-white dark:text-black'
                          : 'text-neutral-500'
                      }`}
                    >
                      Continue
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View className="gap-4">
                <Input
                  placeholder="000000"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus
                  returnKeyType="go"
                  onSubmitEditing={handleVerify}
                  className="text-center text-2xl tracking-widest"
                />

                <Pressable
                  onPress={handleVerify}
                  disabled={otp.length !== 6}
                  className={`items-center justify-center rounded-xl py-4 ${
                    otp.length === 6
                      ? 'bg-neutral-900 dark:bg-white'
                      : 'bg-neutral-200 dark:bg-neutral-800'
                  }`}
                >
                  <Text
                    className={`text-base font-semibold ${
                      otp.length === 6
                        ? 'text-white dark:text-black'
                        : 'text-neutral-500'
                    }`}
                  >
                    Verify & Continue
                  </Text>
                </Pressable>

                 <Pressable className="mt-4 items-center">
                  <Text className="text-sm font-medium text-neutral-900 dark:text-white">
                    Resend Code
                  </Text>
                </Pressable>
              </View>
            )}
             {/* Disclaimer */}
            <View className="mt-auto pb-8">
                <Text className="text-center text-xs text-neutral-400 leading-5">
                    By clicking continue, you agree to our{' '}
                    <Text className="text-neutral-900 dark:text-white underline">Terms of Service</Text> and{' '}
                    <Text className="text-neutral-900 dark:text-white underline">Privacy Policy</Text>
                </Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
