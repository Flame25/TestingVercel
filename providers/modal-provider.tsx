"use client"

import { useEffect, useState } from 'react'

import AddReviewModal from '@/components/add-review-modal'
import AuthModal from '@/components/auth-modal'
import FormModal from '@/components/form-modal'
import RoadMapModal from '@/components/roadmap-modal'
import AddDaftarModal from '@/components/add-daftar-modal'
import UnitMapModal from '@/components/unit-modal'
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <>
      <AuthModal />
      <AddReviewModal />
      <AddDaftarModal/> 
      <FormModal />
      <RoadMapModal />
      <UnitMapModal/> 
    </>
  )
}

export default ModalProvider