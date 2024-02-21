import React from 'react'
import {useAuth} from '../../hooks'

export const HomeAdmin = () => {
  const {logouth} = useAuth()
  return (
    <div>
        <h1>Home Admin</h1>
    </div>
  )
}
