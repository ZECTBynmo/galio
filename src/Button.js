import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';

const { width } = Dimensions.get('window');

const COLORS = {
  PRIMARY: '#102EFF',
  THEME: '#A833FE',
  ERROR: '#FF2664',
  WARNING: '#FF970C',
  SUCCESS: '#3DDA2B',
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
}

/*
 Props buton:
  - color: blue, purple, red, orange, green, transparent
  - onlyIcon: boolean
  - icon: name of the icon from font family, e.g.: menu
  - iconFamily: name of the icon font family, e.g.: FontAwesome
  - iconSize: size of the icon using number, e.g: 12, 21 or 42
  - size: 'small', 'large' or any number
  - children: should be changed or NOT -- IT DEPENDS ON HOW I WANT THEM TO PUT ICONS
  - radius: using borderRadius number to display rounded corners
  - loading: using ActivityIndicator - displays a circular loading indicator
  - loadingSize: size for ActivityIndicator - available options (small / large)
  - opacity: using activeOpacity on touch, values between 0.0 to 1.0, defaults to 0.8
*/

class Button extends React.Component {
  static defaultProps = {
    color: 'primary',
    size: 'large',
    disabled: false,
    radius: 0,
    uppercase: false,
    lowercase: false,
    capitalize: false,
    onlyIcon: false,
    icon: false,
    iconFamily: false,
    iconSize: 14,
    loading: false,
    loadingSize: 'small',
    opacity: 0.8,
  };

  onPress() {
    const { onPress } = this.props;
    onPress && onPress();
  }

  renderContent = () => {
    const {
      loading,
      loadingSize,
      children,
      onlyIcon,
      icon,
      iconFamily,
      iconSize,
      uppercase,
      lowercase,
      capitalize,
      textStyle,
    } = this.props;

    const textStyles = [
      styles.customText,
      textStyle
    ];

    // workaround for textTransform not supported on Expo SDK 29.0.0 or 30.0.0
    // More info: https://docs.expo.io/versions/latest/sdk/index.html#sdk-version
    // waiting for Expo SDK to support react-native 56.0.0

    let content = children;
    const isString = children && typeof children === 'string';

    if (uppercase && isString) content = children.toUpperCase();
    if (lowercase && isString) content = children.toLowerCase();
    if (capitalize && isString) content = `${children.charAt(0).toUpperCase()}${children.slice(1)}`;

    if (onlyIcon) content = <Icon name={icon} family={iconFamily} size={iconSize} />;
    else content = <Text style={textStyles}>{content}</Text>;
    
    if (loading) content = <ActivityIndicator size={loadingSize} color={COLORS.WHITE} />;

    return content;
  }

  render() {
    const {
      style,
      color,
      size,
      children,
      disabled,
      round,
      border,
      radius,
      textStyle,
      onlyIcon,
      iconSize,
      opacity,
      ...rest
    } = this.props;

    const colorStyle = styles[`${color}Color`];

    const buttonStyles = [
      styles.defaultButton,
      color && colorStyle,
      color && !colorStyle && { backgroundColor: color }, // color set & no styles for that color
      color === 'transparent' || styles.androidShadow,
      color === 'transparent' && { borderWidth: 1, borderColor: 'rgb(250,250,250)' },
      size === 'large' ? { width: width * 0.9 } : { width: width * 0.5 },
      round && { borderRadius: 24 },
      radius && { borderRadius: radius },
      onlyIcon && { width: iconSize * 2, borderWidth: 0, },
      { zIndex: 2 },
      style,
    ];

    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={opacity}
        onPress={() => this.onPress}
        style={buttonStyles}
        {...rest}>
        {this.renderContent()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultButton: {
    width: 130,
    height: 42,
    shadowColor: 'rgba(209,0,125,10)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: '800',
  },
  primaryColor: {
    backgroundColor: COLORS.PRIMARY,
  },
  themeColor: {
    backgroundColor: COLORS.THEME,
  },
  errorColor: {
    backgroundColor: COLORS.ERROR,
  },
  warningColor: {
    backgroundColor: COLORS.WARNING,
  },
  successColor: {
    backgroundColor: COLORS.SUCCESS,
  },
  transparentColor: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  androidShadow: {
    elevation: 1,
  },
});

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object),
  ]),

  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      'primary',
      'theme',
      'error',
      'warning',
      'success',
      'transparent',
    ]),
    PropTypes.string,
  ]),

  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      'large', 'small',
    ]),
    PropTypes.number,
  ]),

  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  radius: PropTypes.number,
  uppercase: PropTypes.bool,
  lowercase: PropTypes.bool,
  capitalize: PropTypes.bool,
  loading: PropTypes.bool,
  loadingSize: PropTypes.oneOf([
    'small', 'large',
  ]),
  opacity: PropTypes.number,
};

export default Button;