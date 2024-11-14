var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
const sequelize = require('./database/database');
const Clientes = require('./models/Clientes');
const Mascotas = require('./models/Mascotas');
const Medicamentos = require('./models/Medicamentos');
const Servicios = require('./models/Servicios');
const Tratamientos = require('./models/Tratamientos');
const Ventas = require('./models/Ventas');
const Detalle_Ventas = require('./models/Detalle_Ventas');
const Productos = require('./models/Productos');
const Usuarios = require('./models/Usuarios');
const Mascotas_Medicamentos = require('./models/Mascotas_Medicamentos');
const Mascotas_Caracteristicas = require('./models/Mascotas_Caracteristicas');
const Mascotas_Servicios = require('./models/Mascotas_Servicios');
const Clientes_Servicios = require('./models/Clientes_Servicios');
const Caracteristicas = require('./models/Caracteristicas');
const Refuerzos = require('./models/Refuerzos');
require('./models/associations');
const cors = require('cors');  
var app = express();

app.use(cors()); 
app.use('/api', indexRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", indexRouter);
app.get("*", (req, res) => {
  res.sendFile("client/index.html", { root: global });
});

// Sincronizar la base de datos
sequelize.sync({ force: true })  // Cambia `force: true` solo para pruebas (elimina las tablas existentes)
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
