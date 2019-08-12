

# migrate
 npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
 npx sequelize-cli db:migrate
 npx sequelize-cli db:migrate:undo

# seed
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all

# document
https://sequelize.org/master/manual/migrations.html


# Request aliases
The following accessors and alias Request equivalents:

ctx.header
ctx.headers
ctx.method
ctx.method=
ctx.url
ctx.url=
ctx.originalUrl
ctx.origin
ctx.href
ctx.path
ctx.path=
ctx.query
ctx.query=
ctx.querystring
ctx.querystring=
ctx.host
ctx.hostname
ctx.fresh
ctx.stale
ctx.socket
ctx.protocol
ctx.secure
ctx.ip
ctx.ips
ctx.subdomains
ctx.is()
ctx.accepts()
ctx.acceptsEncodings()
ctx.acceptsCharsets()
ctx.acceptsLanguages()
ctx.get()

# Response aliases
The following accessors and alias Response equivalents:

ctx.body
ctx.body=
ctx.status
ctx.status=
ctx.message
ctx.message=
ctx.length=
ctx.length
ctx.type=
ctx.type
ctx.headerSent
ctx.redirect()
ctx.attachment()
ctx.set()
ctx.append()
ctx.remove()
ctx.lastModified=
ctx.etag=

# koa 教程
https://www.itying.com/koa/article-index-id-86.html