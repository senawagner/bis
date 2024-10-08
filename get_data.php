<?php
$host = 'localhost';
$db = 'coddarco_coddar';
$user = 'coddarco_developer';
$pass = 'w[]f5wCTCh_NmPW5';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Buscar informações da empresa (uma única empresa)
    $stmt = $pdo->query("SELECT nome, cnpj, endereco, telefone, email, website FROM empresa LIMIT 1");
    $empresa = $stmt->fetch(PDO::FETCH_ASSOC);

    // Buscar clientes
    $stmt = $pdo->query("SELECT id, nome, documento, endereco, telefone, email FROM clientes");
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['empresa' => $empresa, 'clientes' => $clientes]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro: ' . $e->getMessage()]);
}
?>
