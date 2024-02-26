import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 60,
  },
});

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({value}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const color = isDarkMode ? '#888' : '#f0f0f0';

  return (
    <View style={styles.display}>
      <Text style={{...styles.value, color}} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

export default Display;
