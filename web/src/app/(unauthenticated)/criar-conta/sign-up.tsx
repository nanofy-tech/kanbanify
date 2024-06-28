'use client'

import {
  useState,
  useContext,
  createContext,
  type Dispatch,
  type SetStateAction,
} from 'react'

import FormSendEmail from './components/form-send-email'
import FormSendCode from './components/form-send-code'
import FormSignUp from './components/form-sign-up'

type IContextProps = {
  step: number
  handleNextStep: () => void
  email: string
  setEmail: Dispatch<SetStateAction<string>>
}

const ctx = createContext<IContextProps>({
  step: 0,
  handleNextStep: () => {},
  email: '',
  setEmail: () => {},
})

export default function Provider() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const contextValues = { step, handleNextStep, email, setEmail }

  return (
    <ctx.Provider value={contextValues}>
      <SignUp />
    </ctx.Provider>
  )
}

export const useStep = () => {
  const context = useContext(ctx)

  if (!context) {
    throw new Error("useStep must be inside 'Provider'")
  }

  return context
}

function SignUp() {
  const { step } = useStep()

  return (
    <>
      {step === 0 && <FormSendEmail />}

      {step === 1 && <FormSendCode />}

      {step === 2 && <FormSignUp />}
    </>
  )
}
