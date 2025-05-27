import React from 'react'
import DoctorConsult from '../features/ConsultComponents/DoctorConsult2'
import { doctors } from '../features/ConsultComponents/doctors'

const testingpage = () => {
  return (
    <div className="p-6">
        <DoctorConsult doctors={doctors} />
    </div>
  )
}

export default testingpage