const mongoose = require('mongoose');

// Türkiye saatini (UTC+3) üreten yardımcı fonksiyon
const getTurkeyTime = () => {
    const date = new Date();
    // Saati Türkiye zaman dilimine (Europe/Istanbul) göre kaydırıp milisaniyeye çeviriyoruz
    const turkeyTime = new Date(date.toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
    return turkeyTime;
};

const AppointmentSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    machineType: {
        type: String,
        required: true,
        enum: ['Süt Sağım Makinesi', 'Kaan Çapa Motoru', 'İlaçlama Makinesi', 'Diğer']
    },
    date: { type: String, required: true }, // Kullanıcının seçtiği gün (Örn: "2026-07-20")
    timeSlot: { type: String, required: true }, // Kullanıcının seçtiği saat (Örn: "14:00")
    kvkkApproved: { type: Boolean, required: true },

    // Timestamps'i manuel yöneterek Türkiye saatini basıyoruz
    createdAt: { type: Date, default: getTurkeyTime },
    updatedAt: { type: Date, default: getTurkeyTime }
});

// Güncelleme (Update) işlemlerinde de updatedAt alanının Türkiye saatine göre yenilenmesini tetikliyoruz
AppointmentSchema.pre('save', function (next) {
    this.updatedAt = getTurkeyTime();
    next();
});

// Aynı gün ve aynı saatte sadece bir randevu alınabilir (Çakışma Önleyici)
AppointmentSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);