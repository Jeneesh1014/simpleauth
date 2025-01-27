import {StackNavigationProp} from '@react-navigation/stack';

export type MainStackParamList = {
  AuthStack: AuthStackParamList;
  SplashScreen: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type navigationProp = StackNavigationProp<MainStackParamList>;
