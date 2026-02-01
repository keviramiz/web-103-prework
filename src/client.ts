import { createClient } from "@supabase/supabase-js";

const URL = 'https://vwncldksljgyhgghuhfo.supabase.co';
const API_KEY = 'sb_publishable_FsKKU7wfXkx28_rPvhTrDg_E6SHx1Tb';
export const supabase = createClient(URL, API_KEY);

