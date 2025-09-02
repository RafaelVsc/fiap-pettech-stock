esse é um projeto academico, acompanhando as aulas da faculdade.
são aulas gravadas e um pouco antigas, então nem tudo que o professor faz la da certo aqui.

O professor gerou uma imagem da aplicação usando esse Dockerfile que está na raiz do projeto:

```Dockerfile
```
Porém, ele utilizou mongo ATLAS DB com string connection e salvou na imagem, o que não é uma boa prática. e 
não quero fazer, quero saber se tem como realizar essa configuração com o docker-compose que está no projeto!
A aplicação funciona na máquina localmente, usando docker-compose, .env e afins. o JWT_SECRET do env é usado na aplicação.
não quero usar o MONGO ATLAS Ok?

No exemplo o professor fez tudo isso para no final gerar o arquivo do github workflows, mas lá esta clonando a imagem do dockerhub dele 
que como mencionei está com mongoatlas string connection.
Quero manter o pnpm o professor deu como exemplo!
Analise e me ajude a realizar essa configuração para que consiga subir no github e rodar os processos, você entendeu a ideia certo?
Antes de sair escrevendo código de forma descontrolada, me explique tudo!