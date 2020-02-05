 import React, { Component } from 'react';
import {
  StyleSheet,
  View, TextInput,
} from 'react-native';
import {
  Text,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import firebase from './config'
import Form from 'react-native-form'
import SignaturePad from 'react-native-signature-pad'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      linkSignature: "",
      isSoulSold: false
    };
   
  }

  _onLeaveMessage() {
    this._onConcact();
  }

  async _onConcact() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    var dataA = {
     linkCNI: "sss",
     linkHomePlan: "ssss",
     linkPicture: "sss",
     linkRegisterDocument: "ssss",
     linkSignature: this.state.linkSignature
    }


    if (this.state.firstName == '' || this.state.lastName == '' ) {
      alert("Veuillez remplir tous les champs")
    }
    else {
      try {
        return fetch('http://192.168.0.100:8080/api/v1/users',
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          }
        ).then((response) => response.json())
          .then((responseJson) => {

            dataA.userId = responseJson.id;
            alert(JSON.stringify(dataA))
            alert(JSON.stringify(responseJson))
            console.log('result', responseJson)
            alert("operation succefull");
            
            if ( this.state.linkSignature == '' ) {
              alert("Veuillez remplir tous les champs")

            }else {
              try {
                return fetch('http://192.168.0.100:8080/api/v1/account',
                  {
                    method: "POST",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataA)
                  }
                ).then((response) => response.json())
                  .then((responseJson) => {
        
                   // dataA.userId = responseJson.id;
                    alert(JSON.stringify(dataA))
                    alert(JSON.stringify(responseJson))
                    console.log('result', responseJson)
                    alert("operation succefull");
        
                  }
                  );
              }
              catch (errors) {
                alert("⛔Echec de creation de compte" + errors)
              }
            }

          }
          );
      }
      catch (errors) {
        alert("⛔Echec de l'envoie du message" + errors)
      }
    }

  }

  signaturePadChange(base64String) {
    this.setState({
     linkSignature : base64String
    })
    //alert(JSON.stringify(base64DataUrl))
    console.log('Base64', this.state.linkSignature.toDataURL("images/png"))
  }

  signaturePadError(error) {
    alert(JSON.stringify(error));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isSoulSold ? <View style={styles.formContainer}><Text>There is no way back...</Text></View> :
          <View style={styles.formContainer}>
            <Text style={styles.title}>
              INSCRIPTION
          </Text>
            <Text style={styles.text}>
              Mes Informations
          </Text><Text></Text><Text></Text>
            <TextInput style={styles.inputBox}
              placeholder="firtName"
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
            <TextInput style={styles.inputBox}
              placeholder="lastName"
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
            <View style={styles.linkSignature}>
              <Label style={styles.signatureLabel}>Signature</Label>
              <SignaturePad
                onError={(error) => this.signaturePadError(error)}
                onChange={(linkSignature) => this.signaturePadChange(linkSignature)}
                style={styles.signaturePad}
                onSubmitEditing={() => this.linkSignature}
              />
            </View>
            <Button Block primary onPress={this._onLeaveMessage.bind(this)} style={styles.button}><Text>SUBMIT</Text></Button>
          </View>}
      </View>
    );
  }
}




const styles = StyleSheet.create({
  inputBox: {
    width: 200,
    height: 50,
    backgroundColor: '#f0f',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  form: {
    width: '80%'
  },
  linkSignature: {
    width: '100%',
    height: 150,
  },
  signaturePad: {
    flex: 1,
    margin: 10,
    backgroundColor: '#eee',
  },
  button: {
    margin: 10
  },
  label: {
    marginLeft: 15
  },
  input: {
    marginLeft: 25
  },
  item: {
    marginTop: 10
  },
  signatureLabel: {
    marginLeft: 15, marginTop: 15
  }
}); 










/* 
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
 
import SignatureCapture from 'react-native-signature-capture';
 
class App extends Component {
  saveSign = () => {
    this.refs['sign'].saveImage();
  };
 
  resetSign = () => {
    this.refs['sign'].resetImage();
  };
 
  _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    alert('Signature Captured Successfully');
    console.log("Signature", result.encoded);
  };
 
  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.header}>
                Example to Capture Signature in React Native
              </Text>
              <SignatureCapture
                style={styles.signature}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                showNativeButtons={false}
                showTitleLabel={false}
                viewMode={'portrait'}
              />
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.saveSign();
                  }}>
                  <Text>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.resetSign();
                  }}>
                  <Text>Reset</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});
 
export default App; */