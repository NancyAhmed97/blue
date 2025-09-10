import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropertiesCard from '../PropertiesCard/PropertiesCard';
import {  useSearchParams } from 'react-router-dom';
import { fetchProperties } from '../../hooks/properties';
import CardContainer from '../CardContainer/CardContainer';
import { fetchCompounds } from '../../hooks/components';
import Loading from '../../pages/Loading';

function ListGride({ type }) {
      const dispatch = useDispatch();
    const { list,loading:loadingCompounds } = useSelector((state) => state.compounds);
    const { list: propertiesList, loading, error } = useSelector((state) => state.properties);
  const [searchParams] = useSearchParams();
const allParams = React.useMemo(
  () => Object.fromEntries(searchParams.entries()),
  [searchParams])
  console.log(allParams,"allParams");
  const length = Object.keys(allParams).length;

console.log(length); 

useEffect(() => {
    if(type === "properties"){
  dispatch(fetchProperties({country_id:allParams.country,sub_category_id:allParams.subcategory,listing_type:allParams.type,is_installment:allParams.payment,zone_id:allParams.zone,city_id:allParams.city}));
    }else{
          dispatch(fetchCompounds({country_id:allParams.country,city_id:allParams.city,zone_id:allParams.zone_id}));

    }
}, [searchParams.toString()]);
if(loadingCompounds||loading){
<Loading/>
  }else{
      return (
        <div className='my-5 section_container'>

            {type === "properties" ?

                <>
                    <p className='title fw-bold'>عدد العقارات {propertiesList.length}</p>
                    <Container>
                        <Row>
                            {propertiesList.length>0?propertiesList.map((item) => {
                                return (
                                    <Col md={4}>
                                        <PropertiesCard
                                            data={item}
                                        />
                                    </Col>
                                )
                            }):
                            
                            <div className='d-flex justify-content-center align-items-center text-danger fw-bold'>لا توجد عقارات</div>
                            
                            }
                        </Row>
                    </Container>

                </>
                :
          <>
                    <p className='title'>عدد العقارات {list.length}</p>
                    <Container>
                        <Row>
                            {list.length>0?list.map((item) => {
                                return (
                                    <Col md={6}>
                                    <CardContainer item={item}
            />
                                    </Col>
                                )
                            }):
                            
                            <div className='d-flex justify-content-center align-items-center text-danger fw-bold'>لا توجد عقارات</div>
                            
                            }
                        </Row>
                    </Container>

                </>            }
        </div>
    )
}
}

export default ListGride