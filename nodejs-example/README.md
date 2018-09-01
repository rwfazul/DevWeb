# nodejs-tips

## basic setup

### install Node.js and npm (Debian and Ubuntu based Linux distributions)

```bash
   $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
   $ sudo apt-get install -y nodejs
```

### install Express' application generator and nodemon (automatically restart node apps when code changes)

```bash
  $ npm install express-generator -g
  $ npm install -g nodemon
```
<!-- npm install express --save
 express --view=pug myapp 
 npm install --save consign-->

### create a project and start the server

```bash
  $ express --view=ejs myapp
  $ cd myapp
  $ npm install
  $ npm start
```

### see your application

access http://localhost:3000/

## using basis project

### clone the repo

```
  $ git clone https://github.com/rwfazul/nodejs-tips.git
  $ cd nodejs-tips/
```

### run the following script to create a database (MySQL)

```sql
DROP DATABASE IF EXISTS petnode;
CREATE DATABASE IF NOT EXISTS petnode;
USE petnode;

DROP TABLE IF EXISTS petianos;
```sql
CREATE TABLE IF NOT EXISTS petianos ( 
    id_petiano          INT AUTO_INCREMENT, 
    nome                VARCHAR(255)     NOT NULL, 
    salario             DECIMAL(10,2)    NOT NULL, 
    ts_insert           TIMESTAMP        NOT NULL DEFAULT NOW(),
    ts_last_update      TIMESTAMP        NULL     ON UPDATE NOW(),
    PRIMARY KEY         (id) 
) ENGINE=InnoDB;
```
<!-- DROP TABLE IF EXISTS tutor;
CREATE TABLE IF NOT EXISTS tutor ( 
	id 			INT AUTO_INCREMENT, 
	login	 		VARCHAR(255) NOT NULL,  
	senha			VARCHAR(255) NOT NULL, 
	PRIMARY KEY 		(id) 
); -->
```


### change database credentials

alter usr and pwd in persistence/connectionFactory.js

### run the node application with nodemon

```bash
     $ nodemon bin/www
```


### test the API with curl

file.json is in files/ directory

```bash
 insert: $ curl -X POST http://localhost:3000/petianos/ -H "Content-type: application/json" -d @path/to/file.json -v | json_pp
 update: $ curl -X PUT http://localhost:3000/petianos/1/  -H "Content-type: application/json" -d @path/to/file.json -v | json_pp
 find: $ curl -X GET http://localhost:3000/petianos/1/ -v | json_pp
 find all : $ curl -X GET http://localhost:3000/petianos/ -v | json_pp
 remove: $ curl -X DELETE http://localhost:3000/petianos/1/ -v | json_pp
```
