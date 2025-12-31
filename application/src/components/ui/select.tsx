import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetFlatList,
  type BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  type PressableProps,
  View,
} from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import colors from '@/components/ui/colors';
import { CaretDown } from '@/components/ui/icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { InputControllerType } from './input';
import { Modal, useModal } from './modal';
import { Text } from './text';

const selectTv = tv({
  slots: {
    container: 'mb-4',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    input:
      'border-grey-50 mt-0 flex-row items-center justify-center rounded-xl border-[0.5px] p-3  dark:border-neutral-500 dark:bg-neutral-800',
    inputValue: 'dark:text-neutral-100',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-600',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
        inputValue: 'text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

const List = Platform.OS === 'web' ? FlashList : BottomSheetFlatList;

export type OptionType = {
  label: string;
  value: string | number;
  icon?: string;
};

type OptionsProps = {
  options: OptionType[];
  onSelect: (option: OptionType) => void;
  value?: string | number;
  testID?: string;
  modalExtraHeight?: number;
  optionClassName?: string;
  optionTextClassName?: string;
  itemHeight?: number;
};

function keyExtractor(item: OptionType) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  (
    {
      options,
      onSelect,
      value,
      testID,
      modalExtraHeight: _modalExtraHeight = 100,
      optionClassName,
      optionTextClassName,
      itemHeight = 52,
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const { bottom } = useSafeAreaInsets();

    const screenHeight = Dimensions.get('window').height;
    const totalHeight = options.length * itemHeight;
    const snapHeight = Math.min(totalHeight, screenHeight * 0.9);
    const snapPoints = [`${(snapHeight / screenHeight) * 90}%`];

    const renderSelectItem = React.useCallback(
      ({ item }: { item: OptionType }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
          testID={testID ? `${testID}-item-${item.value}` : undefined}
          className={optionClassName}
          textClassName={optionTextClassName}
          icon={item.icon}
          height={itemHeight}
        />
      ),
      [
        onSelect,
        value,
        testID,
        optionClassName,
        optionTextClassName,
        itemHeight,
      ]
    );

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
      >
        <View className={`flex-1`}>
          <List
            data={options}
            keyExtractor={keyExtractor}
            renderItem={renderSelectItem}
            testID={testID ? `${testID}-modal` : undefined}
            estimatedItemSize={itemHeight}
            showsVerticalScrollIndicator={false}
          />
          <View style={{ height: bottom }} />
        </View>
      </Modal>
    );
  }
);

const Option = React.memo(
  ({
    label,
    selected = false,
    className,
    textClassName,
    icon,
    height,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
    className?: string;
    textClassName?: string;
    icon?: string;
    height?: number;
  }) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const defaultClassName =
      'flex-row items-center border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800';
    const defaultTextClassName =
      'flex-1 text-neutral-900 dark:text-neutral-100';

    const iconColor = isDark ? '#d1d5db' : '#6b7280';

    return (
      <Pressable
        className={className || defaultClassName}
        style={height ? { height } : undefined}
        {...props}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={iconColor}
            style={{ marginRight: 12 }}
          />
        )}
        <Text
          className={textClassName || defaultTextClassName}
          numberOfLines={1}
        >
          {label}
        </Text>
        {selected && <Check />}
      </Pressable>
    );
  }
);

export interface SelectProps {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  options?: OptionType[];
  onSelect?: (value: string | number) => void;
  onValueChange?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
  className?: string;
  inputValueClassName?: string;
  modalExtraHeight?: number;
  optionClassName?: string;
  optionTextClassName?: string;
  itemHeight?: number;
}
interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

export const Select = React.forwardRef<{ present: () => void }, SelectProps>(
  (props, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const {
      label,
      value,
      error,
      options = [],
      placeholder = 'select...',
      disabled = false,
      onSelect,
      testID,
      className,
      inputValueClassName,
      modalExtraHeight = 100,
      optionClassName,
      optionTextClassName,
      itemHeight,
    } = props;
    const modal = useModal();

    const onSelectOption = React.useCallback(
      (option: OptionType) => {
        onSelect?.(option.value);
        modal.dismiss();
      },
      [modal, onSelect]
    );

    const styles = React.useMemo(
      () =>
        selectTv({
          error: Boolean(error),
          disabled,
        }),
      [error, disabled]
    );

    const selectedOption = React.useMemo(
      () =>
        value !== undefined
          ? options?.filter((t) => t.value === value)?.[0]
          : null,
      [value, options]
    );

    const textValue = React.useMemo(
      () => selectedOption?.label ?? placeholder,
      [selectedOption, placeholder]
    );

    const handlePress = () => {
      if (!disabled) {
        Keyboard.dismiss();
        modal.present();
      }
    };

    React.useImperativeHandle(ref, () => ({ present: modal.present }), [modal]);

    return (
      <>
        <View className={styles.container()}>
          {label && (
            <Text
              testID={testID ? `${testID}-label` : undefined}
              className={styles.label()}
            >
              {label}
            </Text>
          )}
          <Pressable
            className={`${styles.input()} ${className || ''}`}
            disabled={disabled}
            onPress={handlePress}
            testID={testID ? `${testID}-trigger` : undefined}
          >
            {selectedOption?.icon && (
              <Ionicons
                name={selectedOption.icon as any}
                size={20}
                color={isDark ? '#d1d5db' : '#6b7280'}
                style={{ marginRight: 8 }}
              />
            )}
            <View className="flex-1">
              <Text
                className={
                  textValue === placeholder
                    ? `${styles.inputValue()} ${inputValueClassName || ''}`
                    : styles.inputValue()
                }
              >
                {textValue}
              </Text>
            </View>
            <CaretDown />
          </Pressable>
          {error && (
            <Text
              testID={`${testID}-error`}
              className="text-sm text-danger-300 dark:text-danger-600"
            >
              {error}
            </Text>
          )}
        </View>
        <Options
          testID={testID}
          ref={modal.ref}
          options={options}
          onSelect={onSelectOption}
          modalExtraHeight={modalExtraHeight}
          optionClassName={optionClassName}
          optionTextClassName={optionTextClassName}
          itemHeight={itemHeight}
        />
      </>
    );
  }
);

// only used with react-hook-form
export const ControlledSelect = React.forwardRef<
  { present: () => void },
  ControlledSelectProps<any>
>(
  (
    {
      name,
      control,
      rules,
      onSelect: onNSelect,
      onValueChange,
      ...selectProps
    },
    ref
  ) => {
    const { field, fieldState } = useController({ control, name, rules });
    const onSelect = React.useCallback(
      (value: string | number) => {
        field.onChange(value);
        onNSelect?.(value);
        onValueChange?.(value);
      },
      [field, onNSelect, onValueChange]
    );
    return (
      <Select
        ref={ref}
        onSelect={onSelect}
        value={field.value}
        error={fieldState.error?.message}
        {...selectProps}
      />
    );
  }
);

const Check = ({ ...props }: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
    className="stroke-black dark:stroke-white"
  >
    <Path
      d="m20.256 6.75-10.5 10.5L4.506 12"
      strokeWidth={2.438}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
