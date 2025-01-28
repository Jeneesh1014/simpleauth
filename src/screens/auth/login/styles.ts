import {StyleSheet} from 'react-native';
import {colors} from '../../../util/constant/colors';
import {SCREEN_HEIGHT} from '../../../util/constant/responsive';

const styles = StyleSheet.create({
  container: {
    margin: 25,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  subheading: {
    fontSize: 16,
    color: colors.silverChalice,
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  forgotPassword: {
    color: colors.richBlack,
    textAlign: 'right',
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.raisinBlack,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: colors.silverChalice,
  },
  link: {
    color: colors.raisinBlack,
    fontWeight: 'bold',
  },
});

export default styles;
