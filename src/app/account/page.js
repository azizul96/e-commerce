"use client"

import InputComponent from "@/components/FormElements/InputComponent/InputComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


const Account = () => {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter()

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: "top-right",
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: "top-right",
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: "top-right",
      });
    }
  }


  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl mt-20">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* we have render random user image here */}
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button onClick={()=>router.push('/orders')} className="mt-5  inline-block bg-orange-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-sm">
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses :</h1>
              {pageLevelLoader ? (
                <PulseLoader
                  color={"#000000"}
                  loading={pageLevelLoader}
                  size={15}
                  data-testid="loader"
                />
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {addresses && addresses.length ? (
                    addresses.map((item) => (
                      <div className="border p-6" key={item._id}>
                        <p>Name : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <button
                          onClick={() => handleUpdateAddress(item)}
                          className="mt-5 mr-5 inline-flex bg-green-600 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide items-center gap-2 rounded-md shadow-xl  shadow-green-300"
                        >
                          Update<FiEdit/>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="mt-5 bg-red-600 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide inline-flex items-center gap-2 rounded-md shadow-xl  shadow-red-300"
                        > 
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"Deleting"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Delete " 
                          )} <MdDelete/>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No address found ! Please add a new address below</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-5  inline-block bg-orange-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-sm"
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className="mt-5  inline-block bg-orange-600 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded-sm"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;