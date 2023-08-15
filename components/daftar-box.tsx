"use client"

import { useState } from "react"
import DaftarCard from "./daftar-card"
import { Button } from "./ui/button"
import { DaftarWithUserProps } from "@/types"

interface DaftarBoxProps {
  handleDelete: (daftar: DaftarWithUserProps) => void,
  data: DaftarWithUserProps[]
}

const CardList: React.FC<DaftarBoxProps>  = ({
  data, 
  handleDelete,
}) => {
  return (
    <div className="columns-3 mt-20 space-y-6 gap-6 w-full">
      {data.map((item) => (
        <DaftarCard key={item.id} data={item} handleDelete={() => handleDelete(item)}/>
      ))}
    </div>
  )
}

const DaftarBox: React.FC<DaftarBoxProps> = ({
  data,
  handleDelete,
}) => {
  const reviewPerPage = 10
  const [page, setPage] = useState(1)

  const handleShowMore = () => {
    setPage((prev) => prev + 1)
  }



  return (
    <div className="flex flex-col items-center w-full">
      <CardList data={data.slice(0, reviewPerPage * page)} handleDelete={handleDelete}/>
      <div className="flex justify-center items-center w-full mt-12">
        {page * reviewPerPage < data.length ? (
          <Button size="lg" onClick={handleShowMore}>
            Show More
          </Button>
        ): (
          <></>
        )}
        
      </div>
    </div>
  )
}

export default DaftarBox
