const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arbab123',
    database: 'company'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connection has been established');
});

function getEmployees(){
    return new Promise((resolve,reject)=>{
        connection.query('SELECT * FROM employee',(err,results)=>{
            if(err)
             reject(err);
           const data = results.map( (employee) => { return {username:employee.userName, email :employee.email} });
           resolve(data); 
        })
    })
}

function getEmployeeById(id){
    return new Promise((resolve,reject)=>{
        connection.query('SELECT phone FROM employee WHERE userName = ?',[id],(err,results)=>{
            if(results)
                resolve(results[0]);
            else
                reject(new Error('result not found'));
        });
    });
}


module.exports = {getEmployees,getEmployeeById};