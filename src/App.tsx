import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './components/Button';
import Display from './components/Display';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [clearDisplay, setClearDisplay] = useState(false);
  const [values, setValues] = useState([0, 0]);
  const [displayValue, setDisplayValue] = useState('0');
  const [current, setCurrent] = useState(0);
  const [operation, setOperation] = useState<null | string>(null);

  const addValue = (value: number | string) => {
    const needsToClearDisplay = displayValue === '0' || clearDisplay;

    if (value === '.' && !needsToClearDisplay && displayValue.includes('.')) {
      return;
    }

    const currentValue = needsToClearDisplay ? '' : displayValue;
    const updatedValue = `${currentValue}${value}`;

    setDisplayValue(updatedValue);

    if (clearDisplay) setClearDisplay(false);

    if (value !== '.') {
      const newValue = parseFloat(updatedValue);

      setValues(oldValues => {
        const newValues = [...oldValues];
        newValues[current] = newValue;

        return newValues;
      });
    }
  };

  const handleSetOperation = (value: string) => {
    if (current === 0) {
      setOperation(value);
      setCurrent(1);
      setClearDisplay(true);

      return;
    }

    const equals = value === '=';
    const result = values;

    try {
      result[0] = eval(`${result[0]} ${operation} ${result[1]}`);
    } catch {
      result[0] = values[0];
    }

    result[1] = 0;

    setDisplayValue(String(result[0]));
    setOperation(equals ? null : value);
    setCurrent(equals ? 0 : 1);
    setClearDisplay(true);
    setValues(result);
  };

  const clear = () => {
    setValues([0, 0]);
    setDisplayValue('0');
    setCurrent(0);
    setOperation(null);
    setClearDisplay(false);
  };

  return (
    <SafeAreaView style={{...backgroundStyle}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Display value={displayValue} />

      <View style={styles.buttons}>
        <Button triple onClick={clear}>
          AC
        </Button>

        <Button operation onClick={() => handleSetOperation('/')}>
          /
        </Button>

        <Button onClick={() => addValue(7)}>7</Button>
        <Button onClick={() => addValue(8)}>8</Button>
        <Button onClick={() => addValue(9)}>9</Button>

        <Button operation onClick={() => handleSetOperation('*')}>
          *
        </Button>

        <Button onClick={() => addValue(4)}>4</Button>
        <Button onClick={() => addValue(5)}>5</Button>
        <Button onClick={() => addValue(6)}>6</Button>

        <Button operation onClick={() => handleSetOperation('-')}>
          -
        </Button>

        <Button onClick={() => addValue(1)}>1</Button>
        <Button onClick={() => addValue(2)}>2</Button>
        <Button onClick={() => addValue(3)}>3</Button>

        <Button operation onClick={() => handleSetOperation('+')}>
          +
        </Button>

        <Button double onClick={() => addValue(0)}>
          0
        </Button>

        <Button onClick={() => addValue('.')}>.</Button>

        <Button operation onClick={() => handleSetOperation('=')}>
          =
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default App;
