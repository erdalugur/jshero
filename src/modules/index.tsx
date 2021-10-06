import { Module } from '../core'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule {}
