import { Module } from 'jshero-core'
import { configureStore } from 'lib'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ],
  configureStore: configureStore
})
export class RootModule {}
