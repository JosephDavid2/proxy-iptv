const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // A URL do servidor IPTV será passada como um parâmetro chamado "url"
    const targetUrl = req.query.url;

    // Se nenhuma URL for fornecida, retorna um erro
    if (!targetUrl) {
        return res.status(400).json({ error: 'A URL de destino não foi fornecida.' });
    }

    try {
        // O proxy faz a chamada para a URL insegura (http) do seu IPTV
        const response = await fetch(targetUrl);
        const data = await response.json();

        // Permite que seu site no GitHub acesse a resposta (CORS)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

        // Envia a resposta de volta para o seu site
        res.status(200).json(data);

    } catch (error) {
        // Se algo der errado, envia uma mensagem de erro
        res.status(500).json({ error: 'Falha ao buscar dados do servidor de destino.', details: error.message });
    }
};