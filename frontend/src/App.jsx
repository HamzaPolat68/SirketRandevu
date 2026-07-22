import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KVKKModal from './components/KVKKModal.jsx';
import {
  User,
  Phone,
  Wrench,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Stamp
} from './Icons.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const COLORS = {
  charcoal: '#1D2422',
  charcoalLight: '#2B3532',
  steel: '#5B6660',
  paper: '#F5F1E7',
  paperDark: '#EAE3D3',
  rust: '#B5480F',
  amber: '#E0A324',
  line: '#D8D0BC'
};

export default function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    machineType: 'Süt Sağım Makinesi',
    date: '',
    timeSlot: '',
    kvkkApproved: false
  });

  const [busySlots, setBusySlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [ticketNo] = useState(() =>
    String(Math.floor(1000 + Math.random() * 9000))
  );

  const availableHours = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  useEffect(() => {
    if (formData.date) {
      axios
        .get(`${API_URL}/busy-slots?date=${formData.date}`)
        .then((res) => setBusySlots(res.data))
        .catch(() => console.error('Dolu saatler alınamadı.'));
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'customerPhone') {
      const cleanValue = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const phone = formData.customerPhone;

    // Sadece rakam kontrolü
    if (!/^\d+$/.test(phone)) {
      setMessage({
        type: 'error',
        text: 'Telefon numarası sadece rakamlardan oluşmalıdır.'
      });
      return;
    }

    // 0 ile başlıyorsa 11 hane olmalı
    if (phone.startsWith('0')) {
      if (phone.length !== 11) {
        setMessage({
          type: 'error',
          text: '0 ile başlayan telefon numarası 11 haneli olmalıdır. Örn: 05321234567'
        });
        return;
      }
    }
    // 0 ile başlamıyorsa 10 hane olmalı
    else {
      if (phone.length !== 10) {
        setMessage({
          type: 'error',
          text: '0 olmadan girilen telefon numarası 10 haneli olmalıdır. Örn: 5321234567'
        });
        return;
      }
    }

    if (!formData.kvkkApproved) {
      setMessage({
        type: 'error',
        text: '❌❌❌ LÜTFEN KVKK METNİNİ ONAYLAYIN ❌❌❌'
      });
      return;
    }

    if (!formData.timeSlot) {
      setMessage({
        type: 'error',
        text: 'Lütfen bir randevu saati seçin.'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/book`, formData);

      setMessage({
        type: 'success',
        text: response.data.message
      });

      setFormData({
        customerName: '',
        customerPhone: '',
        machineType: 'Süt Sağım Makinesi',
        date: '',
        timeSlot: '',
        kvkkApproved: false
      });

      setBusySlots([]);
    } catch (error) {
      setMessage({
        type: 'error',
        text:
          error.response?.data?.message ||
          'Bir hata oluştu, lütfen tekrar deneyin.'
      });
    }
  };

  const oswald = { fontFamily: "'Oswald', sans-serif" };
  const mono = { fontFamily: "'IBM Plex Mono', monospace" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
      `}</style>

      <div
        className='min-h-screen w-full flex items-center justify-center py-6 sm:py-10 lg:py-14 px-2 sm:px-4'
        style={{
          fontFamily: "'Inter', sans-serif",
          backgroundColor: COLORS.steel,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 2px, transparent 2px, transparent 14px)'
        }}
      >
        <div className='w-full max-w-7xl relative'>
          {/* Servis etiketi */}
          <div className='absolute -top-8 right-8 z-20 -rotate-6 hidden lg:flex flex-col items-center'>
            <div
              className='w-px h-6'
              style={{ backgroundColor: '#3a3f3c' }}
            />

            <div
              className='w-4 h-4 rounded-full border-2 -mb-2 z-10'
              style={{
                backgroundColor: COLORS.paper,
                borderColor: COLORS.charcoal
              }}
            />

            <div
              className='px-5 py-3 rounded-lg shadow-xl border-2 flex items-center gap-2'
              style={{
                backgroundColor: COLORS.amber,
                borderColor: COLORS.charcoal
              }}
            >
              <Stamp size={18} color={COLORS.charcoal} />

              <span
                className='text-sm font-black tracking-wider'
                style={{ ...mono, color: COLORS.charcoal }}
              >

              </span>
            </div>
          </div>

          {/* Ana kart */}
          <div
            className='w-full rounded-[2rem] shadow-2xl overflow-hidden border-2'
            style={{
              backgroundColor: COLORS.paper,
              borderColor: COLORS.charcoal
            }}
          >
            {/* ÜST BAŞLIK */}
            <div
              className='relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20'
              style={{ backgroundColor: 'white' }}
            >
              {/* Perçinler */}
              <span className='absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-500 opacity-70' />
              <span className='absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-500 opacity-70' />
              <span className='absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-500 opacity-70' />
              <span className='absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-500 opacity-70' />

              <div className='flex flex-col items-center justify-center gap-4'>
                <div
                  className='p-4 rounded-full border-2'
                  style={{
                    borderColor: COLORS.amber,
                    backgroundColor: 'rgba(247, 241, 241, 0.08)'
                  }}
                >
                  <Wrench size={40} color={COLORS.amber} />
                </div>

                <h1
                  className='text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-[0.08em] uppercase text-center leading-none drop-shadow-lg'
                  style={oswald}
                >
                  POLATÇELİK L.T.D Ş.T.İ
                </h1>

                {/* SLOGAN */}
                <p
                  className='text-center text-sm sm:text-base lg:text-lg font-semibold italic tracking-[0.15em] mt-2 mb-4'
                  style={{ color: '#030303' }}
                >
                  KALİTENİN VE GÜVENİN ADRESİ
                </p>

                <div
                  className='h-1 w-40 rounded-full'
                  style={{ backgroundColor: 'white' }}
                />

                <p
                  className='text-center text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.2em] mt-4'
                  style={{ ...mono, color: COLORS.amber }}
                >
                  TEKNİK SERVİS • RANDEVU KAYIT FORMU
                </p>
              </div>
            </div>

            {/* Kesikli ayırıcı */}
            <div
              className='border-t-2 border-dashed'
              style={{ borderColor: COLORS.amber }}
            />

            {/* FORM */}
            <form
              className='space-y-8 px-6 py-8 sm:px-12 lg:px-16 lg:py-12'
              onSubmit={handleSubmit}
            >
              {message.text && (
                <div
                  className={`flex items-start gap-3 p-5 rounded-2xl text-sm font-bold border-2 ${message.type === 'success'
                    ? 'bg-green-50 text-green-800 border-green-300'
                    : 'bg-red-100 text-red-900 border-red-500'
                    }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle2 size={22} className='shrink-0 mt-0.5' />
                  ) : (
                    <AlertTriangle size={22} className='shrink-0 mt-0.5' />
                  )}

                  <span>{message.text}</span>
                </div>
              )}

              {/* İsim / Telefon */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <label
                    className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-3'
                    style={{ ...mono, color: COLORS.charcoal }}
                  >
                    <User size={15} />
                    Adınız Soyadınız
                  </label>

                  <input
                    type='text'
                    name='customerName'
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    className='block w-full rounded-xl border-2 p-4 text-base bg-white font-semibold transition-all focus:outline-none'
                    style={{ borderColor: COLORS.line }}
                    placeholder=''
                  />
                </div>

                <div>
                  <label
                    className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-3'
                    style={{ ...mono, color: COLORS.charcoal }}
                  >
                    <Phone size={15} />
                    Telefon Numaranız
                  </label>

                  <input
                    type='tel'
                    name='customerPhone'
                    required
                    maxLength={11}
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className='block w-full rounded-xl border-2 p-4 text-base bg-white font-semibold transition-all focus:outline-none'
                    style={{ borderColor: COLORS.line }}
                    placeholder='05XXXXXXXXX'
                  />
                </div>
              </div>

              {/* Makine */}
              <div>
                <label
                  className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-3'
                  style={{ ...mono, color: COLORS.charcoal }}
                >
                  <Wrench size={15} />
                  Tamir Edilecek Alet / Makine
                </label>

                <select
                  name='machineType'
                  value={formData.machineType}
                  onChange={handleChange}
                  className='block w-full rounded-xl border-2 p-4 text-base bg-white font-bold cursor-pointer focus:outline-none'
                  style={{
                    borderColor: COLORS.line,
                    color: COLORS.charcoal
                  }}
                >
                  <option value='Süt Sağım Makinesi'>
                    🐄 Süt Sağım Makinesi
                  </option>
                  <option value='Kaan Çapa Motoru'>
                    🚜 Kaan Çapa Motoru
                  </option>
                  <option value='İlaçlama Makinesi'>
                    🌱 İlaçlama Makinesi
                  </option>
                  <option value='Diğer'>🛠️ Diğer / Genel Onarım</option>
                </select>
              </div>

              {/* Tarih */}
              <div>
                <label
                  className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-3'
                  style={{ ...mono, color: COLORS.charcoal }}
                >
                  <Clock size={15} />
                  Randevu Tarihi
                </label>

                <input
                  type='date'
                  name='date'
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className='block w-full rounded-xl border-2 p-4 text-base bg-white font-semibold focus:outline-none'
                  style={{
                    borderColor: COLORS.line,
                    color: COLORS.charcoal
                  }}
                />
              </div>

              {/* SAAT PANELİ */}
              {formData.date && (
                <div
                  className='rounded-3xl border-2 p-6 sm:p-8'
                  style={{
                    backgroundColor: COLORS.paperDark,
                    borderColor: COLORS.charcoal
                  }}
                >
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='p-2 rounded-full'
                        style={{ backgroundColor: 'rgba(181,72,15,0.12)' }}
                      >
                        <Clock size={22} color={COLORS.rust} />
                      </div>

                      <h3
                        className='text-2xl sm:text-3xl font-black uppercase tracking-wide'
                        style={{ ...oswald, color: COLORS.charcoal }}
                      >
                        RANDEVU SAATİNİ SEÇİN
                      </h3>
                    </div>

                    <span
                      className='text-xs font-black px-3 py-2 rounded-full self-start sm:self-auto'
                      style={{
                        ...mono,
                        backgroundColor: COLORS.charcoal,
                        color: COLORS.amber
                      }}
                    >
                      09:00 – 18:00
                    </span>
                  </div>

                  <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {availableHours.map((slot) => {
                      const isBusy = busySlots.includes(slot);
                      const isSelected = formData.timeSlot === slot;

                      return (
                        <button
                          key={slot}
                          type='button'
                          disabled={isBusy}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              timeSlot: slot
                            }))
                          }
                          className={`relative py-4 px-4 rounded-xl border-2 text-center font-black text-lg transition-all duration-200 ${isBusy
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through opacity-60'
                            : isSelected
                              ? 'text-white shadow-lg scale-[1.03]'
                              : 'bg-white hover:shadow-md hover:-translate-y-0.5'
                            }`}
                          style={
                            isBusy
                              ? {}
                              : isSelected
                                ? {
                                  backgroundColor: COLORS.rust,
                                  borderColor: COLORS.charcoal
                                }
                                : {
                                  borderColor: COLORS.line,
                                  color: COLORS.charcoal
                                }
                          }
                        >
                          {isSelected && (
                            <CheckCircle2
                              size={18}
                              className='absolute -top-2 -right-2 bg-white rounded-full'
                              color={COLORS.rust}
                            />
                          )}

                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* KVKK */}
              <div
                className='flex items-start gap-4 p-5 rounded-2xl border-2'
                style={{
                  backgroundColor: COLORS.paperDark,
                  borderColor: COLORS.line
                }}
              >
                <ShieldCheck
                  size={24}
                  className='mt-0.5 shrink-0'
                  color={COLORS.rust}
                />

                <div className='flex items-start gap-3 text-sm leading-relaxed'>
                  <input
                    id='kvkkApproved'
                    name='kvkkApproved'
                    type='checkbox'
                    checked={formData.kvkkApproved}
                    onChange={handleChange}
                    className='h-5 w-5 mt-1 rounded cursor-pointer'
                    style={{ accentColor: COLORS.rust }}
                  />

                  <label
                    htmlFor='kvkkApproved'
                    className='font-semibold'
                    style={{ color: COLORS.charcoal }}
                  >
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(true)}
                      className='font-black underline mr-1'
                      style={{ color: COLORS.rust }}
                    >
                      KVKK Aydınlatma Metni
                    </button>
                    ’ni okudum, anladım ve kabul ediyorum.
                  </label>
                </div>
              </div>

              {/* DEV CTA BUTONU */}
              <div className='pt-4'>
                <button
                  type='submit'
                  className='relative w-full flex justify-center items-center gap-4 py-6 px-8 rounded-3xl shadow-2xl text-xl sm:text-2xl lg:text-3xl font-black text-white transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] overflow-hidden border-2'
                  style={{
                    backgroundColor: COLORS.rust,
                    borderColor: COLORS.charcoal
                  }}
                >
                  <span
                    className='absolute top-0 left-0 right-0 h-2'
                    style={{ backgroundColor: COLORS.amber }}
                  />

                  <ClipboardList size={32} />

                  <span
                    className='tracking-[0.12em] uppercase'
                    style={oswald}
                  >
                    RANDEVU OLUŞTUR
                  </span>
                </button>

                <p
                  className="text-sm font-medium text-center"
                  style={{ color: COLORS.amber }}
                >
                  Randevunuzu oluşturduğunuzda telefonumuza anında mesaj gelir 📲 ve en yakın zamanda iletişime geçilecektir. Bizi tercih ettiğiniz için teşekkür ederiz 🙏

                  ⚠️NOT: SÜT SAĞIM MAKİNESİ RANDEVU ALACAKSINIZ AMA İŞ YERİMİZE GETİRMENİZ LAZIM!!!!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <KVKKModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}