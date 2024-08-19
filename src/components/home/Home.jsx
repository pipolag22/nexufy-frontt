import FeaturedProduct from '../Products/FeaturedProduct'
import CategoryList from '../Categories/CategoryList'
import CategoryList from '../Categories/CategoryList'
import Header from '../Headers/Header'
import NavbarHome from '../Navbar'

const Home = () => {
  return (
   <>
    <NavbarHome />
    <Header />
    <FeaturedProduct />
    <CategoryList/>
   </>
  )
}

export default Home