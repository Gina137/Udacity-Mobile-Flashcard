import React,{Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {container, Deck} from '../utils/styles'
import { Ionicons, AntDesign, FontAwesome   } from '@expo/vector-icons';
import {deleteAsyncDeck} from '../actions'
class DeckDetail extends Component{
    addCard=()=>{
        //direct to add card with params deck title
        this.props.navigation.navigate('AddCard',{deckId:this.props.deck.title})
    }
    startQuiz=()=>{
        //direct to quiz with params deck title
        this.props.navigation.navigate('Quiz',{deckId:this.props.deck.title})
    }
    DeleteDeck=()=>{
        const{dispatch,deck}= this.props
        dispatch(deleteAsyncDeck(deck))
        this.props.navigation.navigate('Decks')
    }
    render(){
        console.log('coming props=',this.props)
        const{deck}=this.props
        return(
            <View style={container}>
                <View style={Deck}>
                    <Text style={{fontSize:27}}>{deck.title}</Text>
                    <Text  style={{fontSize:17, color:'#fdff00'}}>{deck.questions.length} cards</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center', margin:50, marginTop:90}}>
                    <TouchableOpacity style={[styles.Btn, {backgroundColor:'white',justifyContent:'center',alignItems:'center'}]} onPress={this.addCard}>
                        <Text style={{fontSize:30,color:'#3df23df5'}}>
                            <Ionicons name="add" size={23} color="#3df23df5" />
                             Add Card
                         </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.Btn, {backgroundColor:'white',justifyContent:'center',alignItems:'center'}]} onPress={this.startQuiz}>
                        <Text style={{fontSize:30,color:'#d8e01a'}}>
                            <FontAwesome name="hourglass-start" size={23} color="#d8e01a" />
                             start Quiz
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.Btn, {backgroundColor:'white',justifyContent:'center',alignItems:'center'}]} onPress={this.DeleteDeck}>
                        <Text style={{fontSize:30,color:'red'}}>
                            <AntDesign name="delete" size={23} color="red" />
                             Delete Deck
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles=StyleSheet.create({
    Btn:{
        height: 50,
        padding: 35,
        margin: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})

function mapStateToProps(decks,{ route}){
    const {selectedDeck}=route.params
    const deck=decks[selectedDeck]
    return{
        deck
    }
}
export default connect(mapStateToProps)(DeckDetail)