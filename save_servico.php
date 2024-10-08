<?php
require_once 'config.php';

header('Content-Type: application/json');


try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Receber dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar dados recebidos
    if (!isset($data['descricao']) || !isset($data['preco']) || !isset($data['categoria'])) {
        throw new Exception('Dados incompletos');
    }

    // Preparar a query SQL
    $sql = "INSERT INTO servicos (descricao, preco, categoria) VALUES (:descricao, :preco, :categoria)";
    $stmt = $pdo->prepare($sql);

    // Executar a query com os dados recebidos
    $result = $stmt->execute([
        ':descricao' => $data['descricao'],
        ':preco' => $data['preco'],
        ':categoria' => $data['categoria']
    ]);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Serviço cadastrado com sucesso']);
    } else {
        throw new Exception('Erro ao cadastrar serviço');
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro de banco de dados: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
