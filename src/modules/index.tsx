import { Module } from 'jshero-core'
import { configureStore } from '../store'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ],
  configureStore: configureStore
})
export class RootModule {}
