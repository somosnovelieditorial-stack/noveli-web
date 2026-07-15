import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'undefined' && supabaseAnonKey !== 'undefined') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error initializing Supabase client:', error)
  }
} else {
  console.warn('Supabase credentials missing. App will run in fallback content mode.')
}

if (import.meta.env.DEV) {
  console.log('Supabase conectado:', !!supabase)
}

export { supabase }
