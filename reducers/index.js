import { GET_DECKS, DELETE_DECK, ADD_DECK, ADD_CARD } from '../actions'

export default function decks (state={}, action){
    switch(action.type){
        case GET_DECKS:
            return{
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.deck.title]:action.deck
            }
        case ADD_CARD:
            return{
                ...state,
                [action.title]:{
                    ...state[action.title],
                    questions:state[action.title].questions.concat([action.card])
                }
            }
        case DELETE_DECK:
            let decks={...state}
            decks[action.deck] = undefined
            delete decks[action.deck]
            return{
                ...decks
            }
         default:
            return state
    }
}