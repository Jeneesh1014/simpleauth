import {StackNavigationProp} from '@react-navigation/stack';

export type MainStackParamList = {
  AuthStack: AuthStackParamList;
  SplashScreen: undefined;
  Home: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
};

export type navigationProp = StackNavigationProp<MainStackParamList>;
