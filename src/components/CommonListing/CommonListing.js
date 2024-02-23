"use client"

import ProductButton from "./ProductButton/ProductButton";
import ProductTile from "./ProductTile/ProductTile";


const data = [
  {
_id :'65d825633546e808fc2ce13e',
name:"Small Bag",
description:"Super Handy Bag",
price:25,
category:"kids",
sizes:[
  {
    id: 's',
    label: 'S'
  },
],
deliveryInfo:"Free Delivery",
onSale:"yes",
priceDrop:0,
imageUrl:"https://firebasestorage.googleapis.com/v0/b/e-commerce-cb18f.appspot.com/o/ecommerce%2Fbag.jpg-1708662793054-zoitm1hgcr?alt=media&token=fac056aa-bb83-4e2d-a057-817339d28d1e",

}
]
const CommonListing = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
            
        </div>
      </div>
    </section>
  );
};

export default CommonListing;