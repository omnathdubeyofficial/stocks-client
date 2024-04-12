import React from 'react'

function SocialMediaLogin(props: any) {
  const { label } = props
  return (
    <>
      <p className="social-text">Or {label} with social platform</p>
      <div className="social-media">
        <a href="" className="social-icon">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-twitter" />
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-google" />
        </a>
        <a href="" className="social-icon">
          <i className="fab fa-linkedin-in" />
        </a>
      </div>
    </>
  )
}

export const M_SocialMediaLogin = React.memo(SocialMediaLogin)
