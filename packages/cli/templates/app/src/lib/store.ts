import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { AppState } from './types'

export function configureStore(initialValue: any, reducers: any) {
  const root = combineReducers(reducers)
  return createStore(root, initialValue, composeWithDevTools(applyMiddleware(thunk)))
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector