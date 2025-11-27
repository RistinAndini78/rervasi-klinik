import { useState } from 'react';
import { Heart, ArrowLeft, Calendar, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface ReservationFormPageProps {
  onNavigate: (page: Page) => void;
}

const services = [
  'Konsultasi Umum',
  'Pemeriksaan Jantung',
  'Cek Kesehatan Rutin',
  'Konsultasi Spesialis',
];

const doctors = [
  'Dr. Sarah Wijaya, Sp.PD',
  'Dr. Ahmad Hartono, Sp.JP',
  'Dr. Lisa Andini, Sp.A',
  'Dr. Budi Santoso, Sp.OG',
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

export function ReservationFormPage({ onNavigate }: ReservationFormPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    doctor: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-blue-900">KlinikSehat</h1>
                  <p className="text-xs text-gray-500">Kesehatan Anda, Prioritas Kami</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-4">Reservasi Berhasil!</h2>
              <p className="text-xl text-gray-600 mb-2">
                Terima kasih, <span className="text-blue-600">{formData.name}</span>
              </p>
              <p className="text-gray-600 mb-8">
                Reservasi Anda telah dikonfirmasi. Kami akan mengirimkan detail reservasi ke email Anda.
              </p>
              <div className="bg-white rounded-2xl p-6 mb-8 border-2 border-gray-100 text-left max-w-md mx-auto">
                <h4 className="text-gray-900 mb-4">Detail Reservasi</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Layanan:</span>
                    <span className="text-gray-900">{formData.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dokter:</span>
                    <span className="text-gray-900">{formData.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal:</span>
                    <span className="text-gray-900">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waktu:</span>
                    <span className="text-gray-900">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nomor Antrian:</span>
                    <span className="text-blue-600">A012</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => onNavigate('landing')} size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Kembali ke Beranda
                </Button>
                <Button onClick={() => onNavigate('queue')} size="lg" variant="outline">
                  Lihat Status Antrian
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">KlinikSehat</h1>
                <p className="text-xs text-gray-500">Kesehatan Anda, Prioritas Kami</p>
              </div>
            </div>
            <nav className="flex items-center gap-8">
              <button onClick={() => onNavigate('landing')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Beranda
              </button>
              <button onClick={() => onNavigate('queue')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Status Antrian
              </button>
              <button onClick={() => onNavigate('about')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Tentang Kami
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button onClick={() => onNavigate('landing')} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          <h2 className="text-4xl text-gray-900 mb-2">Form Reservasi Online</h2>
          <p className="text-xl text-gray-600">
            Lengkapi form di bawah untuk membuat reservasi konsultasi Anda
          </p>
        </div>

        <Card className="border-2 border-gray-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardTitle className="text-gray-900">Informasi Reservasi</CardTitle>
            <CardDescription>Semua field wajib diisi untuk memproses reservasi Anda</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-gray-900">Data Pribadi</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="w-4 h-4 inline mr-2" />
                      Nama Lengkap
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Nomor Telepon
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="08xx-xxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-gray-900">Detail Janji Temu</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Pilih Layanan</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih layanan" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>{service}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Pilih Dokter</Label>
                    <Select value={formData.doctor} onValueChange={(value) => setFormData({...formData, doctor: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih dokter" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Tanggal
                    </Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Waktu</Label>
                    <Select value={formData.time} onValueChange={(value) => setFormData({...formData, time: value})} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="notes">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Catatan Tambahan (Opsional)
                </Label>
                <Textarea 
                  id="notes" 
                  placeholder="Masukkan keluhan atau informasi tambahan yang perlu kami ketahui"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Konfirmasi Reservasi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2025 KlinikSehat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
