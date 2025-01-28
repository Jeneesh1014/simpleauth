import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {memo, useEffect} from 'react';
import {MainStackParamList} from '../../@types/navigation';
import Home from '../../screens/home/Home';
import SpashScreen from '../../screens/splashscreen/SpashScreen';
import AuthStack from '../authStack/AuthStack';
import {useAppDispatch} from '../../redux/app/store';
import {getIsLogin, getUserInfo} from '../../redux/action/users/auth';
const Stack = createStackNavigator<MainStackParamList>();
const Mainstack: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getInfo = () => {
      dispatch(getUserInfo());
      dispatch(getIsLogin());
    };
    getInfo();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="SplashScreen" component={SpashScreen} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default memo(Mainstack);
