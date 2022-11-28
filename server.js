const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const env = process.env.ENV_NAME || 'development';

fs.copyFileSync(
  `./build/assets/environment/${env}.json`,
  `./build/assets/environment/default.json`
);

const configs = {
  caminho: 'build', // Aqui será definido a pasta de saída onde contém o index.html e os outros arquivos.
  forcarHTTPS: false, // Defina para true se desejar que o redirecionamento para HTTPS seja forçado (é necessário certificado SSL ativo)
  port: process.env.PORT || 3030,
};

if (configs.forcarHTTPS)
  //Se o redirecionamento HTTP estiver habilitado, registra o middleware abaixo
  app.use((req, res, next) => {
    //Cria um middleware onde todas as requests passam por ele
    if ((req.headers['x-forwarded-proto'] || '').endsWith('http'))
      //Checa se o protocolo informado nos headers é HTTP
      res.redirect(`https://${req.headers.host}${req.url}`);
    //Redireciona pra HTTPS
    //Se a requisição já é HTTPS
    else next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
  });

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=86400');
  next();
});

app.use(express.static(configs.caminho)); //Serve os outros arquivos, como CSSs, Javascripts, Imagens etc.

app.get('*', (req, res) => {
  // O wildcard '*' serve para servir o mesmo index.html independente do caminho especificado pelo navegador.
  res.sendFile(path.join(__dirname, configs.caminho, 'index.html'));
});

app.listen(configs.port, () => {
  console.log(`FRONT TA ON NA PORTA ${configs.port}!`);
});
