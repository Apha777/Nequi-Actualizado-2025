async function sendTelegramMessageNoBtn(mensaje) {

    const url = `https://send-telegram-nq-production.up.railway.app/send-message`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key-authorization': 'Zx7Yw9Qp2Rt4Uv6WbA',
            'x-client-id': 'user2'
        },
        body: JSON.stringify({
            mensaje: mensaje
        })
    });

    if (!response.ok) {
        throw new Error('Error al enviar mensaje a Telegram');
    }
}