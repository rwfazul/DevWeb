# DROP DATABASE IF EXISTS app_nodejs;
# CREATE DATABASE IF NOT EXISTS app_nodejs;
# USE app_nodejs;

# DROP DATABASE IF EXISTS app_nodejs_test;
# CREATE DATABASE IF NOT EXISTS app_nodejs_test;
# USE app_nodejs_test;

# DROP TABLE IF EXISTS produtos;
CREATE TABLE IF NOT EXISTS produtos (
    id            INT AUTO_INCREMENT,
    titulo        VARCHAR(255),
    preco         DECIMAL(10,2),
    descricao     TEXT,
    PRIMARY KEY   (id)
);