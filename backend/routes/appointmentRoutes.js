const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { sendSMS } = require('../services/smsService');

// 1. Seçilen tarihteki dolu saatleri getir
router.get('/busy-slots', async (req, res) => {
    const { date } = req.query; // YYYY-MM-DD
    try {
        const appointments = await Appointment.find({ date }).select('timeSlot -_id');
        const busySlots = appointments.map(app => app.timeSlot);
        res.json(busySlots);
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// 2. Yeni Randevu Oluştur
router.post('/book', async (req, res) => {
    const { customerName, customerPhone, machineType, date, timeSlot, kvkkApproved } = req.body;

    if (!kvkkApproved) {
        return res.status(400).json({ message: 'KVKK onaylanmalıdır.' });
    }

    // Çalışma saatleri dışı kontrol (09:00 - 18:00)
    const hour = parseInt(timeSlot.split(':')[0]);
    if (hour < 9 || hour >= 18) {
        return res.status(400).json({ message: 'Çalışma saatleri dışı randevu alınamaz (09:00 - 18:00).' });
    }

    try {
        const newAppointment = new Appointment({
            customerName,
            customerPhone,
            machineType,
            date,
            timeSlot,
            kvkkApproved
        });

        await newAppointment.save();

        // Size (İşletme Sahibine) gidecek SMS içeriği
        const smsMessage = `POLATCELIK: Yeni Randevu! Müşteri: ${customerName}, Tel: ${customerPhone}, Cihaz: ${machineType}, Tarih: ${date}, Saat: ${timeSlot}`;
        await sendSMS(smsMessage);

        res.status(201).json({ message: 'Randevunuz başarıyla oluşturuldu, işletmeye bilgi iletildi.' });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Seçtiğiniz saatte başka bir randevu bulunmaktadır. Lütfen başka bir saat seçin.' });
        }
        res.status(500).json({ message: 'Randevu kaydedilirken bir hata oluştu.' });
    }
});

module.exports = router;