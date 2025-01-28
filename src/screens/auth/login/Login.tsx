import React, {memo, useEffect, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Container} from '../../../components/container/Container';
import CustomTextInput from '../../../components/textInput/CustomTextInput';
import {validateEmail} from '../validation';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {navigationProp} from '../../../@types/navigation';
import {useAppDispatch} from '../../../redux/app/store';
import {SignUpUser} from '../../../redux/action/users/auth';

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation<navigationProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [isLogin]);

  const handleSubmit = () => {
    setIsSubmited(true);
    setErrors({}); // Reset errors

    let valid = true;
    let newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    dispatch(
      SignUpUser(isLogin, email, password, success => {
        if (success == 'true') {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        } else if (success == 'false') {
          console.log('do not success');
        }
      }),
    );
  };

  return (
    <Container style={styles.container}>
      <Text style={styles.heading}>
        {isLogin ? 'Welcome Back!' : 'Create an Account'}
      </Text>
      <Text style={styles.subheading}>
        {isLogin
          ? 'Please log in to continue using the app'
          : 'Register to get started and explore our features'}
      </Text>

      <CustomTextInput
        placeHolder={'Email'}
        value={email}
        defaultValue={email ?? ''}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
        setRef={emailRef}
        isRequired
        isSubmited={isSubmited}
        keyboardType="email-address"
        errorMessage={errors.email}
      />

      <CustomTextInput
        placeHolder={'Password'}
        value={password}
        defaultValue={password ?? ''}
        onChangeText={setPassword}
        setRef={passwordRef}
        isRequired
        isSubmited={isSubmited}
        secureTextEntry
        errorMessage={errors.password}
        onSubmitEditing={() => !isLogin && confirmPasswordRef.current?.focus()}
      />

      {!isLogin && (
        <CustomTextInput
          placeHolder={'Confirm Password'}
          value={confirmPassword}
          defaultValue={confirmPassword ?? ''}
          onChangeText={setConfirmPassword}
          setRef={confirmPasswordRef}
          isRequired
          isSubmited={isSubmited}
          secureTextEntry
          errorMessage={errors.confirmPassword}
        />
      )}

      {isLogin && (
        <TouchableOpacity
          onPress={() => console.log('Forgot password pressed')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Text
          style={styles.link}
          onPress={() =>
            console.log(isLogin ? setIsLogin(false) : setIsLogin(true))
          }>
          {isLogin ? 'Sign up' : 'Log in'}
        </Text>
      </Text>
    </Container>
  );
};

export default memo(Login);
