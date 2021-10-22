import AsyncStorage from '@react-native-community/async-storage'
export const GET_DECKS="GET_DECKS"
export const DELETE_DECK="DELETE_DECK"
export const ADD_DECK="ADD_DECK"
export const ADD_CARD="ADD_CARD"

//storage key
const DECKS_KEY="flashcards:decks"

//action creators
export function getDecks(decks){
    return{
        type:GET_DECKS,
        decks
    }
}

export function addDeck(deck){
    return{
        type:ADD_DECK,
        deck
    }
}

export function addCard(title,card){
    return{
        type:ADD_CARD,
        title,
        card
    }
}

export function deleteDeck(deck){
    return{
        type:DELETE_DECK,
        deck
    }
}

//async storage

//get all decks from storage
export function getAsyncDecks(){
    return (dispatch)=>{
        return AsyncStorage.getItem(DECKS_KEY)
                .then((result)=>{
                    const decks=JSON.parse(result)
                    dispatch(getDecks(decks))
                })
    }
}

//need to be added to the array of questions[] in speciic title
export function addAsyncCard(title,card){
    return (dispatch)=>{
        dispatch(addCard(title,card))
        return AsyncStorage.getItem(DECKS_KEY)
        .then((result)=>{
            const data=JSON.parse(result)
            data[title].questions.push(card)
            AsyncStorage.setItem(DECKS_KEY,JSON.stringify(data))
        })
    }
}

// ezay afhmo en 4akl el deck ele hydfha de 3bara 3n title w obj gwah title w array of questions ele hwa el cards 3n tre2 var b7ot fe el obj bta3e w a5zn gwa title el obj da ana wbb3to f el async
//how to inform it that the deck which will be added is a title as a key and obj as its value inside this obj the same title name which in the key and array of questions[card1,card2,...]??? declair a var={title:comingtitle , questions:[]} then send it in the async as an obj of title key and the var obj we made  
export function addAsyncDeck(title){
    return (dispatch)=>{
        const newDeck= {
            title:title,
            questions:[]
        }
        dispatch(addDeck(newDeck))
        return AsyncStorage.setItem(DECKS_KEY,JSON.stringify({[newDeck.title]:newDeck}))
    }
}

export function deleteAsyncDeck(deck){
    return (dispatch)=>{
        dispatch(deleteDeck(deck.title))
        return AsyncStorage.getItem(DECKS_KEY)
                .then((result)=>{
                    const data=JSON.parse(result)
                    data[deck.title]=undefined
                    delete data[deck.title]
                    AsyncStorage.setItem(DECKS_KEY,JSON.stringify(data))
                })
    }
}
