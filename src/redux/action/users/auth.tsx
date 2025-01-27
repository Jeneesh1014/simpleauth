import {
  IS_LOGIN,
  USER_TOKEN,
  getEncryptedStorageData,
  getStorageData,
} from '../../../services/storageHandler/storageHandler';
import {AppDispatch} from '../../app/store';
import {setIsLogin, setUserToken} from '../../reducer/authSlice';

export const getIsLogin = () => async (dispatch: AppDispatch) => {
  try {
    const isLogin = await getStorageData(IS_LOGIN);
    dispatch(setIsLogin(isLogin));
  } catch (error) {
    console.log('Async Error');
  }
};

export const getUserToken = () => async (dispatch: AppDispatch) => {
  try {
    const userToken = await getEncryptedStorageData(USER_TOKEN);
    dispatch(setUserToken(userToken));
  } catch (error) {
    console.log('Async Error');
  }
};
