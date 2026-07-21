const axios = require('axios');

const sendSMS = async (message) => {
    try {
        // Örnek olarak Türkiye'de yaygın bir SMS API entegrasyon şeması
        // Kullanacağınız firmanın dökümanına göre bu objeyi güncelleyebilirsiniz.
        const smsData = {
            username: process.env.SMS_USER,
            password: process.env.SMS_PASSWORD,
            text: message,
            receivers: [process.env.OWNER_PHONE],
            header: "POLATCELIK"
        };

        // Örnek API uç noktası (Kullanacağınız firmaya göre değiştirin)
        // await axios.post('https://api.smsservisi.com/send', smsData);

        console.log(`[SMS Gönderildi] Alıcı: ${process.env.OWNER_PHONE} | Mesaj: ${message}`);
        return true;
    } catch (error) {
        console.error('SMS gönderim hatası:', error.message);
        return false;
    }
};

module.exports = { sendSMS };