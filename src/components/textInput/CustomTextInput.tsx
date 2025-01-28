import React, {RefObject, memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  GestureResponderEvent,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../util/constant/colors';

type props = {
  placeHolder: string;
  value?: string;
  defaultValue: string;
  onChangeText?: (a: string) => void | undefined;
  setRef?: RefObject<TextInput> | any;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  secureTextEntry?: boolean | undefined;
  disableUpdateValue?: boolean | undefined;
  selectTextOnFocus?: boolean | undefined;
  autoFocus?: boolean | undefined;
  multiline?: boolean;
  numberOfLines?: number | undefined;
  editable?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  textInputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  isPrice?: boolean | undefined;
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined;
  isRequired?: boolean | undefined;
  isSubmited?: boolean | undefined;
  maxLength?: number | undefined;
  onTextFieldPress?: ((event: GestureResponderEvent) => void) | undefined;
  errorMessage?: string;
};

const CustomTextInput = ({
  placeHolder,
  setRef,
  value,
  onChangeText,
  onSubmitEditing,
  secureTextEntry,
  defaultValue,
  multiline,
  numberOfLines,
  editable,
  keyboardType,
  selectTextOnFocus,
  containerStyle,
  autoFocus,
  textInputStyle,
  onLongPress,
  isRequired,
  isSubmited,
  maxLength,
  onTextFieldPress,
  errorMessage = '',
}: props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const placeholderAnim = useRef(
    new Animated.Value(defaultValue ? 1 : 0),
  ).current;
  const translationY = placeholderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, -10],
  });
  useEffect(() => {
    if (defaultValue?.length > 0) {
      setTimeout(() => {
        handleFocus(true);
      }, 100);
    }
  }, [defaultValue]);
  const handleFocus = (isInit = false) => {
    if (!isInit) setIsFocused(true);
    Animated.timing(placeholderAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      placeholderAnim.setValue(0);
    }
    setIsFocused(false);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{marginBottom: 25}}
      onLongPress={onLongPress}
      onPressIn={onTextFieldPress}>
      <View
        style={[
          {
            borderBottomWidth: isFocused ? 1.4 : 1,
            borderColor:
              isRequired && isSubmited && value?.length == 0
                ? colors.error
                : isFocused
                ? colors.richBlack
                : colors.black,
            // width: CURRENT_WIDTH - 50,
            paddingTop: multiline ? 10 : 4,
            paddingBottom: multiline ? 5 : 2,
            marginBottom: 3,
          },
          containerStyle,
        ]}>
        <Animated.View
          style={{
            position: 'absolute',
            transform: [{translateY: translationY}],
            opacity: placeholderAnim,
          }}>
          <Text
            style={{
              color:
                isRequired && isSubmited && value?.length == 0
                  ? colors.error
                  : isFocused
                  ? colors.richBlack
                  : colors.black,
              fontSize: 12,
            }}>
            {placeHolder}
          </Text>
        </Animated.View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <TextInput
            onPressIn={onTextFieldPress}
            caretHidden={isFocused ? false : true}
            defaultValue={defaultValue}
            placeholder={isFocused ? '' : placeHolder}
            placeholderTextColor={
              isRequired && isSubmited && value?.length == 0
                ? colors.error
                : colors.raisinBlack
            }
            cursorColor={colors.raisinBlack}
            ref={setRef}
            onChangeText={onChangeText}
            style={[
              styles.textinputStyles,
              {fontSize: 14},
              textInputStyle,
              {padding: 5},
            ]}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            numberOfLines={numberOfLines}
            multiline={multiline}
            selectTextOnFocus={selectTextOnFocus}
            editable={editable}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            onFocus={() => handleFocus()}
            onBlur={handleBlur}
            maxLength={maxLength}
            textAlignVertical={multiline ? 'bottom' : undefined}
          />
        </View>
      </View>
      {isSubmited && errorMessage?.length > 0 && (
        <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(CustomTextInput);
export const styles = StyleSheet.create({
  textinputStyles: {
    maxHeight: 55,
    color: colors.black,
    paddingBottom: -10,
    marginLeft: -4,
    marginTop: 5,
    paddingTop: -5,
    flex: 1,
  },
});
