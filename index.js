const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usersRouter = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const questionRouter = require('./routes/question.routes');
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongodb connected successfully');
}).catch(err => console.log(err));

const v1Router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', v1Router);
app.get('/', (req, res) => {
  res.send('Server working!');
});


v1Router.use('/user', usersRouter);
v1Router.use('/category', categoryRouter);
v1Router.use('/question', questionRouter);

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})