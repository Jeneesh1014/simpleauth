import {Alert, AppState} from 'react-native';
import {
  IS_LOGIN,
  USER_INFO,
  getStorageData,
} from '../../../services/storageHandler/storageHandler';
import {AppDispatch, RootState} from '../../app/store';
import {setIsLogin, setUserInfo} from '../../reducer/authSlice';
import {IUserInfo} from '../../../@types/user';

export const getIsLogin = () => async (dispatch: AppDispatch) => {
  try {
    const isLogin = await getStorageData(IS_LOGIN);
    dispatch(setIsLogin(isLogin));
  } catch (error) {
    console.log('Async Error');
  }
};

export const getUserInfo = () => async (dispatch: AppDispatch) => {
  try {
    const userInfo = await getStorageData(USER_INFO);
    dispatch(setUserInfo(userInfo));
  } catch (error) {
    console.log('Async Error');
  }
};

export const SignUpUser =
  (
    isLogin: boolean,
    email: string,
    password: string,
    onSuccess: (a: string) => void,
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const userInfo = state?.auth?.userInfo;
    try {
      if (isLogin) {
        const isExist =
          userInfo && userInfo?.email && userInfo?.email?.length > 0;
        const isValid =
          isExist && email == userInfo?.email && password == userInfo?.password;
        if (isValid) {
          dispatch(setIsLogin(true));
          onSuccess('true');
          return;
        } else {
          Alert.alert('Info', 'Invalid credential!!');
          onSuccess('false');
          return;
        }
      } else {
        const body: IUserInfo = {
          email: email,
          password: password,
        };
        dispatch(setUserInfo(body));
        dispatch(setIsLogin(true));
        onSuccess('true');
      }
    } catch (error) {
      onSuccess('false');
      console.log('sing up error', error);
    }
  };
