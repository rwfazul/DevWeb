function PagamentoDAO(connection) {
	this._connection = connection;
}

PagamentoDAO.prototype.create = function(pagamento, callback) {
	this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDAO.prototype.update = function(pagamento, callback) {
	// var params = [pagamento, pagamento.id]
	// this._connection.query('UPDATE pagamentos SET ? WHERE id = ?', params, callback);
	// OR
	// connection.query("UPDATE pagamentos SET status = :status WHERE id = :id", { status: pagamento.status, id: pagamento.id});
	// OR
	var params = [pagamento.status, pagamento.id]
	this._connection.query('UPDATE pagamentos SET status = ? WHERE id = ?', params, callback);
}

PagamentoDAO.prototype.findAll = function(callback) {
	this._connection.query('SELECT * FROM pagamentos', callback);

}

PagamentoDAO.prototype.find = function(id, callback) {
	this._connection.query('SELECT * FROM pagamentos WHERE id = ?', [id], callback);
}

module.exports = function() {
    return PagamentoDAO;
};