
const controller = {};

 controller.list = (req, res) => {
    //res.send('hello world')
    req.getConnection((err, conn)=>{

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

//POST 
controller.save = (req, res)=>{
   
   req.getConnection((err, conn)=>{

      const data = req.body;

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
      const newCustomer = req.body; 

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

  const {id} = req.params; 
   
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