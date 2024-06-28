
const createSlice = require('@reduxjs/toolkit').createSlice

//entire application state made into slices and updated individually
const initialState={
    numOfCakes:10
}
/**
 * createSlice fn accepts and object
 *in object we have three proeprties (name,initialstate,reducer)
 createSlice will automatically generate action creators with the same name of  reducer we have created
 */
const cakeSlice=createSlice({
    name:'cake',
    initialState,
    /**
     * reducer is an object
     * within object we specify individual state transitions
     */
    reducers:{
        //this will going to be fn which recieves  state and action
        ordered:(state)=>{
            //in toolkit we can directly mutate the state
            //createSlice under the hood uses immer library so mutation is possible here
            state.numOfCakes--;
        },
        restocked:(state,action)=>{
            state.numOfCakes+=action.payload

        }     
    }


})
module.exports = cakeSlice.reducer //export reducer as default export

module.exports.cakeActions = cakeSlice.actions
//export actions as named export
// it effectively takes care of defining action contants,action objects,action creators and the switch statement and handling immutable state in the reducers