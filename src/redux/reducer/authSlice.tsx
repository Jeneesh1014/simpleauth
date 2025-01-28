import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IUserInfo} from '../../@types/user';
import {
  IS_LOGIN,
  USER_INFO,
  setStorageData,
} from '../../services/storageHandler/storageHandler';
export interface IAuthSlice {
  isLogin: boolean | null;
  userInfo: IUserInfo | null;
}

const initialState: IAuthSlice = {
  isLogin: null,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      setStorageData(IS_LOGIN, action.payload);
      state.isLogin = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      setStorageData(USER_INFO, action.payload);
      state.userInfo = action.payload;
    },
  },
});

export const {setIsLogin, setUserInfo} = authSlice.actions;

export default authSlice.reducer;
