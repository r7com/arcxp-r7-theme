import React from 'react'

export const Title = ({ voted, className }) => {
  return (
    <h4 className={className}>
      {voted ? (
        <p>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37256 22.6274 4 16 4C9.37256 4 4 9.37256 4 16C4 22.6274 9.37256 28 16 28ZM23.5152 13.4507L14.6119 22.3539C14.3096 22.6562 13.8194 22.6562 13.517 22.3538L8.48478 17.3216C8.18246 17.0193 8.18246 16.5291 8.48478 16.2267L9.57964 15.1319C9.88201 14.8296 10.3722 14.8296 10.6745 15.1319L14.0645 18.5218L21.3254 11.261C21.6278 10.9586 22.118 10.9586 22.4203 11.261L23.5152 12.3558C23.8175 12.6581 23.8175 13.1483 23.5152 13.4507Z"
              fill="#43A047"
            />
          </svg>
          <span>Voto computado</span>
        </p>
      ) : (
        <p>Resultado Parcial</p>
      )}
    </h4>
  )
}
