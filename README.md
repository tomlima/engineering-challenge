# Exercício Engenharia v2

### Instalação

**O projeto foi criado com base na versão v14.16.0. do [Node.js](https://nodejs.org/)**

Instalar as dependencias e rodar o projeto em ambiente de desenvolvimento.

```sh
cd pipo
npm i
npm run dev
```

Por padrão o projeto será executado em http://localhost:3000

## Sobre o projeto

O projeto está baseado em arquivos JSON que servirão como uma base de dados para trabalharmos com os direfentes recursos utilizados durante o processo. Foi utilizado também o Nuxt.js como framework para facilitar a construção do projeto.

### Clientes

Para criar um novo cliente basta adicionarmos uma nova entrada ao objeto JSON presente em:

```sh
pipo/content/customers/customers.json
```

Cada entrada é composta pelas seguintes chaves:

```sh
{
    id: 1 #Id único do cliente - {Int} ,
    name: "Acme Co" # Nome do cliente {String},
    benefits: [2,3,4] # Id`s de todos os benefícios ofertados pelo cliente {Array}
}
```

### Benefícios

Para criar um novo benefício basta adicionarmos uma nova entrada ao ojbeto JSON presente em :

```sh
pipo/content/benefits/benefits.json
```

Cada entrada é composta pelas seguintes chaves:

```sh
{
    id: 1 # Id único do benefício - {Int} ,
    name: "Plano de Saúde NorteEuropa" # Nome do benefício {String},
    form: [
        {
            name: "Cpf" # Nome do input que será adicionado ao formulário do benefício {String},
            type: "number" # Tipo do input que será criado {String},
            validator: "cpf" # Nome da função que será utilizada para validação deste mesmo campo {String}
        }
    ]
}
```

### Validação do formulário

A validação do formuário se da através das funções passadas como valor da chave **validator** nas entradas do benefício. Essas funções estão escopadas em um objeto chamado **validationFunctions** dentro do arquivo:

```sh
pipo/plugins/validate.js
```

É possível criar outras funções validadoras dentro deste objeto conforme a necessidade.

### Observação

Sempre que houver mudanças nos arquivos JSON será necessário reiniciar o serviço da aplicação para que as mudanças sejam aplicadas.

&nbsp;
&nbsp;
&nbsp;
