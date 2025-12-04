import { useState, useEffect } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { getReservations, updateReservationStatus, deleteReservation } from '../../lib/api/reservations';
import { getDoctors } from '../../lib/api/doctors';
import type { Reservation, Doctor } from '../../types/database';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface ReservationManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function ReservationManagement({ onNavigate, onLogout }: ReservationManagementProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Fetch reservations when filters change
  useEffect(() => {
    fetchReservations();
  }, [filterDoctor, filterStatus, filterDate]);

  async function fetchDoctors() {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  async function fetchReservations() {
    try {
      setLoading(true);
      const filters: any = {};
      
      if (filterDoctor !== 'all') {
        filters.doctorId = filterDoctor;
      }
      
      if (filterStatus !== 'all') {
        filters.status = filterStatus;
      }
      
      if (filterDate) {
        filters.date = filterDate;
      }

      const data = await getReservations(filters);
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      alert('Gagal memuat data reservasi');
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai') => {
    try {
      await updateReservationStatus(id, newStatus);
      await fetchReservations();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status reservasi');
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus reservasi ini?')) return;
    
    try {
      await deleteReservation(id);
      await fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Gagal menghapus reservasi');
    }
  };

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
      <aside className="w-80 bg-gradient-to-b from-blue-600 to-green-600 text-white p-6">
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
      <main className="flex-1 bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-6">
          <h2 className="text-2xl text-gray-900">Kelola Reservasi</h2>
          <p className="text-gray-600 mt-1">Atur dan kelola semua reservasi pasien</p>
        </header>

        <div className="p-8">
          {/* Filter Section */}
          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg text-gray-900">Filter Reservasi</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Dokter</label>
                <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Dokter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Dokter</SelectItem>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                    ))}
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
                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Tanggal</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Reservations Table */}
          <Card className="border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="text-gray-900">Daftar Reservasi ({reservations.length})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-12 text-gray-500">Memuat data reservasi...</div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-12 text-gray-500">Tidak ada reservasi ditemukan</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600">No. Antrian</th>
                        <th className="text-left py-3 px-4 text-gray-600">Pasien</th>
                        <th className="text-left py-3 px-4 text-gray-600">Kontak</th>
                        <th className="text-left py-3 px-4 text-gray-600">Dokter</th>
                        <th className="text-left py-3 px-4 text-gray-600">Layanan</th>
                        <th className="text-left py-3 px-4 text-gray-600">Jadwal</th>
                        <th className="text-left py-3 px-4 text-gray-600">Status</th>
                        <th className="text-center py-3 px-4 text-gray-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((reservation) => (
                        <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <p className="text-blue-600 font-medium">{reservation.queue_number}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-gray-900 font-medium">{reservation.patient_name}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-1 text-gray-600">
                                <span>{reservation.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <span>{reservation.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-900">{reservation.doctor?.name || 'N/A'}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-900">{reservation.service?.name || 'N/A'}</p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-1 text-gray-600">
                                <span>{new Date(reservation.appointment_date).toLocaleDateString('id-ID')}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <span>{reservation.appointment_time}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Select
                              value={reservation.status}
                              onValueChange={(value) => handleStatusChange(reservation.id, value as any)}
                            >
                              <SelectTrigger className="w-36">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Menunggu">Menunggu</SelectItem>
                                <SelectItem value="Dikonfirmasi">Dikonfirmasi</SelectItem>
                                <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                                <SelectItem value="Selesai">Selesai</SelectItem>
                              </SelectContent>
                            </Select>
                            <Badge className={`${getStatusBadgeClass(reservation.status)} mt-1`}>
                              {reservation.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center gap-2">
                              <Button
                                onClick={() => handleDeleteReservation(reservation.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Hapus
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
