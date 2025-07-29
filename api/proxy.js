const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'A URL de destino não foi fornecida.' });
  }

  try {
    // Faz a chamada para o servidor de destino
    const targetResponse = await fetch(targetUrl);

    // Pega o conteúdo como texto, não importa o que seja (JSON, HTML, etc)
    const responseBody = await targetResponse.text();
    
    // Permite que seu site acesse a resposta
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Repassa o tipo de conteúdo original (seja json ou html)
    res.setHeader('Content-Type', targetResponse.headers.get('content-type') || 'text/plain');
    
    // Envia o status e o conteúdo exatamente como recebido do servidor de IPTV
    res.status(targetResponse.status).send(responseBody);

  } catch (error) {
    // Este erro agora só deve acontecer se o servidor de IPTV estiver offline
    res.status(500).json({ error: 'Falha ao conectar com o servidor de destino.', details: error.message });
  }
};
