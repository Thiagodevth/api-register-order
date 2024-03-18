import express from 'express';
import { v4 } from 'uuid';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());

const users = []

const chekUserId = (request, response, next) => {
    const { id } = request.params;

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "user Not Found" })
    }

    request.userIndex = index
    request.useId = id
    next()
}

// ROTA => TIPO GET
app.get('/order', (request, response) => {
    return response.json(users);
});

// ROTA => TIPO POST
app.post('/order', (request, response) => {
    const { name, order } = request.body;
    const user = { id: v4(), name, order };

    users.push(user);
    return response.status(201).json(user);
});

// ROTA => TIPO PUT
app.put('/order/:id', chekUserId, (request, response) => {
    const { name, order } = request.body
    const index = request.userIndex
    const id = request.useId

    const updatedUser = { id, name, order }

    users[index] = updatedUser
    return response.json(updatedUser)
});

app.delete('/order/:id', chekUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)

    return response.status(204).json()
});


app.listen(PORT, () => { console.log(`🚀 Serve start ${PORT}`) }); // porta 3000 / localhost-> é nossa propria maquina