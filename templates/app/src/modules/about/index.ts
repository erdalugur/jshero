import { Module } from 'jshero-core'
import { View } from './view'
import { AboutController } from './controller'

@Module({
  controller: AboutController,
  name: 'about' as const,
  view: View,
  exact: true,
  path: '/about'
})
export class AboutModule {}