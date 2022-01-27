import { createStore, combineReducers } from "redux";

const userReducer = ( state = {id: 1}, action) => {
  switch(action.type){
    case "USER_NAME": {
      state = { ...state, name: action.payload }
      break
    } 
    case "USER_AGE": {
      state = { ...state, age: action.payload }
      break
    }
  }
  return state;
};

const jobProfileReducer = (state = {}, action) => {
  switch(action.type){
    case "JOB_DETAIL": {
      state = { ...state, job: action.payload }
      break
    } 
  }
  return state;

}
const reducers = combineReducers({
  user : userReducer,
  jobProfile : jobProfileReducer
})

const store = createStore( reducers );

store.subscribe( () => {
  console.warn('My store has changed ', store.getState());
});

function getUsername(){
  return {
    type: 'USER_NAME',
    payload: 'John'
  }
}
function getUserAge(){
  return {
    type: 'USER_AGE',
    payload: 24
  }
}

function getJobDetail () {
  return {
    type: 'JOB_DETAIL',
    payload: 'Product developer'
  }
}

store.dispatch(getUsername())
store.dispatch(getUserAge())
store.dispatch(getJobDetail())
