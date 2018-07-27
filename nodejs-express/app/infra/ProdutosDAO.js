// poderia ter qualquer nome, mas pela convencao usou letra maiuscula, etc
function ProdutosDAO(connection) {
	this._connection = connection; // _ = private semantico	(vai conseguir usar fora, mas por boa pratica nao deveria)
}

ProdutosDAO.prototype.create = function(produto, callback) {
	// this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
	this._connection.query('INSERT INTO	produtos SET ?', produto, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
}

ProdutosDAO.prototype.update = function(produto, callback) {
	var params = [produto.titulo, produto.preco, produto.descricao, produto.id];
	this._connection.query('UPDATE produtos SET titulo = ?, preco = ?, descricao = ? WHERE id = ?', 
		params, callback); 
}

ProdutosDAO.prototype.remove = function(id, callback) {
	this._connection.query('DELETE FROM produtos WHERE id = ?', id, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
}

ProdutosDAO.prototype.find = function(id, callback) {
	this._connection.query('SELECT * FROM produtos WHERE id = ?', id, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
}

// quando utilizar o new esta reaproveitando os metodos ja criados (como se fosse uma classe),
// e nao adicionadno eles dinamicamente (como seria o caso se definisse isso no exports, com o this.findALl)
ProdutosDAO.prototype.findAll = function(callback) {
	this._connection.query('SELECT * FROM produtos', callback);
}

module.exports = function() {
	return ProdutosDAO;
}


/* // poderia ter qualquer nome, mas pela convencao usou letra maiuscula, etc
class ProdutosDAO {
    constructor(connection) {
        this._connection = connection; // _ = private semantico	(vai conseguir usar fora, mas por boa pratica nao deveria)
    }

    create(produto, callback) {
        // this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
        this._connection.query('INSERT INTO	produtos SET ?', produto, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
    }

    update({titulo, preco, descricao, id}, callback) {
        const params = [titulo, preco, descricao, id];
        this._connection.query('UPDATE produtos SET titulo = ?, preco = ?, descricao = ? WHERE id = ?', 
            params, callback); 
    }

    remove(id, callback) {
        this._connection.query('DELETE FROM produtos WHERE id = ?', id, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
    }

    find(id, callback) {
        this._connection.query('SELECT * FROM produtos WHERE id = ?', id, callback); // driver usa SET para definir chave=valor (compativel com produto, que eh um JSON e tem as chaves com os mesmos nomes das colunas do banco)
    }

    // quando utilizar o new esta reaproveitando os metodos ja criados (como se fosse uma classe),
    // e nao adicionadno eles dinamicamente (como seria o caso se definisse isso no exports, com o this.findALl)
    findAll(callback) {
        this._connection.query('SELECT * FROM produtos', callback);
    }
}
*/