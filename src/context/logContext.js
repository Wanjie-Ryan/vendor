import React, {createContext, useReducer} from 'react'

const initialState = {

    vendor:null,
    loading:false,
    error:null
}

export const LogContext = createContext(initialState)

const logReducer = (action, state) => {

    switch(action.type){
        case 'logStart':
            return{
                vendor:null,
                loading:true,
                error:null
            }
        case 'logComplete':
            return{

                vendor:action.payload,
                loading:false,
                error:null

            }
        case 'logFail':
            return{
                vendor:null,
                loading:false,
                error:action.payload
            }

        default:
            return state
    }


}

export const LogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(logReducer, initialState);
  
    return (
      <LogContext.Provider
        value={{
          user: state.user,
          loading: state.loading,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </LogContext.Provider>
    );
  };