import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { AppState } from './types'
import { reducer as home } from 'modules/home/reducer'

const root = combineReducers({
  home
})

export function configureStore(initialValue: any) {
  return createStore(root, initialValue, composeWithDevTools(applyMiddleware(thunk)))
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector