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
#
## Modül oluşturmak
```
jshero -m mymodule
```
#
## Modülü RootModule dahil etmek

```javascript
import { Module } from '../core'
import { MyModule } from './mymodule'

@Module({
  providers: [
    MyModule
  ]
})
export class RootModule {}
```

Not: Oluşturulan moduller uygulamada kullanıma açılması için RootModule kaydedilmelidir 
ve sonrasında npm build komutu çalıştırılmalıdır.
Yapılan bu işlemden sonra;

kullanıcının görebileceği server side render edilmiş sayfa;
> http://localhost:5000/mymodule

api isteklerinde kullanılabilecek
> http://localhost:5000/api/mymodule

rotalar oluşur.

#
