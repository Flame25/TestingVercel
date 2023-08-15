import { Database } from "@/types_db"
import exp from "constants"

export interface ReviewWithUserProps {
    content: string | null
    created_at: string | null
    id: string
    tags: string[] | null
    user_id: Database["public"]["Tables"]["users"]["Row"]
}


export interface RoadmapModalData {
    semester: string,
    tahun: string,
    desc: string,
    details: string[],
}

export interface UnitModalData {
    nama: string,
    desc: string,
    details: string[],
}

export interface DaftarWithUserProps{
    deskripsi: string | null
    created_at: string | null
    id: string
    nama: string | null
    roadmap_data : JSON | null 
    user_id: Database["public"]["Tables"]["users"]["Row"]
}

