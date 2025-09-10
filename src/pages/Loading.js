import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh",backgroundColor:"rgba(31, 71, 122, 1)" }}>
    <Spinner animation="border" role="status" variant="light" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
        </div>
)
}
