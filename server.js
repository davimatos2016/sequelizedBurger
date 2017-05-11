//NPM required packages 
var express = require('express'); 
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require("./models");
var exphbs = require('express-handlebars');
var PORT = process.env.PORT || 3000;

//Setting up express app
var app = express();

//Serve static content from the public directory
app.use(express.static(process.cwd() + '/public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Configure method-override middle-ware
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//API routes
var routes = require('./controllers/burgers_controller');
app.use('/', routes);

//Start server
db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function (){
        console.log(`Server listening on PORT: ${PORT}`);
    });
});