// Database Types for Clinic Reservation System

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: boolean;
  image_url: string | null;
  schedule: DoctorSchedule;
  created_at: string;
  updated_at: string;
}

export interface DoctorSchedule {
  senin: TimeSlot | null;
  selasa: TimeSlot | null;
  rabu: TimeSlot | null;
  kamis: TimeSlot | null;
  jumat: TimeSlot | null;
  sabtu: TimeSlot | null;
  minggu: TimeSlot | null;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  queue_number: string;
  patient_name: string;
  email: string;
  phone: string;
  doctor_id: string | null;
  service_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai';
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  doctor?: Doctor;
  service?: Service;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Insert types (without id and timestamps)
export interface DoctorInsert {
  name: string;
  specialty: string;
  status?: boolean;
  image_url?: string | null;
  schedule?: DoctorSchedule;
}

export interface ServiceInsert {
  name: string;
  description?: string | null;
  price: number;
  duration: number;
  icon?: string;
  color?: string;
}

export interface ReservationInsert {
  queue_number: string;
  patient_name: string;
  email: string;
  phone: string;
  doctor_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status?: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai';
  notes?: string | null;
}

// Update types (all fields optional)
export interface DoctorUpdate {
  name?: string;
  specialty?: string;
  status?: boolean;
  image_url?: string | null;
  schedule?: DoctorSchedule;
}

export interface ServiceUpdate {
  name?: string;
  description?: string | null;
  price?: number;
  duration?: number;
  icon?: string;
  color?: string;
}

export interface ReservationUpdate {
  patient_name?: string;
  email?: string;
  phone?: string;
  doctor_id?: string;
  service_id?: string;
  appointment_date?: string;
  appointment_time?: string;
  status?: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai';
  notes?: string | null;
}

// Queue data for display
export interface QueueData {
  doctor: Doctor;
  current_queue: string | null;
  waiting_count: number;
  estimated_time: string;
}
