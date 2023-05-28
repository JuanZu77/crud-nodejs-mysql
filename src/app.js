
const express = require('express');
const app = express();

const path = require('path'); 
const morgan = require('morgan');

const mysql = require('mysql');
const myConnection = require('express-myconnection');
//Import ROUTES
const customerRoutes = require('./routes/customer');


//Setting
   app.set('port', process.env.PORT || 3000);

   //VISTAS 
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));

//MIDDLEWARES
    app.use(morgan('dev')); 
  
    //mysql
    app.use(myConnection(mysql, {
      host: 'localhost', 
      user: 'root',
      password:'0110',
      port: 3306,
      database: 'crudenodemysql'
      },'single'));

   //urlenconded: este middleware permite ENTENDER al servidor todos los datos enviados desde el FORM. En "false" no puden enviar imagenes ni datos codificados
   app.use(express.urlencoded({extended:false}));   

//ROUTES
   app.use('/', customerRoutes);

app.listen(app.get('port'), ()=>{
    console.log('Server on port 3000')
})