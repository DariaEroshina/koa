// подключаем библиотеки 
const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

// создаем объекты 
const app = new Koa();
const router = new KoaRouter();

const todos = ['Купить молока', 'Купить хлеба', 'Завоевать мир'];

app.use(json());
app.use(bodyParser());

render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'layout', 
	viewExt: 'html',
	cache: false,
	debug: false
});

// роутеры
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);


// функции для роутеров
async function index(ctx) {
	await ctx.render('index', {
		title: 'My favorite list',
		todos: todos
	});
}

async function showAdd(ctx) {
	await ctx.render('add');
}

async function add(ctx) {
	const body = ctx.request.body;
	todos.push(body.todo);
	ctx.redirect('/');
}

router.get('/test', ctx => ctx.body = "Test works");



app.use(router.routes()).use(router.allowedMethods());

// запускаем сервер
app.listen(3000, () => {
	console.log('Server start 3000...');
});