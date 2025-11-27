import { Heart, Calendar, Users, UserCheck, UserPlus, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const recentReservations = [
  { id: 1, patient: 'Ahmad Wijaya', doctor: 'Dr. Sarah Wijaya, Sp.PD', time: '09:00', status: 'Dikonfirmasi' },
  { id: 2, patient: 'Siti Nurhaliza', doctor: 'Dr. Ahmad Hartono, Sp.JP', time: '10:30', status: 'Menunggu' },
  { id: 3, patient: 'Budi Santoso', doctor: 'Dr. Lisa Andini, Sp.A', time: '11:00', status: 'Dikonfirmasi' },
  { id: 4, patient: 'Lisa Rahmawati', doctor: 'Dr. Budi Santoso, Sp.OG', time: '13:00', status: 'Dikonfirmasi' },
];

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-green-600 text-white p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl">KlinikSehat</h2>
              <p className="text-xs text-blue-100">Admin Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="space-y-2">
          <button 
            onClick={() => onNavigate('admin-dashboard')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => onNavigate('admin-doctors')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Manajemen Dokter</span>
          </button>
          <button 
            onClick={() => onNavigate('admin-services')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            <span>Manajemen Layanan</span>
          </button>
          <button 
            onClick={() => onNavigate('admin-reservations')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Manajemen Reservasi</span>
          </button>
        </nav>
        <div className="mt-auto pt-8">
          <Button onClick={onLogout} variant="ghost" className="w-full text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan hari ini.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-gray-900">Super Administrator</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white">
                SA
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Reservasi Hari Ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-4xl text-blue-600">24</p>
                  <Calendar className="w-10 h-10 text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">+12% dari kemarin</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Reservasi Minggu Ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-4xl text-green-600">142</p>
                  <Users className="w-10 h-10 text-green-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">+8% dari minggu lalu</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Dokter Aktif Hari Ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-4xl text-purple-600">12</p>
                  <UserCheck className="w-10 h-10 text-purple-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">dari 15 dokter total</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-white hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Pasien Baru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-4xl text-yellow-600">7</p>
                  <UserPlus className="w-10 h-10 text-yellow-400" />
                </div>
                <p className="text-sm text-gray-600 mt-2">Minggu ini</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reservations */}
          <Card className="border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="text-gray-900">Reservasi Terbaru Hari Ini</CardTitle>
              <CardDescription>Daftar reservasi yang perlu diperhatikan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {recentReservations.map((reservation) => (
                  <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white">
                        {reservation.patient.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-gray-900">{reservation.patient}</p>
                        <p className="text-sm text-gray-600">{reservation.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Waktu</p>
                        <p className="text-gray-900">{reservation.time}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${
                        reservation.status === 'Dikonfirmasi' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {reservation.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button onClick={() => onNavigate('admin-reservations')} variant="outline">
                  Lihat Semua Reservasi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('admin-doctors')}>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Kelola Dokter</h4>
                <p className="text-sm text-gray-600">Tambah, edit, atau hapus data dokter</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('admin-services')}>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Kelola Layanan</h4>
                <p className="text-sm text-gray-600">Atur layanan dan harga klinik</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('admin-reservations')}>
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ClipboardList className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-gray-900 mb-2">Kelola Reservasi</h4>
                <p className="text-sm text-gray-600">Konfirmasi dan atur jadwal reservasi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
