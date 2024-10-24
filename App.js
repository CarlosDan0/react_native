import React, { useState } from 'react';  
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';  

const App = () => {  
  const [input, setInput] = useState('');  
  const [result, setResult] = useState('');  

  const multfantasma = (expression) => {  
    const withMultiplication = expression  
      .replace(/(\d)(sin|cos|tan|ln|\()/g, '$1*$2')  
      .replace(/(\))(\d|\()/g, '$1*$2');
    return withMultiplication;  
  };  

  const evaluateExpression = (expression) => {  
    try {  
      const sanitizedInput = multfantasma(expression)  
      .replace(/sin\(([^)]+)\)/g, (match, p1) => {  
        const angle = eval(p1);  
        return `Math.sin(${angle} * Math.PI / 180)`;   
      })  
      .replace(/cos\(([^)]+)\)/g, (match, p1) => {  
        const angle = eval(p1);  
        return `Math.cos(${angle} * Math.PI / 180)`;  
      })  
      .replace(/tan\(([^)]+)\)/g, (match, p1) => {  
        const angle = eval(p1);  
        if (angle % 180 === 90) { 
          throw new Error("Tangente indefinida en " + angle + " grados.");  
        }  
        return `Math.tan(${angle} * Math.PI / 180)`;   
      })  
      .replace(/ln\(([^)]+)\)/g, (match, p1) => `Math.log(${p1})`);   
      return eval(sanitizedInput);  
    } catch {  
      return 'Math ERROR';  
    }  
  };  

  const handleButtonPress = (value) => {  
    if (value === '=') {  
      const evaluatedResult = evaluateExpression(input);  
      setResult(evaluatedResult.toString());  
    } else if (value === 'C') {  
      setInput('');  
      setResult('');  
    } else if (value === '←') {  
      setInput(input.slice(0, -1));  
    } else {  
      if (value === '0' && input.length === 0) {  
        return;  
      }
      setInput(input + value);  
    }  
  };  


  return (  
    <View style={styles.container}>  
      <View style={styles.display}>  
        <Text style={styles.inputText}>{input}</Text>  
        {result ? <Text style={styles.resultText}>{result}</Text> : null}  
      </View>  
      <View style={styles.buttonContainer}>
 
        {['ln(', 'sin(', 'cos(', 'tan('].map((func) => (  
          <TouchableOpacity key={func} style={styles.button} onPress={() => handleButtonPress(func)}>  
            <Text style={styles.buttonText}>{func.slice(0, -1)}</Text>  
          </TouchableOpacity>  
        ))}
  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('/')}>  
          <Text style={styles.buttonText}>/</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('*')}>  
          <Text style={styles.buttonText}>*</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('←')}>  
          <Text style={styles.buttonText}>DEL</Text>  
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('C')}>  
          <Text style={styles.buttonText}>AC</Text>  
        </TouchableOpacity>  

        {[7, 8, 9, '-'].map((item) => (  
          <TouchableOpacity key={item} style={styles.button} onPress={() => handleButtonPress(item.toString())}>  
            <Text style={styles.buttonText}>{item}</Text>  
          </TouchableOpacity>  
        ))}  
        
        {[4, 5, 6, '+'].map((item) => (  
          <TouchableOpacity key={item} style={styles.button} onPress={() => handleButtonPress(item.toString())}>  
            <Text style={styles.buttonText}>{item}</Text>  
          </TouchableOpacity>  
        ))}  

        {[1, 2, 3, '='].map((item) => (  
          <TouchableOpacity key={item} style={styles.button} onPress={() => handleButtonPress(item.toString())}>  
            <Text style={styles.buttonText}>{item}</Text>  
          </TouchableOpacity>  
        ))}  

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>  
          <Text style={styles.buttonText}>0</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>  
          <Text style={styles.buttonText}>.</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('(')}>  
          <Text style={styles.buttonText}>(</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(')')}>  
          <Text style={styles.buttonText}>)</Text>  
        </TouchableOpacity>    
      </View>  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    backgroundColor: 'black',  
    padding: 16,  
  },  
  display: {  
    flex: 1,  
    justifyContent: 'flex-end',  
    backgroundColor: '#333',  
    padding: 20,  
    borderRadius: 8,  
  },  
  inputText: {  
    fontSize: 32,  
    textAlign: 'right',  
    color: 'white',  
  },  
  resultText: {  
    fontSize: 24,  
    textAlign: 'right',  
    color: '#3CCBDC',  
  },  
  buttonContainer: {  
    flexDirection: 'row',  
    flexWrap: 'wrap',  
    justifyContent: 'flex-start',  
  },  
  button: {  
    width: '22%',  
    height: 70,  
    backgroundColor: 'blue',  
    justifyContent: 'center',  
    alignItems: 'center',  
    borderRadius: 8,  
    margin: 5,  
  },  
  buttonText: {  
    fontSize: 24,  
    color: 'white',  
  },  
});  

export default App;