import React, {Component} from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAsyncDecks } from '../actions/index'
import {container, Deck} from '../utils/styles'

class DecksList extends Component{
    componentDidMount(){
        this.props.dispatch(getAsyncDecks())
    }
    deckPress=(selectedDeck)=>{
        //navigate to this deck sending this deck
        this.props.navigation.navigate('Deck Detail',{selectedDeck:selectedDeck})
    }
    render(){
        const {decks}=this.props

        return(
            <View style={container}>
                {
                (Object.keys(decks).length===0)?//first time open
                (
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.firstRunText}>No Decks created yet!</Text>
                        <Text style={styles.firstRunText}> Click on "Add Deck" Tab to add a new Deck. </Text>
                    </View>
                )
                :   <ScrollView>
                        {Object.values(decks).map((item)=>(
                            <TouchableOpacity key={item.title} style={Deck} onPress={()=>{this.deckPress(item.title)}}>
                                <Text style={{fontSize:27}}>{item.title}</Text>
                                <Text  style={{fontSize:17, color:'#fdff00'}}>{item.questions.length} cards</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
    }
            </View>
        )
    }
}
const styles=StyleSheet.create({
    firstRunText:{
        color:"white",
        fontSize:20,
        fontWeight: 'bold',
    }
})
function mapStateToProps(decks){
    return{
        decks
    }
}
export default connect(mapStateToProps)(DecksList)