import Footer from "../features/common/Footer";
import NavBar from "../features/navbar/NavBar";
import ProductDetails from "../features/product/components/ProductDetails";

function ProductDetailsPage() {
    return (
        <div>
<NavBar>
    <ProductDetails></ProductDetails>
</NavBar>
<Footer></Footer>
        </div>
        

    );
}

export default ProductDetailsPage;