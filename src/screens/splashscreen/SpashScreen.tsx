import {View, Text} from 'react-native';
import React, {memo, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {navigationProp} from '../../@types/navigation';

const SpashScreen = () => {
  const navigation = useNavigation<navigationProp>();
  useEffect(() => {
    navigation.navigate('AuthStack' as never);
  }, []);
  return null;
};

export default memo(SpashScreen);
