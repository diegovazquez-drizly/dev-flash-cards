import React, { useEffect, useRef, useReducer } from 'react';
import styles from '../styles/Card.module.css';
import Card from './card';
import cardTransition from '../helperFunctions/cardTransition';
import LoadingSpinner from './loadingSpinner/loadingSpinner';
import reducer, { actionTypes, initialState } from '../reducer/reducer';

export default function CardContainer({ category }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const parentRef = useRef();
  const childRef = useRef();

  useEffect(() => {
    dispatch({type: 'setCardData', payload: []});
    if (state.currentCategory !== category) {
      dispatch({type: actionTypes.setShowLoading, payload: true});
      setTimeout(() => dispatch({type: actionTypes.setShowLoading, payload: false}), 750);
      dispatch({type: actionTypes.setCurrentCategory, payload: category});
      fetch('/api/cards?category=' + category)
      .then(res => res.json())
      .then(data => {
        if (data.length) {
          cardTransition(parentRef, childRef, dispatch, data);
          dispatch({type: actionTypes.setCardData, payload: data});
          dispatch({type: actionTypes.setCardNumber, payload: 0});
        } 
      })
        .catch(err => console.log(err));
      }
  }, [category]);

  return (
    <div className={styles.root} ref={parentRef} id="card">
      {state.cardData.length 
        ? 
          <div className={styles.cardsContainer} ref={childRef}>
            <h1 className={styles.categoryTitle}>{category}</h1>
            <Card 
              card={state.cardData[state.cardNumber]} 
              nextQuestion={() => dispatch({type: actionTypes.setCardNumber})}
            />
          </div>
        : null
      }
      {state.showLoading 
        ? <LoadingSpinner 
            height='200px'
            fill='darkgray'
            duration='1s'
          />
        : null
      }
    </div>
    );
}