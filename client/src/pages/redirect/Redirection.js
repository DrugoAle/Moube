import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Redirection = ({id, route }) => {
    const navigate = useNavigate()

    useEffect(() => {
     navigate(`/${route}/${id}`);
    }, [])
    
  return (
  <></>
  )
}
