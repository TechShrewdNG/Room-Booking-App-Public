import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export const getRooms = async () => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
  return { data, error }
}

export const getRoomById = async (id) => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single()
  return { data, error }
}

export const createRoom = async (roomData) => {
  const { data, error } = await supabase
    .from('rooms')
    .insert(roomData)
    .select()
  return { data, error }
}
