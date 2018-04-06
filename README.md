# ZX Ventures Back-End Challenge

## Link do vídeo apresentando a aplicação desenvolvida
- http://youtube.com.br


## Pré-requisitos:
- Docker
- Docker Compose


## Execução
 - Ambiente de Desenvolvimento

```sh
$ docker-compose -f path/para/o/projeto/docker-compose.yml up 
```

---

 - Ambiente de Produção

```sh
$ docker-compose -f path/para/o/projeto/docker-compose.deploy.yml up 
```

---

 - Ambiente de Test (Test Runner)

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