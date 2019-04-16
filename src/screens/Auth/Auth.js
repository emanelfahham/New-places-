import React, {Component} from 'react';
import {View,
        Text,
        Button,
        ImageBackground, 
        StyleSheet, 
        ScrollView, 
        KeyboardAvoidingView, 
        TouchableWithoutFeedback, 
        Keyboard, 
        ActivityIndicator} 
from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';
import ButtonWithBackground from '../../components/UI/Button/Button';
import validate from '../../utility/validation';
import {connect} from 'react-redux';
import {tryAuth, authAutoSignIn} from '../../store/actions/index';

class AuthScreen extends Component{
  state = {
    authMode: 'login',
    controls :{
      email:{
        value: '',
        valid: false,
        validationRules:{
          isEmail: true
        },
        touched: false
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minlength: 6
        },
        touched: false
      },
      confirmPassword:{
        value: '',
        valid: false,
        validationRules: {
        equalTo: 'password'
      },
      touched: false
    }
  }
}
componentDidMount(){
 this.props.onAutoSignIn();
}
    switchAuthModeHandler = () => {
      this.setState(prevState => {
        return {
          authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }
      })
    }
    authHandler=()=>{
        const authData = {
          email: this.state.controls.email.value,
          password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    };

updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

    render(){
      let headingText = null;
      let confirmPasswordControl = null;
      let submitButton = (
          <ButtonWithBackground
             color='#29aaf4' 
             onPress={this.authHandler}
             disabled={!this.state.controls.confirmPassword.valid &&          !this.state.controls.password.valid || 
                       !this.state.controls.email.valid}>
                  Submit
            </ButtonWithBackground>
      )
      if(this.state.authMode === 'signup'){
        confirmPasswordControl = (
                      <DefaultInput placeholder="confirm password" 
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(val)=> this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry />
        )
      }
      if(this.props.isLoading) {
        submitButton = <ActivityIndicator />
      }
       return(
                   <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                     < ScrollView fillViewport = "true" >

          <KeyboardAvoidingView 
                style={styles.container}
                behavior='padding'>
          <MainText>
            <HeadingText> Please Log In </HeadingText>
          </MainText>  
            < ButtonWithBackground 
            color = '#29aaf4' 
            onPress={this.switchAuthModeHandler}>
            Switch to {this.state.authMode === 'login' ? 'signup' : 'login'}
            </ButtonWithBackground> 
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
            <DefaultInput placeholder="email" 
            style={styles.input} 
            value={this.state.controls.email.value}
            onChangeText={(val)=> this.updateInputState('email', val)}
            valid={this.state.controls.email.valid}
            touched={this.state.controls.email.touched}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            />

            <DefaultInput placeholder="password" 
            style={styles.input}
            value={this.state.controls.password.value}
            onChangeText={(val)=> this.updateInputState('password', val)}
            valid={this.state.controls.password.valid}
            touched={this.state.controls.password.touched}
            secureTextEntry  />
             
            {confirmPasswordControl}
            </View>
          </TouchableWithoutFeedback>
            {submitButton}
          </KeyboardAvoidingView>
                 </ScrollView>
                      </ImageBackground>

       );
    }}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer:{
    width: '80%'
  },
  input:{
    backgroundColor: '#eee',
    borderColor: "#bbb"
  },
  backgroundImage:{
    flex: 1,
    width: '100%'
  }
});

const mapStateToProps = state => {
  return{
    isLoading: state.ui.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(authAutoSignIn())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);