

# BANCO DE DADOS


$host = 'localhost';
$db = 'coddarco_life';
$user = 'coddarco_life';
$pass = 'xN.O.&KBbRz?';

DESCRIBE empresa;

id	int(11)	NO	PRI	NULL	auto_increment	
nome	varchar(255)	NO		NULL		
endereco	varchar(255)	YES		NULL		
telefone	varchar(20)	YES		NULL		
email	varchar(100)	YES		NULL		
website	varchar(100)	YES		NULL		
cnpj	varchar(18)	YES		NULL		
inscricao_estadual	varchar(20)	YES		NULL		


SELECT * FROM `empresa`

1	Coddar Digital	Rua Major S Silva, 27, Santos, SP	(13) 9 8112-9460	financeiro@coddar.com.br	www.coddar.com.br	34.889.330/0001-00	000.000.000.000	


##########################################################################################


SELECT * FROM `clientes`

1	Pessoa Jurídica	Empresa XYZ Ltda	NULL	98.765.432/0001-11	Avenida Central, 456, São Paulo, SP	(11) 88888-7777	contato@empresaxyz.com	

DESCRIBE clientes;

id	int(11)	NO	PRI	NULL	auto_increment	
tipo	enum('Pessoa Física','Pessoa Jurídica')	NO		NULL		
nome	varchar(255)	NO		NULL		
cpf	varchar(14)	YES	UNI	NULL		
cnpj	varchar(18)	YES	UNI	NULL		
endereco	varchar(255)	YES		NULL		
telefone	varchar(20)	YES		NULL		
email	varchar(100)	YES		NULL	


##########################################################################################

SELECT * FROM `propostas`

lDESCRIBE propostas;


id	int(11)	NO	PRI	NULL	auto_increment	
cliente_id	int(11)	NO	MUL	NULL		
servicos	text	NO		NULL		
sub_total	decimal(10,2)	NO		NULL		
desconto	decimal(5,2)	NO		NULL		
total	decimal(10,2)	NO		NULL		
data_criacao	timestamp	NO		current_timestamp()		


##########################################################################################
SELECT * FROM `servicos`


id	descricao	preco	categoria	
1	Desenvolvimento de Website	1500.00	Desenvolvimento de Sites	
2	Hospedagem Anual	300.00	Hospedagem	
3	Backup Mensal	100.00	Backup	
4	Desenvolvimento de Sistema Personalizado	5000.00	Desenvolvimento de Sistemas	
5	Consultoria em Tecnologia	200.00	Tecnologia	


DESCRIBE servicos;

id	int(11)	NO	PRI	NULL	auto_increment	
descricao	varchar(255)	NO		NULL		
preco	decimal(10,2)	NO		NULL		
categoria	enum('Tecnologia','Hospedagem','Desenvolvimento de Sites','Desenvolvimento de Sistemas','Backup')	NO		NULL		
