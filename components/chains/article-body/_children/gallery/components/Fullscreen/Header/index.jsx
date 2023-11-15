import React from 'react'
import { SvgIcon } from '@r7/ui-base-components'

export const FullscreenHeader = ({ className, setView, setFullscreen, view, views }) => {
  return (
    <div className={`${className}-header`}>
      <SvgIcon
        iconName="logo-R7"
        title="Logo-R7"
        className={`${className}-header-logo fill-neutral-high-400`}
        width={35}
        height={31}
      />
      <h3 className={`${className}-header-title`}>Cidade Alerta</h3>
      <div className={`${className}-header-toolbar`}>
        <span className={`${className}-header-toolbar-title`}>Modo de visualização:</span>
        <button
          onClick={() => {
            setView(views.grid)
          }}
          className={`${className}-header-toolbar-btn ${view === views.grid ? 'active' : ''}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6409_53157)">
              <rect width="11" height="11" rx="1" />
              <rect y="13" width="11" height="11" rx="1" />
              <rect x="13" width="11" height="11" rx="1" />
              <rect x="13" y="13" width="11" height="11" rx="1" />
            </g>
            <defs>
              <clipPath id="clip0_6409_53157">
                <rect width="24" height="24" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button
          onClick={() => {
            setView(views.gallery)
          }}
          className={`${className}-header-toolbar-btn ${view === views.gallery ? 'active' : ''}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M0 7.929V1.286C0 .573.573 0 1.286 0h6.643c.353 0 .642.29.642.643v2.143c0 .353-.289.643-.642.643h-4.5v4.5c0 .353-.29.642-.643.642H.643C.289 8.571 0 8.282 0 7.93zM15.429.643v2.143c0 .353.289.643.642.643h4.5v4.5c0 .353.29.642.643.642h2.143c.354 0 .643-.289.643-.642V1.286C24 .573 23.427 0 22.714 0h-6.643c-.353 0-.642.29-.642.643zm7.928 14.786h-2.143c-.353 0-.643.289-.643.642v4.5h-4.5c-.353 0-.642.29-.642.643v2.143c0 .354.289.643.642.643h6.643c.713 0 1.286-.573 1.286-1.286v-6.643c0-.353-.29-.642-.643-.642zM8.571 23.357v-2.143c0-.353-.289-.643-.642-.643h-4.5v-4.5c0-.353-.29-.642-.643-.642H.643c-.354 0-.643.289-.643.642v6.643C0 23.427.573 24 1.286 24h6.643c.353 0 .642-.29.642-.643z"
                      transform="translate(-390 -325) translate(386.5 321) translate(4 4)"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button
          onClick={() => {
            setFullscreen(false)
          }}
          className={`${className}-header-toolbar-close`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g fill="none">
              <g fill="#FFF">
                <g>
                  <g>
                    <path
                      d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm0 21.677c-5.347 0-9.677-4.33-9.677-9.677 0-5.347 4.33-9.677 9.677-9.677 5.347 0 9.677 4.33 9.677 9.677 0 5.347-4.33 9.677-9.677 9.677zM16.926 8.99L13.916 12l3.01 3.01c.227.227.227.595 0 .822l-1.094 1.094c-.227.227-.595.227-.822 0L12 13.916l-3.01 3.01c-.227.227-.595.227-.822 0l-1.094-1.094c-.227-.227-.227-.595 0-.822l3.01-3.01-3.01-3.01c-.227-.227-.227-.595 0-.822l1.094-1.094c.227-.227.595-.227.822 0l3.01 3.01 3.01-3.01c.227-.227.595-.227.822 0l1.094 1.094c.227.227.227.595 0 .822z"
                      transform="translate(-149 -478) translate(132 461) translate(17 17)"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  )
}
