import React, {Component} from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addAsyncDeck } from '../actions'
import {container} from '../utils/styles'
class AddDeck extends Component{
    state={
        input:'',
        empytInputMsg:''
    }
    updateInput=(input)=>{
        this.setState(()=>({
            input
        }))
    }
    addDeck=()=>{
        if(this.state.input===''){
        this.setState(()=>({
            empytInputMsg:'Please Enter a Deck title!'
        }))
        }
        else{
            this.props.dispatch(addAsyncDeck(this.state.input))
            const value=this.state.input
            this.setState(()=>({
                input:''
            }))
        //direct to this deck <DeckDetail/>
        this.props.navigation.navigate('Deck Detail',{selectedDeck:value})
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={container}>
                    {/* header */}
                <Text style={styles.text}>What is the Title of your new Deck?</Text>
                    {/* input title */}
                <TextInput
                placeholder="Deck Title..."
                value={this.state.input}
                onChangeText={this.updateInput}
                style={styles.input}
                />
                    {/* Error msg for mepyt input */}
                {(this.state.empytInputMsg)!==''&&(<Text style={styles.empytInputMsg}>{this.state.empytInputMsg}</Text>)}
                    {/* Sumbit btn */}
                <TouchableOpacity style={styles.addBtn} onPress={this.addDeck}>
                    <Text style={{fontSize:35,color:'#ffffff'}}>+Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const styles=StyleSheet.create({
    text:{
        color: '#f4ba8f',
        fontSize: 30,
        margin: 30,
        padding: 30,
    },
    input:{
        padding: 20,
        backgroundColor: '#ffffff',
        margin: 25,
        borderRadius: 30,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 30,
    },
    empytInputMsg:{
        color: 'red',
        fontSize: 20,
        margin: 3,
    },
    addBtn:{
        backgroundColor: '#f4ba8f',
        height: 50,
        padding: 30,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    }

})

export default connect()(AddDeck)