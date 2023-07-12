import React from 'react'

export default function Logo() {
    const logo = "https://images.squarespace-cdn.com/content/v1/56962bdcd8af10829fde684a/1492038591117-7F28J09AGCOHY8IHL83E/Chabad+Logo+-+Vertical+-+Color?format=50w"
  return (
    <div className='text-center'>
        <img alt='logo' src={logo}/>
    </div>
  )
}
