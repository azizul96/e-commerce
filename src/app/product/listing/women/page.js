import CommonListing from "@/components/CommonListing/CommonListing";
import { productByCategory } from "@/services/product";


const WomenAllProducts = async() => {
  const getAllProducts = await productByCategory("women");

  return (
    <CommonListing data={getAllProducts && getAllProducts.data} />
  );
};

export default WomenAllProducts;