import { createContext, useReducer } from "react"


export const ACTION_TYPES = {
    SET_LAT_LONG: " SET_LAT_LONG",
    SET_COFFEE_STORES: 'SET_COFFEE_STORE'
  
  }
  
  const storeReducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.SET_LAT_LONG: {
        return { ...state, latLong: action.payload.latLong }
      }
      case ACTION_TYPES.SET_COFFEE_STORES: {
        return { ...state, coffeeStores: action.payload.coffeeStores }
      }
      default:
        throw new Error(`unhandled action type:${action.type}`)
    }
  }

  export const StoreContext = createContext(null)
  
  
const StoreProvider = ({ children }) => {
    const initialState = {
      latLong: '',
      coffeeStores: [],
    }
    const [state, dispatch] = useReducer(storeReducer, initialState)
  
    return (
      <StoreContext.Provider value={{ state, dispatch }}>
        {children}
      </StoreContext.Provider>)
  }

export default StoreProvider;
  
// 
  