import React from 'react'

import './AvatarName.css'
import CurrentAvatar from './CurrentAvatar'
import CurrentName from './CurrentName'

const AvatarName = () => {
    return (
        <div className='nameAvatar'>
            <CurrentAvatar /> <p><CurrentName /></p>
        </div>
    )
}

export default AvatarName
