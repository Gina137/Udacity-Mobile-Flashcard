import React, {Component} from 'react';
import { Text, View } from 'react-native';
//import redux
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import middleware from './middleware';
import reducer from './reducers'
//import notifications
import { setLocalNotification } from './utils/helper';
//import nav
import Nav from './components/Nav';

const store=createStore(reducer,middleware)

export default class App extends Component {
  componentDidMount(){
     setLocalNotification()
  }
  render(){
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Nav/>
      </View>
    </Provider>
  )}
}