import { useState, useEffect } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { getDoctors, createDoctor, deleteDoctor, toggleDoctorStatus } from '../../lib/api/doctors';
import type { Doctor, DoctorSchedule } from '../../types/database';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface DoctorManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function DoctorManagement({ onNavigate, onLogout }: DoctorManagementProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    status: true,
    image_url: '',
  });
  const [schedule, setSchedule] = useState<DoctorSchedule>({
    senin: null,
    selasa: null,
    rabu: null,
    kamis: null,
    jumat: null,
    sabtu: null,
    minggu: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch doctors on mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      setLoading(true);
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      alert('Gagal memuat data dokter');
    } finally {
      setLoading(false);
    }
  }

  const handleAddDoctor = async () => {
    try {
      setSubmitting(true);

      await createDoctor({
        name: formData.name,
        specialty: formData.specialty,
        status: formData.status,
        image_url: formData.image_url || null,
        schedule: schedule,
      });

      await fetchDoctors();
      setIsAddModalOpen(false);
      setFormData({ name: '', specialty: '', status: true, image_url: '' });
      setSchedule({
        senin: null,
        selasa: null,
        rabu: null,
        kamis: null,
        jumat: null,
        sabtu: null,
        minggu: null,
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Gagal menambahkan dokter');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditDoctor = async () => {
    if (!selectedDoctor) return;
    
    try {
      setSubmitting(true);
      const { updateDoctor } = await import('../../lib/api/doctors');
      
      await updateDoctor(selectedDoctor.id, {
        name: formData.name,
        specialty: formData.specialty,
        status: formData.status,
        image_url: formData.image_url || null,
        schedule: schedule,
      });

      await fetchDoctors();
      setIsEditModalOpen(false);
      setSelectedDoctor(null);
      setFormData({ name: '', specialty: '', status: true, image_url: '' });
      setSchedule({
        senin: null,
        selasa: null,
        rabu: null,
        kamis: null,
        jumat: null,
        sabtu: null,
        minggu: null,
      });
    } catch (error) {
      console.error('Error updating doctor:', error);
      alert('Gagal mengupdate dokter');
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      status: doctor.status,
      image_url: doctor.image_url || '',
    });
    setSchedule(doctor.schedule);
    setIsEditModalOpen(true);
  };

  const handleScheduleChange = (day: keyof DoctorSchedule, field: 'start' | 'end', value: string) => {
    setSchedule(prev => {
      const currentDay = prev[day] || { start: '', end: '' };
      return {
        ...prev,
        [day]: {
          ...currentDay,
          [field]: value,
        },
      };
    });
  };

  const toggleDaySchedule = (day: keyof DoctorSchedule, enabled: boolean) => {
    setSchedule(prev => ({
      ...prev,
      [day]: enabled ? { start: '08:00', end: '17:00' } : null,
    }));
  };

  const handleDeleteDoctor = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus dokter ini?')) return;
    
    try {
      await deleteDoctor(id);
      await fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('Gagal menghapus dokter');
    }
  };

  const handleToggleStatus = async (doctor: Doctor) => {
    try {
      await toggleDoctorStatus(doctor.id, doctor.status);
      await fetchDoctors();
    } catch (error) {
      console.error('Error toggling doctor status:', error);
      alert('Gagal mengubah status dokter');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
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
              <h1 className="text-3xl text-gray-900">Manajemen Dokter</h1>
              <p className="text-gray-600">Kelola data dokter, spesialisasi, dan jadwal praktik</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Dokter
            </Button>
          </div>
        </header>

        <div className="p-8">
          {/* Doctor Cards */}
          {loading ? (
            <div className="text-center py-12 text-gray-500">Memuat data dokter...</div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Belum ada dokter terdaftar</div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-gray-900 mb-2">{doctor.name}</CardTitle>
                        <p className="text-blue-600">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={doctor.status} 
                          onCheckedChange={() => handleToggleStatus(doctor)}
                        />
                        <Badge className={doctor.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {doctor.status ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <h5 className="text-sm text-gray-600 mb-3">Jadwal Mingguan</h5>
                      <div className="space-y-2">
                        {Object.entries(doctor.schedule).map(([day, time]) => (
                          <div key={day} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 capitalize">{day}</span>
                            {time ? (
                              <span className="text-gray-900">{time.start} - {time.end}</span>
                            ) : (
                              <span className="text-gray-400">Libur</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        onClick={() => openEditModal(doctor)}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        variant="outline" 
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Doctor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Tambah Dokter Baru</CardTitle>
                <button onClick={() => setIsAddModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name"
                    placeholder="Dr. Nama Dokter, Sp.XX"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Spesialisasi</Label>
                  <Input 
                    id="specialty"
                    placeholder="e.g., Penyakit Dalam, Jantung, dll"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">URL Foto (Opsional)</Label>
                  <Input 
                    id="image_url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                
                {/* Schedule Section */}
                <div className="space-y-3 pt-4 border-t">
                  <Label>Jadwal Praktik</Label>
                  {Object.entries({
                    senin: 'Senin',
                    selasa: 'Selasa',
                    rabu: 'Rabu',
                    kamis: 'Kamis',
                    jumat: 'Jumat',
                    sabtu: 'Sabtu',
                    minggu: 'Minggu',
                  }).map(([day, label]) => (
                    <div key={day} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Switch
                          checked={schedule[day as keyof DoctorSchedule] !== null}
                          onCheckedChange={(checked) => toggleDaySchedule(day as keyof DoctorSchedule, checked)}
                          disabled={submitting}
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      {schedule[day as keyof DoctorSchedule] && (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="time"
                            value={schedule[day as keyof DoctorSchedule]?.start || ''}
                            onChange={(e) => handleScheduleChange(day as keyof DoctorSchedule, 'start', e.target.value)}
                            className="w-28"
                            disabled={submitting}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="time"
                            value={schedule[day as keyof DoctorSchedule]?.end || ''}
                            onChange={(e) => handleScheduleChange(day as keyof DoctorSchedule, 'end', e.target.value)}
                            className="w-28"
                            disabled={submitting}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Label htmlFor="status">Status Aktif</Label>
                  <Switch 
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                    disabled={submitting}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleAddDoctor}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    disabled={submitting}
                  >
                    {submitting ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                  <Button 
                    onClick={() => setIsAddModalOpen(false)} 
                    variant="outline" 
                    className="flex-1"
                    disabled={submitting}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {isEditModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-md border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Edit Dokter</CardTitle>
                <button onClick={() => setIsEditModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nama Lengkap</Label>
                  <Input 
                    id="edit-name"
                    placeholder="Dr. Nama Dokter, Sp.XX"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-specialty">Spesialisasi</Label>
                  <Input 
                    id="edit-specialty"
                    placeholder="e.g., Penyakit Dalam, Jantung, dll"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-image_url">URL Foto (Opsional)</Label>
                  <Input 
                    id="edit-image_url"
                    placeholder="https://example.com/photo.jpg"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    disabled={submitting}
                  />
                </div>
                
                {/* Schedule Section */}
                <div className="space-y-3 pt-4 border-t">
                  <Label>Jadwal Praktik</Label>
                  {Object.entries({
                    senin: 'Senin',
                    selasa: 'Selasa',
                    rabu: 'Rabu',
                    kamis: 'Kamis',
                    jumat: 'Jumat',
                    sabtu: 'Sabtu',
                    minggu: 'Minggu',
                  }).map(([day, label]) => (
                    <div key={day} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Switch
                          checked={schedule[day as keyof DoctorSchedule] !== null}
                          onCheckedChange={(checked) => toggleDaySchedule(day as keyof DoctorSchedule, checked)}
                          disabled={submitting}
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      {schedule[day as keyof DoctorSchedule] && (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="time"
                            value={schedule[day as keyof DoctorSchedule]?.start || ''}
                            onChange={(e) => handleScheduleChange(day as keyof DoctorSchedule, 'start', e.target.value)}
                            className="w-28"
                            disabled={submitting}
                          />
                          <span className="text-gray-500">-</span>
                          <Input
                            type="time"
                            value={schedule[day as keyof DoctorSchedule]?.end || ''}
                            onChange={(e) => handleScheduleChange(day as keyof DoctorSchedule, 'end', e.target.value)}
                            className="w-28"
                            disabled={submitting}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Label htmlFor="edit-status">Status Aktif</Label>
                  <Switch 
                    id="edit-status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                    disabled={submitting}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleEditDoctor}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    disabled={submitting}
                  >
                    {submitting ? 'Menyimpan...' : 'Update'}
                  </Button>
                  <Button 
                    onClick={() => setIsEditModalOpen(false)} 
                    variant="outline" 
                    className="flex-1"
                    disabled={submitting}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
