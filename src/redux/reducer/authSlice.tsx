import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  IS_LOGIN,
  USER_TOKEN,
  setEncryptedStorageData,
  setStorageData,
} from '../../services/storageHandler/storageHandler';
export interface IAuthSlice {
  userToken: string | null;
  isLogin: boolean | null;
}

const initialState: IAuthSlice = {
  userToken: null,
  isLogin: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<boolean | null>) => {
      setStorageData(IS_LOGIN, action.payload);
      state.isLogin = action.payload;
    },

    setUserToken: (state, action: PayloadAction<string | null>) => {
      setEncryptedStorageData(USER_TOKEN, action.payload);
      state.userToken = action.payload;
    },
  },
});

export const {setIsLogin, setUserToken} = authSlice.actions;

export default authSlice.reducer;
