const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.conectarDB();

        this.middlewere();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewere() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.get('/', (req, res) => {
            res.json({ ok: 200 })
        })
        this.app.use('/api/user', require('../routes/user'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/rols', require('../routes/rols'));
        //this.app.use('/api/categorias', require('../routes/categorias'));
        //this.app.use('/api/productos', require('../routes/productos'));
        this.app.use('/api/buscar', require('../routes/buscar'));
        this.app.use('/api/upload', require('../routes/uploads'));
        this.app.use('/api/pacientes', require('../routes/pacientes'));
        this.app.use('/api/consultas', require('../routes/consultas'));
        this.app.use('/api/historias', require('../routes/historias'));
        this.app.use('/api/especialidades', require('../routes/especialidades'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`)
        })
    }
}


module.exports = Server;