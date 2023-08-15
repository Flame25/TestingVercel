"use client"

import { Auth } from "@supabase/auth-ui-react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { ThemeSupa } from '@supabase/auth-ui-shared'

import useAuthModal from "@/hooks/use-auth-modal"
import Modal from "@/components/ui/modal"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from 'axios';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const { open, view, onClose }  = useAuthModal()
  const user = useUser()
  const router = useRouter()

  async function sendUserId() {
    try {
      // 👇️ const data: CreateUserResponse
      const { data, status } = await axios.post<String>(
        '/api/userid',
        { id: user?.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
  
      console.log(JSON.stringify(data, null, 4));
  
      console.log(status);
  
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  
  useEffect(() => {
    if (user) {
      sendUserId()
      onClose()
      router.refresh()
    }
  }, [user, onClose, router])

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  return (
    <Modal open={open} onChange={onChange} title="Welcome back" desc="login to your account">
      <Auth 
        supabaseClient={supabaseClient}
        providers={["google"]}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
                colors: {
                    brand: "#111B47",
                    brandAccent: "rgba(17, 27, 71, 0.2)"
                }
            }
          }
        }}
        view={view}
        redirectTo={window.location.origin}
      />
    </Modal>
  )
}

export default AuthModal