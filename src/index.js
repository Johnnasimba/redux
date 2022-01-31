import { createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const initialState = {
  loading: false,
  loaded: false,
  posts: [],
  error: null
};

const middleWare = applyMiddleware( thunk, logger );

const reducer = ( state, action) => {
  switch(action.type){
    case "LOADING": {
      state = { ...state, loading: true }
      break;
    } 
    case "LOADED": {
      state = { ...state, loaded: true, loading: false, posts: action.payload }
      break;
    }
    case "ERROR": {
      state = { ...state,  loading: false, error: action.payload }
      break;
    }
  }
  return state;
};


const store = createStore( reducer, initialState, middleWare  );

const getPostsData = (dispatch) => {
  dispatch( {
    type: "LOADING"    
  })
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    dispatch({type: 'LOADED', payload: data})
  })
  .catch(err => {
    dispatch({type: 'ERROR', err})
  })
} 

store.dispatch(getPostsData)