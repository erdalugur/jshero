import { Module } from 'jshero-decorators'
import { HomeModule } from './home'
@Module({
  providers: [
    HomeModule
  ]
})
export class RootModule {}
