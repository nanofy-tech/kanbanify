import { Metadata } from 'next'
import Form from './form'

export const metadata: Metadata = {
  title: 'Reportar Bug',
}

export default function ReportBug() {
  return (
    <>
      <Form />
    </>
  )
}
