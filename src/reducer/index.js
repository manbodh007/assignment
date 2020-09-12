import {combineReducers} from 'redux';
import {SEARCH_QUERY,RESULT_NOT_FOUND,INSERT_DATA_SUCCESS} from '../action';
const intailState = {
    results:[],
    error:null,
    success:false,
    message:''
}

export function results(state=intailState,action){
    switch(action.type){
        case SEARCH_QUERY:
            return {
                ...state,
                results:action.data,
                error:null,
                success:false,
                clearState:true
            }
        case RESULT_NOT_FOUND:
            return {
                ...state,
                results:[],
                error:true,
                message:action.error,
                success:false,
                clearState:true
            }
        case INSERT_DATA_SUCCESS:
            return {
                ...state,
                success:true,
                clearState:true
            }
        default:
            return state
    }
}

export default combineReducers({
    results
})