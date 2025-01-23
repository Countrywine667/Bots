let currentIndex = 0;
let isSendingActive = true; // Para controlar se o intervalo está ativo
let intervalId;

// Supondo que 'images' e 'links' já estejam definidos e populados corretamente
// Exemplo:
// let images = ['path/to/image1.jpg', 'path/to/image2.jpg', ...];
// let links = ['http://link1.com', 'http://link2.com', ...];
// let groupId = 'id_do_grupo';

// Função para enviar a imagem e o link
function sendImageAndLink() {
    if (currentIndex < images.length && currentIndex < links.length) {
        const imagePath = images[currentIndex];
        const link = links[currentIndex];
        
        const caption = ` ${link}`;

        bot.sendPhoto(groupId, imagePath, { caption })
            .catch(err => console.error('Falha ao enviar mensagem:', err));
        
        currentIndex++;
    } else {
        clearInterval(intervalId);
        isSendingActive = false;  // Atualiza a flag quando o intervalo é limpo
    }
}

// Definindo o intervalo de envio a cada 1 hora (3600000 ms)
intervalId = setInterval(sendImageAndLink, 3600000);

// Comando /stop para parar o envio
bot.onText(/\/stop/, (msg) => {
    if (isSendingActive) {
        clearInterval(intervalId);
        isSendingActive = false;
        bot.sendMessage(msg.chat.id, 'O envio de mensagens foi parado.');
    } else {
        bot.sendMessage(msg.chat.id, 'O envio de mensagens já foi parado.');
    }
});
