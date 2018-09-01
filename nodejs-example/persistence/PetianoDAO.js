// "use strict" 

class PetianoDAO {

    constructor(connection) {
        this._connection = connection; 
    }

    create(petiano, callback) {
        this._connection.query('INSERT INTO	petianos SET ?', petiano, callback); 
    }

    update(id, petiano, callback) {
        this._connection.query('UPDATE petianos SET ? WHERE id_petiano = ?', [petiano, id], callback); 
    }

    remove(id, callback) {
        this._connection.query('DELETE FROM petianos WHERE id_petiano = ?', [id], callback); 
    }

    find(id, callback) {
        this._connection.query('SELECT * FROM petianos WHERE id_petiano = ?', [id], callback); 
    }

    findAll(callback) {
        this._connection.query('SELECT * FROM petianos', callback);
    }

}

module.exports = PetianoDAO;