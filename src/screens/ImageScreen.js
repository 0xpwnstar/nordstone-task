import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Image
} from 'react-native';
import {launchCamera, launchImageLibrary}  from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import { AuthContext } from '../navigation/AuthProvider';

var images=[];


export default function UploadScreen() {
    const {user} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [url, setUrl] = useState([]);

    const uploadImage = async () => {
        const { uri } = image;
        const filename = user.uid+"/images/"+uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
          .ref(filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        });
        try {
          await task;
        } catch (e) {
          console.error(e);
          listImages();
        }
        setUploading(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
    };

    const selectImage  = ( ) => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }
        launchCamera(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.assets[0].uri};
              console.log(source);
              setImage(source);
            }
        });
    }
    const selectImageFromGallery  = ( ) => {
      const options = {
          title: 'Select Avatar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
      }
      launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.assets[0].uri};
            console.log(source);
            setImage(source);
          }
      });

    }

    function listFilesAndDirectories(reference, pageToken) {
      return reference.list({ pageToken }).then(result => {
        // Loop over each item
        result.items.forEach(ref => {
          genUrl(ref.fullPath)
        });
    
        if (result.nextPageToken) {
          return listFilesAndDirectories(reference, result.nextPageToken);
        }
    
        return Promise.resolve();
      });
    }

    const genUrl =  async (path) => {
      const url = await storage().ref(path).getDownloadURL();
      console.log(url);
      images.push(url);
    }

    const listImages = () => {
      const reference = storage().ref(user.uid+'/images/');
      
      listFilesAndDirectories(reference).then(() => {
        setUrl(images)
        images=[]
      });
    }

    useEffect(() => {
      listImages();
    }, []);


    return (
      <ScrollView style={styles.imageContainer} >
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Capture an image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectButton} onPress={selectImageFromGallery}>
        <Text style={styles.buttonText}>Select an image</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{ uri: image.uri }} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
        )}
      </View>
          <TouchableOpacity style={styles.uploadButton} onPress={listImages}>
            <Text style={styles.buttonText}>Show my images</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
          {
            url.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.imageBox} />
            ))

          }
          </View>
      </View>
    </ScrollView>
    );
}




const styles = StyleSheet.create({
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 40,
      backgroundColor: '#ecf0f1',
    },
    container: {
      flex: 1,
      backgroundColor: '#bbded6',
      padding: 26,
    },
    buttonContainer: {  
      flexDirection: "row",
    },
    selectButton: {
      borderRadius: 5,
      width: 100,
      height: 50,
      backgroundColor: '#8ac6d1',
      justifyContent: 'center',
      margin: 20
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 0,
      marginBottom: 0,

    },
    progressBarContainer: {
      marginTop: 20,
      width: '100%',
    },
    imageBox: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
      marginTop: 50
    }
});