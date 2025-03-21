'use client'
import React, { useState,useEffect } from 'react'

const InfluencersProfile = () => {
  const [influencerData,setInfluencerData] = useState({})

  useEffect(() => {
    const storedData = localStorage.getItem("influencerData");
    if (storedData) {
      setInfluencerData(JSON.parse(storedData));
    }
  }, []);
  return (
    <div>
      Welcome to Influencers Profile Section
    </div>
  )
}

export default InfluencersProfile
