import { useState } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Plus, Edit, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface DoctorManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: boolean;
  schedule: {
    [key: string]: { start: string; end: string } | null;
  };
}

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Wijaya, Sp.PD',
    specialty: 'Penyakit Dalam',
    status: true,
    schedule: {
      senin: { start: '08:00', end: '16:00' },
      selasa: { start: '08:00', end: '16:00' },
      rabu: { start: '08:00', end: '16:00' },
      kamis: { start: '08:00', end: '16:00' },
      jumat: { start: '08:00', end: '16:00' },
      sabtu: null,
      minggu: null,
    },
  },
  {
    id: 2,
    name: 'Dr. Ahmad Hartono, Sp.JP',
    specialty: 'Jantung & Pembuluh Darah',
    status: true,
    schedule: {
      senin: null,
      selasa: { start: '09:00', end: '17:00' },
      rabu: { start: '09:00', end: '17:00' },
      kamis: { start: '09:00', end: '17:00' },
      jumat: { start: '09:00', end: '17:00' },
      sabtu: { start: '09:00', end: '17:00' },
      minggu: null,
    },
  },
  {
    id: 3,
    name: 'Dr. Lisa Andini, Sp.A',
    specialty: 'Anak',
    status: false,
    schedule: {
      senin: { start: '10:00', end: '18:00' },
      selasa: { start: '10:00', end: '18:00' },
      rabu: { start: '10:00', end: '18:00' },
      kamis: { start: '10:00', end: '18:00' },
      jumat: null,
      sabtu: null,
      minggu: null,
    },
  },
];

export function DoctorManagement({ onNavigate, onLogout }: DoctorManagementProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    status: true,
  });

  const handleAddDoctor = () => {
    const newDoctor: Doctor = {
      id: doctors.length + 1,
      name: formData.name,
      specialty: formData.specialty,
      status: formData.status,
      schedule: {
        senin: null,
        selasa: null,
        rabu: null,
        kamis: null,
        jumat: null,
        sabtu: null,
        minggu: null,
      },
    };
    setDoctors([...doctors, newDoctor]);
    setIsAddModalOpen(false);
    setFormData({ name: '', specialty: '', status: true });
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, status: !d.status } : d));
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
                        onCheckedChange={() => handleToggleStatus(doctor.id)}
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
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setIsEditModalOpen(true);
                      }}
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
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name"
                    placeholder="Dr. Nama Dokter, Sp.XX"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Spesialisasi</Label>
                  <Input 
                    id="specialty"
                    placeholder="e.g., Penyakit Dalam, Jantung, dll"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Status Aktif</Label>
                  <Switch 
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleAddDoctor}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    Simpan
                  </Button>
                  <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
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
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Sedang mengedit: <span className="text-gray-900">{selectedDoctor.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Fitur edit lengkap dapat ditambahkan di sini (nama, spesialisasi, jadwal detail, dll)
                </p>
                <Button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  Tutup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
