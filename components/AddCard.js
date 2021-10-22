import React,{Component} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {container} from '../utils/styles'
import { addAsyncCard } from '../actions'
class AddCard extends Component{
    state={
        question:'',
        answer:'',
        errorMsg:''
    }
    updateQuestion=(question)=>{
        this.setState(()=>({
            question
        }))
    }

    updateAnswer=(answer)=>{
        this.setState(()=>({
            answer
        }))
    }

    addCard=()=>{
        if(this.state.question&&this.state.answer!==''){
        this.props.dispatch(addAsyncCard(this.props.route.params.deckId,{
            question:this.state.question,
            answer:this.state.answer
        }))
        this.props.navigation.navigate('Decks')
    }
        else{
            this.setState(()=>({
            errorMsg:'please fill in the inputs'
        }))
        }
    }
    render(){
        return(
            <View style={container}>
                {/* Question */}
                <TextInput
                placeholder="Enter Your Question..."
                value={this.state.question}
                onChangeText={this.updateQuestion}
                style={styles.input}
                />
                {/* Answer */}
                <TextInput
                placeholder="Enter Your Answer..."
                value={this.state.answer}
                onChangeText={this.updateAnswer}
                style={styles.input}
                />
                {(this.state.errorMsg)!==''&&(<Text style={styles.empytInputMsg}>{this.state.errorMsg}</Text>)}
                {/* Add Card Btn */}
                <TouchableOpacity style={styles.addBtn} onPress={this.addCard}>
                    <Text style={{fontSize:35,color:'#ffffff'}}>+Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    input:{
        padding: 20,
        backgroundColor: '#ffffff',
        margin: 25,
        borderRadius: 30,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 30,
    },
    addBtn:{
        backgroundColor: '#f4ba8f',
        height: 50,
        padding: 30,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    empytInputMsg:{
        color: 'red',
        fontSize: 20,
        margin: 3,
    },
})
export default connect()(AddCard)