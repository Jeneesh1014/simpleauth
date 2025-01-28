import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {Container} from '../../components/container/Container';
import styles from '../auth/login/styles';
import {SCREEN_HEIGHT} from '../../util/constant/responsive';
import {useNavigation} from '@react-navigation/native';
import {navigationProp} from '../../@types/navigation';
import {useAppDispatch} from '../../redux/app/store';
import {setIsLogin} from '../../redux/reducer/authSlice';

const Home = () => {
  const navigation = useNavigation<navigationProp>();
  const dispatch = useAppDispatch();
  const onLogOutPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'AuthStack'}],
    });
    dispatch(setIsLogin(false));
  };
  return (
    <Container
      style={[
        styles.container,
        {justifyContent: 'center', marginBottom: SCREEN_HEIGHT * 0.1},
      ]}>
      <Text style={styles.heading}>{'Welcome to Home Blockhouse!'}</Text>
      <TouchableOpacity onPress={onLogOutPress} style={styles.button}>
        <Text style={styles.buttonText}>{'Log out'}</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default memo(Home);
