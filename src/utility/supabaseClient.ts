import { createClient } from '@refinedev/supabase'
import { Database } from '../types/supabase'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabaseClient = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)
