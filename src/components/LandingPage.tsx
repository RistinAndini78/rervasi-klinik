import { Calendar, Clock, Users, Heart, Stethoscope, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const services = [
  { id: 1, name: 'Konsultasi Umum', icon: Stethoscope, price: 'Rp 150.000', duration: '30 menit', color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Pemeriksaan Jantung', icon: Heart, price: 'Rp 500.000', duration: '60 menit', color: 'bg-red-100 text-red-600' },
  { id: 3, name: 'Cek Kesehatan Rutin', icon: Activity, price: 'Rp 300.000', duration: '45 menit', color: 'bg-green-100 text-green-600' },
  { id: 4, name: 'Konsultasi Spesialis', icon: Users, price: 'Rp 400.000', duration: '45 menit', color: 'bg-purple-100 text-purple-600' },
];

const doctors = [
  { id: 1, name: 'Dr. Sarah Wijaya, Sp.PD', specialty: 'Penyakit Dalam', schedule: 'Senin - Jumat, 08:00 - 16:00', status: 'Tersedia Hari Ini', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop' },
  { id: 2, name: 'Dr. Ahmad Hartono, Sp.JP', specialty: 'Jantung & Pembuluh Darah', schedule: 'Selasa - Sabtu, 09:00 - 17:00', status: 'Tersedia Hari Ini', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' },
  { id: 3, name: 'Dr. Lisa Andini, Sp.A', specialty: 'Anak', schedule: 'Senin - Kamis, 10:00 - 18:00', status: 'Tersedia Besok', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop' },
  { id: 4, name: 'Dr. Budi Santoso, Sp.OG', specialty: 'Kebidanan & Kandungan', schedule: 'Rabu - Minggu, 08:00 - 15:00', status: 'Tersedia Hari Ini', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop' },
];

export function LandingPage({ onNavigate }: LandingPageProps) {
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
              <Button onClick={() => onNavigate('reservation')} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Reservasi Sekarang
              </Button>
              <button onClick={() => onNavigate('admin-login')} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-green-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-0 mb-4">Sistem Reservasi Online Terpercaya</Badge>
              <h2 className="text-5xl mb-6">Reservasi Klinik Jadi Lebih Mudah & Cepat</h2>
              <p className="text-xl text-blue-50 mb-8">
                Tidak perlu antri lama! Booking jadwal konsultasi dengan dokter pilihan Anda secara online. 
                Pantau status antrian real-time dari rumah.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => onNavigate('reservation')} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Calendar className="w-5 h-5 mr-2" />
                  Buat Reservasi
                </Button>
                <Button onClick={() => onNavigate('queue')} size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Clock className="w-5 h-5 mr-2" />
                  Cek Antrian
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=500&fit=crop" 
                  alt="Medical consultation" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Pasien Terlayani</p>
                      <p className="text-2xl text-gray-900">10,000+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-600 border-0 mb-4">Layanan Kami</Badge>
            <h2 className="text-4xl text-gray-900 mb-4">Layanan Kesehatan Terlengkap</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Berbagai pilihan layanan medis berkualitas dengan dokter profesional dan berpengalaman
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-blue-200">
                  <CardHeader>
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-gray-900">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                      <p className="text-2xl text-blue-600">{service.price}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Doctor Schedule Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="doctors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-600 border-0 mb-4">Tim Medis Kami</Badge>
            <h2 className="text-4xl text-gray-900 mb-4">Jadwal Dokter Tersedia</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih dokter spesialis sesuai kebutuhan Anda dan lihat jadwal praktik mereka
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-gray-100">
                <div className="flex gap-6 p-6">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-32 h-32 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <CardHeader className="p-0 mb-3">
                      <CardTitle className="text-gray-900">{doctor.name}</CardTitle>
                      <CardDescription className="text-blue-600">{doctor.specialty}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{doctor.schedule}</span>
                      </div>
                      <Badge className={doctor.status === 'Tersedia Hari Ini' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {doctor.status}
                      </Badge>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => onNavigate('reservation')} size="lg" className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              Reservasi dengan Dokter Pilihan
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl">KlinikSehat</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Sistem reservasi online untuk kemudahan akses layanan kesehatan Anda.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Beranda</button></li>
                <li><button onClick={() => onNavigate('queue')} className="hover:text-white transition-colors">Status Antrian</button></li>
                </ul>
            </div>
            <div>
              <h4 className="mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Konsultasi Umum</li>
                <li>Pemeriksaan Jantung</li>
                <li>Cek Kesehatan Rutin</li>
                <li>Konsultasi Spesialis</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Jl. Kesehatan No. 123</li>
                <li>Jakarta, Indonesia</li>
                <li>Tel: (021) 1234-5678</li>
                <li>Email: info@kliniksehat.id</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 KlinikSehat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
