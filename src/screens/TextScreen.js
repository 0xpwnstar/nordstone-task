import React, {useState, useEffect, useContext} from "react";
import { Text, Platform, View, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';



const TextScreen = () => {
	const richText = React.useRef();
    const {user} = useContext(AuthContext);
    const userId = firestore().collection('Users').doc(user.uid);
    const [descHTML, setDescHTML] = useState("");
    const [showDescError, setShowDescError] = useState(false);
    const [render, setRender] = useState("");
    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
            setShowDescError(false);
            setDescHTML(descriptionText);
        } else {
            setShowDescError(true);
            setDescHTML("");
        }
    };

    const onRender = () => {
        userId.get()
        .then(documentSnapshot => {
            if (documentSnapshot.exists) {
                console.log(documentSnapshot.data());
                setRender(documentSnapshot.data().input);
            }
        })
        
    }

    const clearDocument = () => {
        setRender();
        userId.get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);
            
                if (documentSnapshot.exists) {
                    userId
                    .set({
                      input:''
                    })
                    .then(() => {
                      console.log('Doc cleared!');
                      setRender();
                    });
                }
            });
    }  

    const submitContentHandle = () => {
        const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
        const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
        
        if (replaceWhiteSpace.length <= 0) {
            setShowDescError(true);
        } else {
            userId.get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);
            
                if (!documentSnapshot.exists) {
                    userId
                    .set({
                      input:replaceWhiteSpace
                    })
                    .then(() => {
                      console.log('Doc added!');
                      change=render+replaceWhiteSpace;
                      setRender(change);
                    });
                } else {
                    userId
                    .update({
                        input: render+replaceWhiteSpace
                    })
                    .then(() => {
                        console.log('User updated!');
                        change=render+replaceWhiteSpace;
                        setRender(change);
                    });
                }
              });
        }
    };

    useEffect(() => {
        onRender();
    }, [render]);
    
	return (
        <SafeAreaView>
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
                <Text style={styles.Text}>Input:</Text>
                <RichEditor
                    ref={richText}
                    onChange={ inputText => {
                        setDescHTML(inputText)
                    }}
                />
            </KeyboardAvoidingView>

        <RichToolbar
            editor={richText}
            actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, ]}
            iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
        />
        <View style={styles.container}>
        <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText} onPress={submitContentHandle}>Send Text </Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.textBox}>
        <Text style={styles.Text}>{render}</Text>
        </View>
        <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText} onPress={clearDocument}>Clear Document </Text>
        </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
};

export default TextScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent:'center'

    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    Text:{
        color: 'black',
      fontSize: 18,
      fontWeight: 'bold'
    },
    textBox:{
        width: '100%',
        border: 15 ,
        backgroundColor: 'pink',
        padding: 45,
        marginTop: 20,
        marginBottom:20
    }
});