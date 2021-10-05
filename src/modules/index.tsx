import { HomeModule } from './home'
import { Module } from '../core'

@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule {}
