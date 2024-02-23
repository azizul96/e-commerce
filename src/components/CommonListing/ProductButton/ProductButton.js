"use client"
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";





const ProductButton = ({item}) => {
  const { setCurrentUpdatedProduct, componentLevelLoader, setComponentLevelLoader} = useContext(GlobalContext)
  const pathName = usePathname()
  const router = useRouter()

  const isAdminView = pathName.includes('admin-view')

  const handleDeleteProduct = async(item) =>{
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return (isAdminView ? 
    <>
      <button
      onClick={()=>{
        setCurrentUpdatedProduct(item)
        router.push("/admin-view/add-product")
      }}
      className="mt-1.5 flex w-full justify-center bg-[#ba7d38] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >Update</button>
      <button
      onClick={() => handleDeleteProduct(item)}
      className="mt-1.5 flex w-full justify-center bg-[#C70039] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          /> ) : ( "DELETE" )
        }
      </button>
    </>
    :
    <>
      <button
      className="mt-1.5 flex w-full justify-center bg-[#C70039] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Add To Cart
      </button>
    </>
  )
};

export default ProductButton;