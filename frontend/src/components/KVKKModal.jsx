import React from 'react';

export default function KVKKModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">KVKK Aydınlatma Metni</h3>
                <div className="text-gray-600 text-sm space-y-3 leading-relaxed">
                    <p><strong>POLATÇELİK L.T.D Ş.T.İ</strong> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatımızla, siz değerli müşterilerimizin kişisel verilerini aşağıda açıklanan amaçlar kapsamında işleyeceğimizi bildiririz.</p>
                    <p><strong>1. İşlenen Kişisel Veriler:</strong> Adınız, soyadınız, telefon numaranız ve servis talep ettiğiniz araç/makine bilgisi.</p>
                    <p><strong>2. Veri İşleme Amacı:</strong> Randevu sisteminin yönetilmesi, çakışmaların önlenmesi, teknik servis kaydınızın oluşturulması ve randevu detaylarının tarafınıza/işletmemize kısa mesaj (SMS) yoluyla bildirilmesi amacıyla işlenmektedir.</p>
                    <p><strong>3. Veri Aktarımı:</strong> Toplanan verileriniz, yalnızca yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurumları ve randevu bilgilendirme altyapısını sağlayan yerel SMS operatör/hizmet sağlayıcıları ile paylaşılabilir.</p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                    Okudum, Anladım
                </button>
            </div>
        </div>
    );
}