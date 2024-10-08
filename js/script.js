document.addEventListener("DOMContentLoaded", function() {
    fetch('./get_data.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Erro ao buscar dados:', data.error);
            return;
        }

        const clienteSelect = document.getElementById('clienteSelect');
        const empresaInfo = data.empresa;

        // Preencher informações da empresa
        document.getElementById('empresaNome').textContent = empresaInfo.nome;
        document.getElementById('empresaCNPJ').textContent = empresaInfo.cnpj;
        document.getElementById('empresaEndereco').textContent = empresaInfo.endereco;
        document.getElementById('empresaTelefone').textContent = empresaInfo.telefone;
        document.getElementById('empresaEmail').textContent = empresaInfo.email;
        // Adicionar website se necessário
        // document.getElementById('empresaWebsite').textContent = empresaInfo.website;

        // Preencher opções de clientes
        data.clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            clienteSelect.appendChild(option);
        });

        // Listener para seleção de cliente
        clienteSelect.addEventListener('change', function() {
            const cliente = data.clientes.find(c => c.id == clienteSelect.value);
            document.getElementById('clienteNome').textContent = cliente.nome;
            document.getElementById('clienteDocumento').textContent = cliente.documento;
            document.getElementById('clienteEndereco').textContent = cliente.endereco;
            document.getElementById('clienteTelefone').textContent = cliente.telefone;
            document.getElementById('clienteEmail').textContent = cliente.email;
        });

        // Carregar primeira seleção de cliente
        clienteSelect.dispatchEvent(new Event('change'));
    })
    .catch(error => console.error('Erro ao buscar dados:', error));

    // Adicionar dinamicamente novos campos de serviços
    document.getElementById('addServico').addEventListener('click', function() {
        const servicosList = document.getElementById('servicosList');

        // Criar nova linha de serviço
        const newServico = document.createElement('div');
        newServico.classList.add('form-group', 'servico-item');
        newServico.innerHTML = `
            <label for="servicoDescricao">Serviço</label>
            <select class="form-control servicoDescricao">
                <option value="1">Desenvolvimento de Website</option>
                <option value="2">Hospedagem Anual</option>
                <option value="3">Backup Mensal</option>
                <option value="4">Desenvolvimento de Sistema Personalizado</option>
                <option value="5">Consultoria em Tecnologia</option>
            </select>
            <label for="servicoQuantidade">Quantidade</label>
            <input type="number" class="form-control servicoQuantidade" value="1" min="1">
            <label for="servicoPreco">Preço Unitário</label>
            <input type="text" class="form-control servicoPreco" value="100.00">
        `;

        // Adicionar nova linha de serviço ao contêiner
        servicosList.appendChild(newServico);
    });
});

function finalizarProposta() {
    const clienteId = document.getElementById('clienteSelect').value;
    const servicos = Array.from(document.querySelectorAll('.servico-item')).map(item => ({
        descricao: item.querySelector('.servicoDescricao').value,
        quantidade: item.querySelector('.servicoQuantidade').value,
        preco: item.querySelector('.servicoPreco').value,
    }));

    const proposta = {
        clienteId,
        servicos,
        subTotal: document.getElementById('subTotal').value,
        desconto: document.getElementById('desconto').value,
        total: document.getElementById('total').value
    };

    fetch('./save_proposta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proposta)
    })
    .then(response => response.json())
    .then(data => {
        alert('Proposta salva com sucesso!');
    })
    .catch(error => console.error('Erro ao salvar proposta:', error));
}
