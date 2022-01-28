const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const { engine } = require('express-handlebars');
var cookieParser = require('cookie-parser');
const {checkRouterAdmin,checkBinhLuanUser} = require('./middleware/RouteMiddleware.js');
const upload = require('./middleware/uploadfileMiddleware.js');
const port = 8081;
app.use(morgan('combined'));
app.use('/src/views/img',express.static('./src/views/img'));
app.use('/src/views/public',express.static('./src/views/public'));
app.use('/src/views',express.static('./src/views'));
app.use(cookieParser());
app.use(express.urlencoded(
    { extended: true}
));
app.use(express.json());
app.use(upload);

console.log(__dirname + '/views');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(checkRouterAdmin);
app.use(checkBinhLuanUser);
require("./routes/routes.js")(app);

app.listen(port ,()=> console.log("listenning in port http://localhost:8081/ "+port));
