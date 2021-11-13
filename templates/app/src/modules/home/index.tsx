import { Module } from 'jshero-core'
import { View } from './view'
import { HomeController } from './controller'

@Module({
  controller: HomeController,
  name: 'home' as const,
  view: View,
  exact: true,
  path: '/'
})
export class HomeModule {}