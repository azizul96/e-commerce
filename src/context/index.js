"use client"
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: "",
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
  };
export const GlobalContext = createContext(null)

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

export default function GlobalState({children}){

    const [showNavModal, setShowNavModal] = useState(false)
    const [pageLevelLoader, setPageLevelLoader] = useState(false)
    const [componentLevelLoader, setComponentLevelLoader] = useState( {loading: false, id: ''})
    const [isAuthUser, setIsAuthUser] = useState(null)
    const [user, setUser] = useState(null)
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [addressFormData, setAddressFormData] = useState({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
    });
    const [allOrdersForUser, setAllOrdersForUser] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);
    const [checkoutFormData, setCheckoutFormData] = useState( initialCheckoutFormData );


    const router = useRouter();
    const pathName = usePathname();


    useEffect(()=>{
        console.log(Cookies.get('token'));

        if(Cookies.get('token')!== undefined){
            setIsAuthUser(true)
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData)
        }
        else{
            setIsAuthUser(false)
        }
    },[Cookies])

    
    return (
    <GlobalContext.Provider 
    value={{
        showNavModal, setShowNavModal,
        pageLevelLoader, setPageLevelLoader,
        componentLevelLoader, setComponentLevelLoader,
        isAuthUser, setIsAuthUser,
        user, setUser,
        currentUpdatedProduct, setCurrentUpdatedProduct,
        showCartModal, setShowCartModal,
        cartItems, setCartItems,
        addresses, setAddresses,
        addressFormData, setAddressFormData,
        allOrdersForUser, setAllOrdersForUser,
        orderDetails, setOrderDetails,
        allOrdersForAllUsers, setAllOrdersForAllUsers,
        checkoutFormData, setCheckoutFormData,

    }}
    >
        {children}
    </GlobalContext.Provider>
    )
}