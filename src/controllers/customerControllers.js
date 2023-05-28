

const controller = {};

 controller.list = (req, res) => {
    //res.send('hello world')
    req.getConnection((err, conn)=>{

      //conecta con customers.ejs
      conn.query('SELECT * FROM customer', (err, customers)=>{
         if(err){
            res.json({err: err.message})
         }

         res.render('customers',{
            data: customers
         });
      });
    }); 
 };

//POST para boton submit save es representativo, porque aqui guardamos a los compradores (customer)
controller.save = (req, res)=>{
   
   req.getConnection((err, conn)=>{

      const data = req.body;

      //conecta con customers.ejs
      conn.query('INSERT INTO customer set ?', [data],(err, rowCustomer)=>{
      
         if(err){
            res.json({err: err.message})
         }

         console.log(rowCustomer)
         res.redirect('/');
      });
    }) 
};

//UPDATE
controller.edit = (req, res)=>{
   
   const {id} = req.params; 
   
   req.getConnection((err, conn)=>{

      conn.query('SELECT * FROM customer WHERE id = ?', [id],(err, customer)=>{
         
         if(err){
            res.json({err: err.message})
         }
   
         res.render('customer_edit',{
            data:customer[0]
         });
         
        }); 
   
     });
};

     //Update Data
    controller.update = (req, res)=>{
      const {id} = req.params; 
      const newCustomer = req.body; //guardamos los nuevos datos de customer

      req.getConnection((err, conn)=>{
           conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id],(err, rows)=>{

            if(err){
               res.json({err: err.message})
            }

            res.redirect('/');

           });
      });
    };

//DELETE
controller.delete = (req, res)=>{

   const {id} = req.params; //const id = req.params.id;
   
  req.getConnection((err, conn)=>{

   conn.query('DELETE FROM customer WHERE id = ?', [id],(err, rowCustomer)=>{
      
      if(err){
         res.json({err: err.message})
      }

      console.log(rowCustomer)
      res.redirect('/');
     }); 

  });
};


 module.exports = controller;