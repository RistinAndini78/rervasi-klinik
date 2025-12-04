import { supabase } from '../../supabaseClient';
import type { Doctor, DoctorInsert, DoctorUpdate } from '../../types/database';

/**
 * Fetch all doctors from database
 * @param activeOnly - If true, only fetch active doctors
 */
export async function getDoctors(activeOnly = false) {
  let query = supabase
    .from('doctors')
    .select('*')
    .order('name', { ascending: true });

  if (activeOnly) {
    query = query.eq('status', true);
  }

  const { data, error } = await query;

  console.log(data);

  if (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }

  return data as Doctor[];
}

/**
 * Get a single doctor by ID
 */
export async function getDoctorById(id: string) {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }

  return data as Doctor;
}

/**
 * Create a new doctor
 */
export async function createDoctor(doctor: DoctorInsert) {
  const { data, error } = await supabase
    .from('doctors')
    .insert([doctor])
    .select()
    .single();

  if (error) {
    console.error('Error creating doctor:', error);
    throw error;
  }

  return data as Doctor;
}

/**
 * Update an existing doctor
 */
export async function updateDoctor(id: string, updates: DoctorUpdate) {
  const { data, error } = await supabase
    .from('doctors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating doctor:', error);
    throw error;
  }

  return data as Doctor;
}

/**
 * Delete a doctor
 */
export async function deleteDoctor(id: string) {
  const { error } = await supabase
    .from('doctors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
}

/**
 * Toggle doctor status (active/inactive)
 */
export async function toggleDoctorStatus(id: string, currentStatus: boolean) {
  return updateDoctor(id, { status: !currentStatus });
}
