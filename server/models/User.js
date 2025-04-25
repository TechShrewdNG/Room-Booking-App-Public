import { createClient } from '@supabase/supabase-js'

// Check if environment variables are loaded
console.log('Supabase URL:', process.env.SUPABASE_URL)
console.log('Supabase Key:', process.env.SUPABASE_KEY?.slice(0, 5) + '...')

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Supabase credentials not configured. Please check your .env file')
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  return { data, error }
}

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
  return { data, error }
}

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}
