const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Something wrong happen!')
		}
	})
	next();
})
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs')
// })
app.use(express.static(__dirname + '/public'))
 

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase()
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello To Our Site',
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page..',
		aboutMessage: 'some information about Me...'
	});
})

app.get('/bad', (req, res) => {
	res.render('bad.hbs', {
		pageTitle: 'Error Page',
		errorMessage: 'Problem happen!!',
	})
})



app.listen(3000, () => {
	console.log('Connecting to server...')
});
