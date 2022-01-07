const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const KoaBodyParser = require('koa-bodyparser')
const KoaViews = require('koa-views')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const router = new KoaRouter()

// static
app.use(KoaStatic(path.join(__dirname, './static')))

// bodyParser
app.use(KoaBodyParser())

// views
app.use(
  KoaViews(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

// utils
app.use(async (ctx, next) => {
  ctx.util = {
    logger: require('./utils/log'),
    mysql: require('./utils/mysql')
  }
  await next()
})

// index
app.use(async (ctx, next) => {
  if (ctx.request.path === '/') await ctx.render('index', { message: 'index' })
  await next()
})

// router
const routes = fs.readdirSync(path.join(__dirname, '/routes'))
routes.forEach(element => {
  const module = require(path.join(__dirname, '/routes/' + element))
  router.use('/' + element.replace('.js', ''), module.routes(), module.allowedMethods())
})
app.use(router.routes())

app.listen(3000, () => {
  console.log('run at http://localhost:3000')
})
