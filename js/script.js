document.addEventListener("DOMContentLoaded", function() {
    let servicos = []; // Array para armazenar os serviços disponíveis

    // Função para carregar conteúdo
    function carregarConteudo(secao) {
        const conteudoPrincipal = document.getElementById('conteudoPrincipal');
        conteudoPrincipal.innerHTML = ''; // Limpa o conteúdo atual

        switch(secao) {
            case 'proposta':
                carregarProposta();
                break;
            case 'clientes':
                carregarCadastroClientes();
                break;
            case 'servicos':
                carregarCadastroServicos();
                break;
            default:
                carregarProposta();
        }
    }

    // Eventos de menu
    document.getElementById('menuProposta').addEventListener('click', function(e) {
        e.preventDefault();
        carregarConteudo('proposta');
    });

    document.getElementById('menuClientes').addEventListener('click', function(e) {
        e.preventDefault();
        carregarConteudo('clientes');
    });

    document.getElementById('menuServicos').addEventListener('click', function(e) {
        e.preventDefault();
        carregarConteudo('servicos');
    });

    // Carregar proposta por padrão
    carregarConteudo('proposta');

    function carregarProposta() {
        const conteudoPrincipal = document.getElementById('conteudoPrincipal');
        conteudoPrincipal.innerHTML = `
            <h2>Nova Proposta</h2>
            <div id="empresaInfo"></div>
            <div id="clienteInfo"></div>
            <div id="servicosContainer">
                <h4>Serviços a serem faturados</h4>
                <button type="button" class="btn btn-secondary mb-3" id="addServico">Adicionar Serviço</button>
                <div id="servicosList"></div>
            </div>
            <div id="totalizacao">
                <div class="form-group">
                    <label for="subTotal">Sub-total</label>
                    <input type="text" class="form-control" id="subTotal" readonly>
                </div>
                <div class="form-group">
                    <label for="desconto">Desconto</label>
                    <select class="form-control" id="desconto">
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="total">Total</label>
                    <input type="text" class="form-control" id="total" readonly>
                </div>
            </div>
            <button type="button" class="btn btn-primary" onclick="finalizarProposta()">Finalizar Proposta</button>
        `;

        fetch('./get_data.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Erro ao buscar dados:', data.error);
                    return;
                }

                const empresaInfo = data.empresa;
                servicos = data.servicos;

                // Preencher informações da empresa
                document.getElementById('empresaInfo').innerHTML = `
                    <h3>Informações da Empresa</h3>
                    <p>Nome: ${empresaInfo.nome}</p>
                    <p>CNPJ: ${empresaInfo.cnpj}</p>
                    <p>Endereço: ${empresaInfo.endereco}</p>
                    <p>Telefone: ${empresaInfo.telefone}</p>
                    <p>Email: ${empresaInfo.email}</p>
                `;

                // Adicionar evento para adicionar serviço
                document.getElementById('addServico').addEventListener('click', adicionarLinhaServico);
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    function carregarCadastroClientes() {
        const conteudoPrincipal = document.getElementById('conteudoPrincipal');
        conteudoPrincipal.innerHTML = `
            <h2>Cadastro de Clientes</h2>
            <form id="formCadastroCliente">
                <div class="form-group">
                    <label for="clienteNome">Nome</label>
                    <input type="text" class="form-control" id="clienteNome" required>
                </div>
                <div class="form-group">
                    <label for="clienteTipo">Tipo</label>
                    <select class="form-control" id="clienteTipo" required>
                        <option value="Pessoa Física">Pessoa Física</option>
                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="clienteDocumento">CPF/CNPJ</label>
                    <input type="text" class="form-control" id="clienteDocumento" required>
                </div>
                <div class="form-group">
                    <label for="clienteEndereco">Endereço</label>
                    <input type="text" class="form-control" id="clienteEndereco" required>
                </div>
                <div class="form-group">
                    <label for="clienteTelefone">Telefone</label>
                    <input type="tel" class="form-control" id="clienteTelefone" required>
                </div>
                <div class="form-group">
                    <label for="clienteEmail">Email</label>
                    <input type="email" class="form-control" id="clienteEmail" required>
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar Cliente</button>
            </form>
        `;

        document.getElementById('formCadastroCliente').addEventListener('submit', function(e) {
            e.preventDefault();
            const clienteData = {
                nome: document.getElementById('clienteNome').value,
                tipo: document.getElementById('clienteTipo').value,
                documento: document.getElementById('clienteDocumento').value,
                endereco: document.getElementById('clienteEndereco').value,
                telefone: document.getElementById('clienteTelefone').value,
                email: document.getElementById('clienteEmail').value
            };

            fetch('./save_cliente.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cliente cadastrado com sucesso!');
                    carregarConteudo('proposta');
                } else {
                    alert('Erro ao cadastrar cliente: ' + data.message);
                }
            })
            .catch(error => console.error('Erro ao cadastrar cliente:', error));
        });
    }

    function carregarCadastroServicos() {
        const conteudoPrincipal = document.getElementById('conteudoPrincipal');
        conteudoPrincipal.innerHTML = `
            <h2>Cadastro de Serviços</h2>
            <form id="formCadastroServico">
                <div class="form-group">
                    <label for="servicoDescricao">Descrição</label>
                    <input type="text" class="form-control" id="servicoDescricao" required>
                </div>
                <div class="form-group">
                    <label for="servicoPreco">Preço</label>
                    <input type="number" step="0.01" class="form-control" id="servicoPreco" required>
                </div>
                <div class="form-group">
                    <label for="servicoCategoria">Categoria</label>
                    <input type="text" class="form-control" id="servicoCategoria" required>
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar Serviço</button>
            </form>
        `;

        document.getElementById('formCadastroServico').addEventListener('submit', function(e) {
            e.preventDefault();
            const servicoData = {
                descricao: document.getElementById('servicoDescricao').value,
                preco: document.getElementById('servicoPreco').value,
                categoria: document.getElementById('servicoCategoria').value
            };

            fetch('./save_servico.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(servicoData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Serviço cadastrado com sucesso!');
                    carregarConteudo('proposta');
                } else {
                    alert('Erro ao cadastrar serviço: ' + data.message);
                }
            })
            .catch(error => console.error('Erro ao cadastrar serviço:', error));
        });
    }

    // Adicionar dinamicamente novos campos de serviços
    document.getElementById('addServico').addEventListener('click', function() {
        adicionarLinhaServico();
    });

    function adicionarLinhaServico() {
        const servicosList = document.getElementById('servicosList');

        const newServico = document.createElement('div');
        newServico.classList.add('form-row', 'mb-3', 'servico-item');
        newServico.innerHTML = `
            <div class="col-md-4">
                <select class="form-control servicoDescricao">
                    <option value="">Selecione um serviço</option>
                    ${servicos.map(s => `<option value="${s.id}">${s.descricao}</option>`).join('')}
                </select>
            </div>
            <div class="col-md-2">
                <input type="number" class="form-control servicoQuantidade" value="1" min="1">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control servicoPreco" readonly>
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control servicoSubtotal" readonly>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-danger btn-sm removerServico">Remover</button>
            </div>
        `;

        servicosList.appendChild(newServico);

        const servicoSelect = newServico.querySelector('.servicoDescricao');
        const servicoPreco = newServico.querySelector('.servicoPreco');
        const servicoQuantidade = newServico.querySelector('.servicoQuantidade');
        const servicoSubtotal = newServico.querySelector('.servicoSubtotal');

        servicoSelect.addEventListener('change', function() {
            const servicoSelecionado = servicos.find(s => s.id == this.value);
            if (servicoSelecionado) {
                servicoPreco.value = servicoSelecionado.preco;
                atualizarSubtotalServico(newServico);
            }
        });

        servicoQuantidade.addEventListener('input', function() {
            atualizarSubtotalServico(newServico);
        });

        newServico.querySelector('.removerServico').addEventListener('click', function() {
            servicosList.removeChild(newServico);
            calcularTotal();
        });
    }

    function atualizarSubtotalServico(servicoItem) {
        const preco = parseFloat(servicoItem.querySelector('.servicoPreco').value) || 0;
        const quantidade = parseInt(servicoItem.querySelector('.servicoQuantidade').value) || 0;
        const subtotal = preco * quantidade;
        servicoItem.querySelector('.servicoSubtotal').value = subtotal.toFixed(2);
        calcularTotal();
    }

    function calcularTotal() {
        const servicosItems = document.querySelectorAll('.servico-item');
        let subTotal = 0;

        servicosItems.forEach(item => {
            subTotal += parseFloat(item.querySelector('.servicoSubtotal').value) || 0;
        });

        document.getElementById('subTotal').value = subTotal.toFixed(2);

        const desconto = parseFloat(document.getElementById('desconto').value) / 100;
        const total = subTotal * (1 - desconto);

        document.getElementById('total').value = total.toFixed(2);
    }

    // Adicionar evento para recalcular o total quando o desconto muda
    document.getElementById('desconto').addEventListener('change', calcularTotal);

    function finalizarProposta() {
        const clienteId = document.getElementById('clienteSelect').value;
        const servicos = Array.from(document.querySelectorAll('.servico-item')).map(item => ({
            id: item.querySelector('.servicoDescricao').value,
            quantidade: item.querySelector('.servicoQuantidade').value,
            preco: item.querySelector('.servicoPreco').value,
            subtotal: item.querySelector('.servicoSubtotal').value
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
            if (data.success) {
                alert('Proposta salva com sucesso!');
            } else {
                alert('Erro ao salvar proposta: ' + data.error);
            }
        })
        .catch(error => console.error('Erro ao salvar proposta:', error));
    }
});