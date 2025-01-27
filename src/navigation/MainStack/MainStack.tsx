import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import {AppState} from 'react-native';
import {useAppDispatch} from '../../redux/app/store';
import {MainStackParamList} from '../../@types/navigation';
import SpashScreen from '../../screens/splashscreen/SpashScreen';
import AuthStack from '../authStack/AuthStack';
const Stack = createStackNavigator<MainStackParamList>();
const Mainstack: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        console.log('12334');
      } else {
        console.log('3329');
      }
    });
    return () => {
      subscription.remove();
    };
  }, [dispatch]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="SplashScreen" component={SpashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default memo(Mainstack);
