import React from 'react'
import "./BreadcrumbContainer.css"
import { Breadcrumb } from 'react-bootstrap'
function BreadcrumbContainer({linkTitle,title,activeTitle}) {
  return (
    <div>
            <Breadcrumb>
      <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/" className='mx-2'>
        {linkTitle}
      </Breadcrumb.Item>

      /
      <Breadcrumb.Item active className='mx-2'>{title}</Breadcrumb.Item>
      <Breadcrumb.Item active className='mx-2'>{activeTitle}</Breadcrumb.Item>
    </Breadcrumb>
    </div>
  )
}

export default BreadcrumbContainer