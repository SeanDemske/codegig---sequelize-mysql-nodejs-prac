const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Test db
db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err => console.log(err))

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { layout: 'landing' });
});

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));