export const actionTypes = {
  setCardData: 'setCardData',
  setCardNumber: 'setCardNumber',
  setCurrentCategory: 'setCurrentCategory',
  setShowLoading: 'setShowLoading'
}

export const initialState = {
  cardData: [],
  cardNumber: 0,
  currentCategory: '',
  showLoading: false
}

export default function reducer(state, action) {
  switch(action.type) {
    case actionTypes.setCardData:
      return {
        ...state,
        cardData: action.payload
      }
    case actionTypes.setCardNumber:
      if (action.payload === 0) {
        return {
          ...state,
          cardNumber: 0
        }
      } 
      let newCardNumber;
      if (state.cardNumber === state.cardData.length - 1) newCardNumber = 0;
      else newCardNumber = state.cardNumber + 1;
      return {
        ...state,
        cardNumber: newCardNumber
      } 
    case actionTypes.setCurrentCategory:
      return {
        ...state,
        currentCategory: action.payload
      }
    case actionTypes.setShowLoading:
      return {
        ...state,
        showLoading: action.payload
      }
    default:
      return state;
    }
}