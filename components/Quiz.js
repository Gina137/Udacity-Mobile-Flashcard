import React,{Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {container} from '../utils/styles'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'
class Quiz extends Component{
    componentDidMount(){
        // clearLocalNotification().then(setLocalNotification) //reset notification for tmrw
    }
    state={
        currentQuestion:0,
        visible:false,
        answerValue:0
    }
    toggleAnswer=()=>{
        this.setState((prev)=>({
            visible:!prev.visible
        }))
    }
    correct=()=>{
            this.setState((prev)=>({
                currentQuestion:prev.currentQuestion+1,
                visible:false,
                answerValue:prev.answerValue+1
            }))
    }

    Incorrect=()=>{
            this.setState((prev)=>({
                currentQuestion:prev.currentQuestion+1,
                visible:false,
            }))
    }

    restartQuiz=()=>{
        this.setState(()=>({
            currentQuestion:0,
            answerValue:0,
            visible:false,
        }))
    }

    render(){
        //No Cards in the Deck
        if(this.props.deck.questions.length===0){
            return (
            <View style={container}>
                <Text style={{color:'red',fontSize:20}}>Sorry!, You can't take a quiz because there are no cards in the deck. </Text>
                <TouchableOpacity style={[styles.Btn,{backgroundColor: 'white'}]} onPress={()=>{this.props.navigation.navigate('AddCard',{deckId:this.props.deck.title})}}>
                    <Text style={{color:'black',fontSize:35}}>+Add card!</Text>
                </TouchableOpacity>
            </View>
            )
        }
        //Last card then show result score
        else if(this.props.deck.questions.length>0&&this.props.deck.questions.length===this.state.currentQuestion){
            return(
                <View style={container}>
                <Text style={{fontSize: 20,color: 'yellow',margin: 10}}> Number of Cards = {this.props.deck.questions.length} </Text>
                <Text style={{fontSize: 20,color: '#23f423',margin: 10}}> Number of correct answers = {this.state.answerValue} Questions</Text>
                <Text style={{fontSize: 20,color: 'white',margin: 10, fontWeight:'bold'}}> Total Score = {Math.round((this.state.answerValue/this.props.deck.questions.length)*100)} %</Text>
                <TouchableOpacity style={[styles.Btn,{backgroundColor: 'white'}]} onPress={this.restartQuiz}>
                    <Text style={{color:'black',fontSize:35}}>Restart Quiz!</Text>
                </TouchableOpacity>
                </View>
            )
        }
        //quiz
        return(
            <View style={container}>
                <Text style={{fontSize:20,color:"yellow",fontStyle: 'italic'}}>Number of Cards = {Math.round(this.state.currentQuestion + 1 )} / {this.props.deck.questions.length}</Text>
                <Text style={styles.question}>{this.props.deck.questions[this.state.currentQuestion].question} ? </Text>
                {this.state.visible===true&&(<Text style={{color:'#23f423',fontSize:30}}>{this.props.deck.questions[this.state.currentQuestion].answer}</Text>)}
                <TouchableOpacity style={[styles.Btn,{backgroundColor: 'white'}]} onPress={this.toggleAnswer}>
                    <Text style={{color:'black',fontSize:35}}>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn,{backgroundColor: '#23f423'}]} onPress={this.correct}>
                    <Text style={{color:'black',fontSize:35}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn,{backgroundColor: 'red'}]} onPress={this.Incorrect}>
                    <Text style={{color:'black',fontSize:35}}>Incorrect</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles= StyleSheet.create({
    Btn:{
        height: 50,
        padding: 30,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    question:{
        fontSize: 50,
        color: 'white',
        padding: 10,
        paddingBottom:20,
        margin: 40,
        borderRadius: 60,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }

})
function mapStateToProps(decks,{route}){
    const {deckId} = route.params
    const deck=decks[deckId]
    return{
        deck
    }
}
export default connect(mapStateToProps)(Quiz)