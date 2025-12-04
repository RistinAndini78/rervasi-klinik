import { useState, useEffect } from 'react';
import { Heart, LogOut, LayoutDashboard, Stethoscope, Briefcase, ClipboardList, Plus, Edit, Trash2, X, Clock, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { getServices, createService, deleteService } from '../../lib/api/services';
import type { Service } from '../../types/database';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface ServiceManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function ServiceManagement({ onNavigate, onLogout }: ServiceManagementProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    icon: 'Stethoscope',
    color: 'bg-blue-100 text-blue-600',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      alert('Gagal memuat data layanan');
    } finally {
      setLoading(false);
    }
  }

  const handleAddService = async () => {
    try {
      setSubmitting(true);
      await createService({
        name: formData.name,
        description: formData.description || null,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        icon: formData.icon,
        color: formData.color,
      });
      await fetchServices();
      setIsAddModalOpen(false);
      setFormData({ name: '', description: '', price: '', duration: '', icon: 'Stethoscope', color: 'bg-blue-100 text-blue-600' });
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Gagal menambahkan layanan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan ini?')) return;
    try {
      await deleteService(id);
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Gagal menghapus layanan');
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Manajemen Dokter</span>
          </button>
          <button 
            onClick={() => onNavigate('admin-services')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
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
              <h1 className="text-3xl text-gray-900">Manajemen Layanan</h1>
              <p className="text-gray-600">Kelola layanan kesehatan, harga, durasi, dan dokter terkait</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Layanan
            </Button>
          </div>
        </header>

        <div className="p-8">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Memuat data layanan...</div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-gray-500">Belum ada layanan terdaftar</div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-gray-900 mb-2">{service.name}</CardTitle>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-600">Harga</span>
                        </div>
                        <p className="text-blue-600 font-medium">Rp {service.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">Durasi</span>
                        </div>
                        <p className="text-gray-900">{service.duration} menit</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        onClick={() => {
                          setSelectedService(service);
                          setIsEditModalOpen(true);
                        }}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleDeleteService(service.id)}
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

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-lg border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Tambah Layanan Baru</CardTitle>
                <button onClick={() => setIsAddModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Layanan</Label>
                  <Input 
                    id="name"
                    placeholder="e.g., Konsultasi Umum"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description"
                    placeholder="Jelaskan tentang layanan ini"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga</Label>
                    <Input 
                      id="price"
                      placeholder="Rp 150.000"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi</Label>
                    <Input 
                      id="duration"
                      placeholder="30 menit"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleAddService}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    Simpan Layanan
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

      {/* Edit Service Modal */}
      {isEditModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="w-full max-w-lg border-2 border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Edit Layanan</CardTitle>
                <button onClick={() => setIsEditModalOpen(false)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Sedang mengedit: <span className="text-gray-900">{selectedService.name}</span>
                </p>
                <div className="bg-blue-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga:</span>
                    <span className="text-gray-900">{selectedService.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi:</span>
                    <span className="text-gray-900">{selectedService.duration} menit</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Fitur edit lengkap dapat ditambahkan di sini (update harga, durasi, dokter terkait, dll)
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
