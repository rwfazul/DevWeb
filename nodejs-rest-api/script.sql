DROP DATABASE IF EXISTS payfast;
CREATE DATABASE IF NOT EXISTS payfast;
USE payfast;

DROP TABLE IF EXISTS pagamentos;
CREATE TABLE IF NOT EXISTS pagamentos ( 
	id 					INT AUTO_INCREMENT, 
	forma_de_pagamento 	VARCHAR(255) NOT NULL, 
	valor 				DECIMAL(10,2) NOT NULL, 
	moeda			 	VARCHAR(3) NOT NULL, 
	status 				VARCHAR(255) NOT NULL, 
	data 				DATE, 
	descricao 			TEXT, 
	PRIMARY KEY 		(id) 
);