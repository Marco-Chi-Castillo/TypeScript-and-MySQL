"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.cnn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            port: 3307,
            database: "node_db",
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this()); //new MySQL()
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error Query", err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("El registro solicitado no existe");
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log("Base de datos Conectado");
        });
    }
}
exports.default = MySQL;