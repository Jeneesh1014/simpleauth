import React from 'react';
import {StyleProp, ViewStyle, SafeAreaView} from 'react-native';
import {globalStyles} from '../../util/constant/styles';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Container = ({children, style}: ContainerProps) => {
  return (
    <SafeAreaView style={[globalStyles.container, style]}>
      {children}
    </SafeAreaView>
  );
};
