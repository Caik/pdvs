# ZX Ventures Back-End Challenge

## Link do vídeo apresentando a aplicação desenvolvida

*   https://youtu.be/ttel8U3Xfmw

## Pré-requisitos:

*   Docker
*   Docker Compose

## Execução

*   Ambiente de Desenvolvimento

```sh
$ docker-compose -f path/para/o/projeto/docker-compose.yml up
```

Para utilizar a API:

*   http://localhost:9000

Para se conectar ao MongoDB:

*   localhost:9001

Para verificar a Documentação:

*   http://localhost:9002

---

*   Ambiente de Produção

```sh
$ docker-compose -f path/para/o/projeto/docker-compose.deploy.yml up
```

Para utilizar a API:

*   http://localhost:10000

Para se conectar ao MongoDB:

*   localhost:10001

Para verificar a Documentação:

*   http://localhost:10002

---

*   Ambiente de Test (Test Runner)

```sh
$ docker-compose -f path/para/o/projeto/docker-compose.test.yml up --abort-on-container-exit
```

---

Para parar a execução do Ambiente:

```sh
$ ctrl+c
```

ou

```sh
$ docker-compose -f path/para/o/projeto/docker-compose[.test|.deploy].yml down
```

---

Carlos Henrique Severino

caiik@live.com
