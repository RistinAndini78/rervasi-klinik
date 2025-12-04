import { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { getQueueStatus, getReservations } from '../lib/api/reservations';
import type { QueueData } from '../types/database';

type Page = 'landing' | 'queue' | 'reservation' | 'about' | 'admin-login' | 'admin-dashboard' | 'admin-doctors' | 'admin-services' | 'admin-reservations';

interface QueueStatusPageProps {
  onNavigate: (page: Page) => void;
}

export function QueueStatusPage({ onNavigate }: QueueStatusPageProps) {
  const [queueData, setQueueData] = useState<QueueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQueue: 0,
    served: 0,
    waiting: 0,
    avgTime: '0',
  });

  useEffect(() => {
    async function fetchQueueData() {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch queue status
        const queueInfo = await getQueueStatus(today);
        setQueueData(queueInfo);

        // Fetch today's reservations for stats
        const todayReservations = await getReservations({ date: today });
        
        const served = todayReservations.filter(r => r.status === 'Selesai').length;
        const waiting = todayReservations.filter(r => ['Menunggu', 'Dikonfirmasi'].includes(r.status)).length;
        const total = todayReservations.length;
        
        // Calculate average wait time (assume 15 minutes per patient)
        const avgMinutes = waiting > 0 ? Math.round((waiting * 15) / waiting) : 0;

        setStats({
          totalQueue: total,
          served,
          waiting,
          avgTime: `${avgMinutes}m`,
        });
      } catch (error) {
        console.error('Error fetching queue data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchQueueData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchQueueData, 30000);
    return () => clearInterval(interval);
  }, []);
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
              <button onClick={() => onNavigate('queue')} className="text-blue-600">
                Status Antrian
              </button>
              <Button onClick={() => onNavigate('reservation')} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Reservasi Sekarang
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Button onClick={() => onNavigate('landing')} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          <h2 className="text-4xl text-gray-900 mb-2">Status Antrian Real-Time</h2>
          <p className="text-xl text-gray-600">
            Pantau antrian saat ini dan estimasi waktu tunggu untuk setiap dokter
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Total Antrian Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl text-blue-600">{loading ? '...' : stats.totalQueue}</p>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Pasien Dilayani</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl text-green-600">{loading ? '...' : stats.served}</p>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Masih Menunggu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl text-yellow-600">{loading ? '...' : stats.waiting}</p>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">Rata-rata Tunggu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl text-purple-600">{loading ? '...' : stats.avgTime}</p>
                <AlertCircle className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Queue List */}
        <div className="space-y-6">
          <h3 className="text-2xl text-gray-900">Antrian Per Dokter</h3>
          <div className="grid grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                Memuat data antrian...
              </div>
            ) : queueData.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-gray-500">
                Tidak ada antrian hari ini
              </div>
            ) : (
              queueData.map((queue) => (
                <Card key={queue.doctor.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-gray-900 mb-1">{queue.doctor.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-700">Aktif</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Nomor Antrian Saat Ini</p>
                        <p className="text-3xl text-blue-600">{queue.current_queue || '-'}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pasien Menunggu</p>
                          <p className="text-xl text-gray-900">{queue.waiting_count} orang</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimasi Tunggu</p>
                          <p className="text-xl text-gray-900">{queue.estimated_time}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl mb-4">Hindari Antrian Panjang!</h3>
          <p className="text-xl text-blue-50 mb-6">
            Buat reservasi online sekarang dan dapatkan slot waktu yang tepat untuk Anda
          </p>
          <Button onClick={() => onNavigate('reservation')} size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Buat Reservasi Sekarang
          </Button>
        </div>
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
