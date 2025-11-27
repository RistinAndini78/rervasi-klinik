import { useState } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Filter, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface ReservationManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface Reservation {
  id: number;
  queueNumber: string;
  patientName: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  date: string;
  time: string;
  status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai';
  notes: string;
}

const initialReservations: Reservation[] = [
  {
    id: 1,
    queueNumber: 'A001',
    patientName: 'Ahmad Wijaya',
    email: 'ahmad@email.com',
    phone: '0812-3456-7890',
    doctor: 'Dr. Sarah Wijaya, Sp.PD',
    service: 'Konsultasi Umum',
    date: '2025-11-20',
    time: '09:00',
    status: 'Dikonfirmasi',
    notes: 'Pasien mengalami demam sejak 3 hari',
  },
  {
    id: 2,
    queueNumber: 'B002',
    patientName: 'Siti Nurhaliza',
    email: 'siti@email.com',
    phone: '0813-4567-8901',
    doctor: 'Dr. Ahmad Hartono, Sp.JP',
    service: 'Pemeriksaan Jantung',
    date: '2025-11-20',
    time: '10:30',
    status: 'Menunggu',
    notes: 'Riwayat penyakit jantung di keluarga',
  },
  {
    id: 3,
    queueNumber: 'C003',
    patientName: 'Budi Santoso',
    email: 'budi@email.com',
    phone: '0814-5678-9012',
    doctor: 'Dr. Lisa Andini, Sp.A',
    service: 'Konsultasi Spesialis',
    date: '2025-11-21',
    time: '11:00',
    status: 'Dikonfirmasi',
    notes: 'Anak usia 5 tahun, batuk pilek',
  },
  {
    id: 4,
    queueNumber: 'D004',
    patientName: 'Lisa Rahmawati',
    email: 'lisa@email.com',
    phone: '0815-6789-0123',
    doctor: 'Dr. Sarah Wijaya, Sp.PD',
    service: 'Cek Kesehatan Rutin',
    date: '2025-11-21',
    time: '13:00',
    status: 'Menunggu',
    notes: 'Medical check-up tahunan',
  },
  {
    id: 5,
    queueNumber: 'A005',
    patientName: 'Dewi Lestari',
    email: 'dewi@email.com',
    phone: '0816-7890-1234',
    doctor: 'Dr. Ahmad Hartono, Sp.JP',
    service: 'Pemeriksaan Jantung',
    date: '2025-11-19',
    time: '14:00',
    status: 'Selesai',
    notes: 'Kontrol rutin pasca operasi',
  },
  {
    id: 6,
    queueNumber: 'B006',
    patientName: 'Andi Pratama',
    email: 'andi@email.com',
    phone: '0817-8901-2345',
    doctor: 'Dr. Budi Santoso, Sp.OG',
    service: 'Konsultasi Spesialis',
    date: '2025-11-18',
    time: '09:30',
    status: 'Dibatalkan',
    notes: 'Pasien membatalkan karena halangan',
  },
];

export function ReservationManagement({ onNavigate, onLogout }: ReservationManagementProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [filterDoctor, setFilterDoctor] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  const handleConfirm = (id: number) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Dikonfirmasi' as const } : r
    ));
  };

  const handleCancel = (id: number) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Dibatalkan' as const } : r
    ));
  };

  const handleComplete = (id: number) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: 'Selesai' as const } : r
    ));
  };

  const filteredReservations = reservations.filter(r => {
    if (filterDoctor !== 'all' && r.doctor !== filterDoctor) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterDate && r.date !== filterDate) return false;
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Dikonfirmasi':
        return 'bg-green-100 text-green-700';
      case 'Menunggu':
        return 'bg-yellow-100 text-yellow-700';
      case 'Dibatalkan':
        return 'bg-red-100 text-red-700';
      case 'Selesai':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
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
              <h1 className="text-3xl text-gray-900">Manajemen Reservasi</h1>
              <p className="text-gray-600">Kelola semua reservasi pasien, konfirmasi, reschedule, dan batalkan</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-100 text-yellow-700 px-4 py-2">
                {reservations.filter(r => r.status === 'Menunggu').length} Menunggu Konfirmasi
              </Badge>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Filters */}
          <Card className="border-2 border-gray-100 mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <CardTitle className="text-gray-900">Filter Reservasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Dokter</label>
                  <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Dokter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Dokter</SelectItem>
                      <SelectItem value="Dr. Sarah Wijaya, Sp.PD">Dr. Sarah Wijaya, Sp.PD</SelectItem>
                      <SelectItem value="Dr. Ahmad Hartono, Sp.JP">Dr. Ahmad Hartono, Sp.JP</SelectItem>
                      <SelectItem value="Dr. Lisa Andini, Sp.A">Dr. Lisa Andini, Sp.A</SelectItem>
                      <SelectItem value="Dr. Budi Santoso, Sp.OG">Dr. Budi Santoso, Sp.OG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="Menunggu">Menunggu</SelectItem>
                      <SelectItem value="Dikonfirmasi">Dikonfirmasi</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                      <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Tanggal</label>
                  <Input 
                    type="date" 
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={() => {
                      setFilterDoctor('all');
                      setFilterStatus('all');
                      setFilterDate('');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-white">
                        <div className="text-center">
                          <p className="text-xs">No.</p>
                          <p className="text-lg">{reservation.queueNumber}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg text-gray-900 mb-1">{reservation.patientName}</h4>
                        <p className="text-sm text-gray-600 mb-2">{reservation.service}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{reservation.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(reservation.status)}>
                      {reservation.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Dokter</p>
                      <p className="text-sm text-gray-900">{reservation.doctor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <p className="text-sm text-gray-900">{reservation.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Telepon</p>
                      <p className="text-sm text-gray-900">{reservation.phone}</p>
                    </div>
                  </div>

                  {reservation.notes && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Catatan Pasien</p>
                      <p className="text-sm text-gray-900">{reservation.notes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {reservation.status === 'Menunggu' && (
                      <>
                        <Button 
                          onClick={() => handleConfirm(reservation.id)}
                          className="bg-green-500 hover:bg-green-600"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Konfirmasi
                        </Button>
                        <Button 
                          onClick={() => handleCancel(reservation.id)}
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Batalkan
                        </Button>
                      </>
                    )}
                    {reservation.status === 'Dikonfirmasi' && (
                      <>
                        <Button 
                          onClick={() => handleComplete(reservation.id)}
                          className="bg-blue-500 hover:bg-blue-600"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Tandai Selesai
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button 
                          onClick={() => handleCancel(reservation.id)}
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Batalkan
                        </Button>
                      </>
                    )}
                    {(reservation.status === 'Selesai' || reservation.status === 'Dibatalkan') && (
                      <Badge variant="outline" className="text-gray-500">
                        {reservation.status === 'Selesai' ? 'Reservasi telah selesai' : 'Reservasi dibatalkan'}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReservations.length === 0 && (
            <Card className="border-2 border-gray-100">
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">Tidak ada reservasi yang sesuai dengan filter</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
