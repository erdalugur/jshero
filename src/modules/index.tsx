import { Module } from 'jshero-core'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule {}
