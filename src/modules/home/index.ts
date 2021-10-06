import { Module } from '../../core'
import { View } from './view'
import { Controller } from './controller'
import { reducer } from './reducer'

@Module({
  controller: Controller,
  name: 'home' as const,
  reducer: reducer,
  view: View,
  exact: true,
  path: '/'
})
export class HomeModule {}