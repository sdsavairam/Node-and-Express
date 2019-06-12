const express = require('express'); //expressjs.com/api
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.send('Hey There!!! Please use http://localhost:3000/api/courses and perform GET/POST/PUT/DELETE operations.');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course id not found');
    return res.send(course);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad request
        return res.status(400).send('Please enter valid Course Name (min length : 3)');
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('course id not found');

    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Please enter valid Course Name (min length : 3)');
    course.name = req.body.name;
    return res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course id not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ..`));

