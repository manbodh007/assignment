export const INSERT_QUESTION = 'INSERT_QUESTION';
export const SEARCH_QUERY = 'SEARCH_QUERY';                  // action type for query search
export const RESULT_NOT_FOUND = 'RESULT_NOT_FOUND';          // if result not found
export const INSERT_DATA_SUCCESS = 'INSERT_DATA_SUCCESS'     // action type for data insert is success
// export const CLEAR_STATE = 'CLEAR_STATE'                     // clear state after data inserted
 

const rootUrl = 'http://localhost:8000';                     // api home route

// convert form data into url from
function getformBody(params){
    let formBody = []

    for(let property in params){
        let encodedKey = encodeURIComponent(property); 
        let encodedValue = encodeURIComponent(params[property]);

        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&')
}

// api call for insert query into database

export function insertQuestion(data){
    console.log('form data',data);
    return(dispatch)=>{
        let url  = `${rootUrl}/insert/question`;
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body:getformBody(data)
        })
        .then(response =>response.json())
        .then(data=>{
            console.log('inserted data',data);
            if(data.success){
               dispatch(insertDataSuccess())   //  dispatching result into store
            }else{
                dispatch(resultNotFound(data.message))
            }
        })
    }
}
export function fetchQueryResult(keyword){
    return (dispatch)=>{
       let url = `${rootUrl}/search/question?keyword=${keyword}`;
       fetch(url)
       .then(response =>response.json())
        .then(data=>{
            console.log('search data',data);
            if(data.success)
               dispatch(searchResult(data.result));
            else{
               dispatch(resultNotFound(data.message));
            }
        })
    }
}

export function searchResult(data){
    return {
        type:SEARCH_QUERY,
        data,
    }
}
export function resultNotFound(error){
    return {
        type:RESULT_NOT_FOUND,
        error
    }
}
export function insertDataSuccess(){
   return{
    type:INSERT_DATA_SUCCESS,
   }
}

// export function clearState(){
//     return {
//         type:CLEAR_STATE,
//     }
// }