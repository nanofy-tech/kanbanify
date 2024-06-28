import { ComponentProps } from 'react'

export default function Kanbanfy(props: ComponentProps<'svg'>) {
  return (
    <svg
      id="Camada_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 500 500"
      xmlSpace="preserve"
      {...props}
    >
      <style>{'.st1{fill:#fff}'}</style>
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1={250}
        y1={500}
        x2={250}
        y2={0}
        gradientTransform="matrix(1 0 0 -1 0 500)"
      >
        <stop offset={0} stopColor="#393b90" />
        <stop offset={1} stopColor="#5560a9" />
      </linearGradient>
      <path
        d="M443.6 500H56.4C25.3 500 0 474.7 0 443.6V56.4C0 25.3 25.3 0 56.4 0h387.1C474.7 0 500 25.3 500 56.4v387.1c0 31.2-25.3 56.5-56.4 56.5z"
        fill="url(#SVGID_1_)"
      />
      <path
        className="st1"
        d="M155.5 438.5H49.3c-2.6 0-4.8-2.5-4.8-5.6V68.7c0-3.1 2.1-5.6 4.8-5.6h106.2c2.6 0 4.8 2.5 4.8 5.6V433c0 3-2.2 5.5-4.8 5.5zM303.1 257.4H196.9c-2.6 0-4.8-1.3-4.8-2.9V66c0-1.6 2.1-2.9 4.8-2.9h106.2c2.6 0 4.8 1.3 4.8 2.9v188.5c0 1.6-2.2 2.9-4.8 2.9zM452.4 349.7H346.2c-2.6 0-4.8-1.9-4.8-4.3v-278c0-2.4 2.1-4.3 4.8-4.3h106.2c2.6 0 4.8 1.9 4.8 4.3v278.1c0 2.3-2.2 4.2-4.8 4.2z"
      />
    </svg>
  )
}
