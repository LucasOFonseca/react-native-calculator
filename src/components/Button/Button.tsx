import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  useColorScheme,
} from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    textAlign: 'center',
    borderWidth: 1,
  },

  operation: {
    color: '#fff',
    backgroundColor: '#fa8231',
  },

  double: {
    width: Dimensions.get('window').width / 2,
  },

  triple: {
    width: (Dimensions.get('window').width / 4) * 3,
  },
});

interface ButtonProps {
  double?: boolean;
  triple?: boolean;
  operation?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  double,
  triple,
  operation,
  onClick,
  children,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode
    ? {
        backgroundColor: '#333333',
        borderColor: '#5a5a5a',
        color: '#888',
      }
    : {
        backgroundColor: '#f0f0f0',
        borderColor: '#888',
        color: '#5a5a5a',
      };

  const [labelStyles, setLabelStyles] = useState<StyleProp<TextStyle>[]>([
    colors,
    styles.label,
  ]);

  useEffect(() => {
    if (operation) setLabelStyles(current => [...current, styles.operation]);

    if (triple) {
      setLabelStyles(current => [...current, styles.triple]);

      return;
    }

    if (double) setLabelStyles(current => [...current, styles.double]);
  }, [double, triple, operation]);

  return (
    <TouchableHighlight onPress={onClick}>
      <Text style={labelStyles}>{children}</Text>
    </TouchableHighlight>
  );
};

export default Button;
