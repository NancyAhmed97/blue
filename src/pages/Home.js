import React, { useEffect } from 'react'
import ProductsCarsoul from '../components/ProductsCarsoul/ProductsCarsoul'
import HeaderHome from '../components/HeaderHome/HeaderHome'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import RatingRealState from '../components/RatingRealState/RatingRealState'
import AdAddContainer from '../components/AdAddContainer/AdAddContainer'
import ProductsCategories from '../components/ProductsCategories/ProductsCategories'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../hooks/categories'
import { fetchCompounds } from '../hooks/components'
import { fetchCountries } from '../hooks/countries'
import { fetchSubcategories } from '../hooks/subcategories'
import { fetchProperties } from '../hooks/properties'
import Loading from './Loading'

function Home() {
  const dispatch=useDispatch();
    const { loading:categoriesLoading } = useSelector((state) => state.categories);
    const { loading:CompoundsLoading } = useSelector((state) => state.compounds);
    const { loading:CountriesLoading } = useSelector((state) => state.countries);
    const { loading:SubcategoriesLoading } = useSelector((state) => state.subcategories);
    const { loading:PropertiesLoading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompounds());
    dispatch(fetchCountries());
    dispatch(fetchSubcategories());
    dispatch(fetchProperties());


  }, [dispatch]); 
  if(categoriesLoading||CompoundsLoading||CountriesLoading||PropertiesLoading||SubcategoriesLoading){
return(
<Loading/>
)
  }else{
   return (
    <div>
      <HeaderHome/>
        <Container>
        <ProductsCarsoul/>
<RatingRealState/>
        </Container>
        <AdAddContainer/>
        <Container>
          {/* <ProductsCategories/> */}
        </Container>
        <Footer/>
    </div>
  )
}
}

export default Home