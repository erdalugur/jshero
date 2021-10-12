import { Module } from 'jshero-core'
import { View } from './view'
import { HomeController } from './controller'
import { reducer } from './reducer'

@Module({
  controller: HomeController,
  name: 'home' as const,
  reducer: reducer,
  view: View,
  exact: true,
  path: '/'
})
export class HomeModule {}