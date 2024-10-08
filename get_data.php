<?php
require_once 'config.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

    // Buscar informações da empresa
    $stmt = $pdo->query("SELECT id, nome, endereco, telefone, email, website, cnpj, inscricao_estadual FROM empresa LIMIT 1");
    $empresa = $stmt->fetch();

    // Buscar clientes
    $stmt = $pdo->query("SELECT id, tipo, nome, cpf, cnpj, endereco, telefone, email FROM clientes");
    $clientes = $stmt->fetchAll();

    // Buscar serviços
    $stmt = $pdo->query("SELECT id, descricao, preco, categoria FROM servicos");
    $servicos = $stmt->fetchAll();

    echo json_encode([
        'empresa' => $empresa,
        'clientes' => $clientes,
        'servicos' => $servicos
    ]);

} catch (PDOException $e) {
    error_log('Erro de banco de dados: ' . $e->getMessage());
    echo json_encode([
        'error' => 'Erro ao acessar o banco de dados. Por favor, contate o administrador.',
        'debug_info' => [
            'message' => $e->getMessage(),
            'code' => $e->getCode()
        ]
    ]);
    exit;
}
?>
