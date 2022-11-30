import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';




const CalculatorScreen = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [d, setD] = useState('');
    const [input1,setInput1] = useState(1);
    const [input2,setInput2] = useState(1);
    const data = [
        { label: '+', value: '1' },
        { label: '-', value: '2' },
        { label: '*', value: '3' },
    
    ];
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "leftOperand="+input1+".0&operator="+value+"&rightOperand="+input2+".0"
    }
    const calc = async () => {
        
        try {
            await fetch(
            'https://calculator-spring-boot-app.herokuapp.com/',
            requestOptions
            )
            .then(response => { 
                setD(response);
                console.log(d);
            })
        }catch (e) {
            console.log(e);
        }
    }

      
 



    return (
        <View style={styles.container}>
          <FormInput 
                value={input1}
                placeholderText='input1'
                onChangeText={x => setInput1(x)}
                autoCapitalize='none'
                keyboardType='number'
                autoCorrect={false}
            />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
          <FormInput 
                value={input2}
                placeholderText='input2'
                onChangeText={x => setInput2(x)}
                autoCapitalize='none'
                keyboardType='number'
                autoCorrect={false}
            />
          <TouchableOpacity
        style={styles.uploadButton}
        onPress={calc}
        >
        <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        {
            d && 
            <Text style={styles.buttonText2}>Value is</Text>
        }
        </View>

    );
    
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      flex: 1,
      flexDirection: 'column'
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 20,
  
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      },
      buttonText2: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
      },
  });