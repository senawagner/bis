<?php
require_once 'config.php';

header('Content-Type: application/json');


try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Receber dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar dados recebidos
    if (!isset($data['nome']) || !isset($data['tipo']) || !isset($data['endereco']) || !isset($data['telefone']) || !isset($data['email'])) {
        throw new Exception('Dados incompletos');
    }

    // Preparar a query SQL
    $sql = "INSERT INTO clientes (tipo, nome, cpf, cnpj, endereco, telefone, email) VALUES (:tipo, :nome, :cpf, :cnpj, :endereco, :telefone, :email)";
    $stmt = $pdo->prepare($sql);

    // Executar a query com os dados recebidos
    $result = $stmt->execute([
        ':tipo' => $data['tipo'],
        ':nome' => $data['nome'],
        ':cpf' => $data['tipo'] === 'Pessoa Física' ? $data['documento'] : null,
        ':cnpj' => $data['tipo'] === 'Pessoa Jurídica' ? $data['documento'] : null,
        ':endereco' => $data['endereco'],
        ':telefone' => $data['telefone'],
        ':email' => $data['email']
    ]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Cliente cadastrado com sucesso']);
    } else {
        throw new Exception('Erro ao cadastrar cliente');
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro de banco de dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
