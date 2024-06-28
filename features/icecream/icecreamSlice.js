const { cakeActions } = require('../cake/cakeSlice');

const createSlice = require('@reduxjs/toolkit').createSlice

const initialState={
    numOfIce:10
}
/**
 * when cake ordered we need to gift one icecreams that means when cake ordered reduce icecream count 1
 * in toolkit reducers of slice wont listen to other action types of other slices
 * in order to achieve that we have to specigy extar reducers for  that
 */
const icecreamSlice=createSlice({
    name:'ice',
    initialState,
    reducers:{
        ordered:state=>{
            state.numOfIce--;
        },
        restocked:(state,action)=>{
            state.numOfIce+=action.payload;
        }
    },
    //Old approach, deprecated now
    // extraReducers:{
    //     ['cake/ordered']:(state)=>{
    //         state.numOfIce--;
    //     }
    // }
    extraReducers:(builder)=>{
        //receives an arg we named it as builder
        /**
         * first arg is the action type we needed
         * second is a function which takes state and action
         */
        builder.addCase(cakeActions.ordered,(state,action)=>{
            //note: we can only modify the state of own slice
           state.numOfIce--; 
        })
    }
})


module.exports = icecreamSlice.reducer

module.exports.icecreamActions=icecreamSlice.actions
