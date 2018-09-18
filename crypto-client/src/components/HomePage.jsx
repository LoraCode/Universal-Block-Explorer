import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ripple', label: 'Ripple' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'stellar', label: 'Stellar' }
]

const HomePage = () => (
  <Select options={options} />
)

export default HomePage
