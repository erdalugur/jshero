# JSHERO Nedir?

React.js ile seo dostu(ssr) uygulamalar geliştirmek framework kullanmadan zor olabiliyor. 
Bu proje karmaşık webpack configurasyonlarından sizi kurtardığı gibi Typescript ile geliştirme yapmanıza, 
MVC mimarisinde moduller oluşturmanıza ve aynı zamanda Express server'ı genişletmenize olanak sağlar.

#
# JSHERO CLI
### Global kurulum
```
npm install --global jshero-cli
```
#
## Proje oluşturmak
```
jshero -i my-project

cd my-project
```
## Projeyi Başlatmak
```
npm run start
```
#
## Projeyi Build Etmek
```
npm run build
```
#
## Modül oluşturmak
```
jshero -m mymodule 
```
#
Yeni bir modul aşağıdaki dosyalar ile birlikte oluşur.
- Model.ts
- View.tsx
- Controller.ts
- Style.ts
- Reducer.ts
- Index.ts

> Not: Oluşturulan modul uygulamada kullanıma açılması için RootModule kaydedilmelidir 
ve sonrasında **npm build** komutu çalıştırılmalıdır.
## Modülü RootModule dahil etmek

```javascript
import { Module } from '../core'
import { configureStore } from '../store'
import { MyModule } from './mymodule'


@Module({
  providers: [
    MyModule
  ],
  configureStore: configureStore
})
export class RootModule {}
```
Yapılan bu işlemden sonra;

kullanıcının görebileceği server side render edilen sayfa;
> http://localhost:5000/mymodule

api isteklerinde kullanılabilecek
> http://localhost:5000/api/mymodule

şeklinde rotalar aktif olur.
#


