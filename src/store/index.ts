import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { getReducers } from '../core/utils'
import { AppState } from '../types'

const root = combineReducers(getReducers())

export function configureStore(initialValue?: any) {
  return createStore(root, initialValue, composeWithDevTools(applyMiddleware(thunk)))
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
