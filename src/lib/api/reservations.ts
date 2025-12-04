import { supabase } from '../../supabaseClient';
import type { Reservation, ReservationInsert, ReservationUpdate, QueueData, Doctor } from '../../types/database';

interface ReservationFilters {
  doctorId?: string;
  status?: string;
  date?: string;
}

/**
 * Fetch reservations with optional filters
 */
export async function getReservations(filters?: ReservationFilters) {
  let query = supabase
    .from('reservations')
    .select(`
      *,
      doctor:doctors(*),
      service:services(*)
    `)
    .order('created_at', { ascending: false });

  if (filters?.doctorId && filters.doctorId !== 'all') {
    query = query.eq('doctor_id', filters.doctorId);
  }

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters?.date) {
    query = query.eq('appointment_date', filters.date);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }

  return data as Reservation[];
}

/**
 * Get a single reservation by ID
 */
export async function getReservationById(id: string) {
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      doctor:doctors(*),
      service:services(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching reservation:', error);
    throw error;
  }

  return data as Reservation;
}

/**
 * Create a new reservation
 */
export async function createReservation(reservation: ReservationInsert) {
  const { data, error } = await supabase
    .from('reservations')
    .insert([reservation])
    .select(`
      *,
      doctor:doctors(*),
      service:services(*)
    `)
    .single();

  if (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }

  return data as Reservation;
}

/**
 * Update a reservation
 */
export async function updateReservation(id: string, updates: ReservationUpdate) {
  const { data, error } = await supabase
    .from('reservations')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      doctor:doctors(*),
      service:services(*)
    `)
    .single();

  if (error) {
    console.error('Error updating reservation:', error);
    throw error;
  }

  return data as Reservation;
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  id: string,
  status: 'Menunggu' | 'Dikonfirmasi' | 'Dibatalkan' | 'Selesai'
) {
  return updateReservation(id, { status });
}

/**
 * Delete a reservation
 */
export async function deleteReservation(id: string) {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}

/**
 * Get queue status for all doctors on a specific date
 */
export async function getQueueStatus(date?: string): Promise<QueueData[]> {
  const targetDate = date || new Date().toISOString().split('T')[0];

  // Get all active doctors
  const { data: doctors, error: doctorsError } = await supabase
    .from('doctors')
    .select('*')
    .eq('status', true)
    .order('name', { ascending: true });

  if (doctorsError) {
    console.error('Error fetching doctors:', doctorsError);
    throw doctorsError;
  }

  // Get reservations for the date
  const { data: reservations, error: reservationsError } = await supabase
    .from('reservations')
    .select('*')
    .eq('appointment_date', targetDate)
    .in('status', ['Menunggu', 'Dikonfirmasi']);

  if (reservationsError) {
    console.error('Error fetching reservations:', reservationsError);
    throw reservationsError;
  }

  // Build queue data for each doctor
  const queueData: QueueData[] = (doctors as Doctor[]).map((doctor) => {
    const doctorReservations = (reservations as Reservation[])
      .filter((r) => r.doctor_id === doctor.id)
      .sort((a, b) => a.queue_number.localeCompare(b.queue_number));

    const waitingCount = doctorReservations.length;
    const currentQueue = doctorReservations.length > 0 ? doctorReservations[0].queue_number : null;
    
    // Estimate waiting time (average 15 minutes per patient)
    const estimatedMinutes = waitingCount * 15;
    const estimatedTime = `${estimatedMinutes} menit`;

    return {
      doctor,
      current_queue: currentQueue,
      waiting_count: waitingCount,
      estimated_time: estimatedTime,
    };
  });

  return queueData;
}

/**
 * Generate a unique queue number for today
 * Format: A001, A002, ..., A999, B001, B002, ... (max 4 characters to fit VARCHAR(10))
 */
export async function generateQueueNumber(): Promise<string> {
  // Get today's reservations count to generate next number
  const { count, error: countError } = await supabase
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .eq('appointment_date', new Date().toISOString().split('T')[0]);

  if (countError) {
    console.error('Error counting reservations:', countError);
    throw countError;
  }

  const nextNumber = (count || 0) + 1;
  
  // Generate prefix (A-Z cycling) - A for 1-999, B for 1000-1999, etc.
  const prefixIndex = Math.floor((nextNumber - 1) / 999) % 26;
  const prefix = String.fromCharCode(65 + prefixIndex); // A=65 in ASCII
  
  // Get number within prefix (1-999)
  const numberInPrefix = ((nextNumber - 1) % 999) + 1;
  
  // Format: A001, B023, etc.
  const queueNumber = `${prefix}${String(numberInPrefix).padStart(3, '0')}`;
  
  // Double check uniqueness
  const { data: existing, error: checkError } = await supabase
    .from('reservations')
    .select('queue_number')
    .eq('queue_number', queueNumber)
    .maybeSingle();
  
  if (checkError) {
    console.error('Error checking queue number:', checkError);
    throw checkError;
  }
  
  // If exists (shouldn't happen but safety check), try with timestamp suffix
  if (existing) {
    const timestamp = Date.now().toString().slice(-3);
    return `${prefix}${timestamp}`;
  }
  
  return queueNumber;
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Today's reservations
  const { data: todayReservations, error: todayError } = await supabase
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .eq('appointment_date', today);

  if (todayError) throw todayError;

  // This week's reservations
  const { data: weekReservations, error: weekError } = await supabase
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .gte('appointment_date', weekAgo);

  if (weekError) throw weekError;

  // Active doctors today
  const { data: activeDoctors, error: doctorsError } = await supabase
    .from('doctors')
    .select('*', { count: 'exact', head: true })
    .eq('status', true);

  if (doctorsError) throw doctorsError;

  // New patients this week (unique emails)
  const { data: newPatients, error: patientsError } = await supabase
    .from('reservations')
    .select('email')
    .gte('created_at', weekAgo);

  if (patientsError) throw patientsError;

  const uniqueEmails = new Set((newPatients || []).map((r: any) => r.email));

  return {
    todayReservations: todayReservations?.length || 0,
    weekReservations: weekReservations?.length || 0,
    activeDoctors: activeDoctors?.length || 0,
    newPatients: uniqueEmails.size,
  };
}
