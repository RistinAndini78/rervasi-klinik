import { supabase } from '../../supabaseClient';
import type { Service, ServiceInsert, ServiceUpdate } from '../../types/database';

/**
 * Fetch all services from database
 */
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }

  return data as Service[];
}

/**
 * Get a single service by ID
 */
export async function getServiceById(id: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    throw error;
  }

  return data as Service;
}

/**
 * Create a new service
 */
export async function createService(service: ServiceInsert) {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }

  return data as Service;
}

/**
 * Update an existing service
 */
export async function updateService(id: string, updates: ServiceUpdate) {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }

  return data as Service;
}

/**
 * Delete a service
 */
export async function deleteService(id: string) {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}
