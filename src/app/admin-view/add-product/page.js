"use client"

import InputComponent from "@/components/FormElements/InputComponent/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent/TileComponent";
import { AvailableSizes, adminAddProductFormControls } from "@/utils";


const AdminAddProduct = () => {

  const handleImage =()=>{
    h
  }

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col justify-start items-start p-10 bg-white shadow-2xl rounded-xl relative ">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">

          <input  
          accept="image/*"
          max="1000000"
          type="file"
          onChange={handleImage}
          />

          <div className=" flex gap-2 flex-col">
            <label>Available Size</label>
            <TileComponent data={AvailableSizes} />
          </div>
          {
            adminAddProductFormControls.map(controlItem => 
              controlItem.componentType=== 'input' ?
              <InputComponent
              type={controlItem.type}
              placeholder={controlItem.placeholder}
              label={controlItem.label}

              /> 
              :
              controlItem.componentType=== 'select' ? 
              <SelectComponent
              label={controlItem.label}
              option={controlItem.options}
              />
              : null) 
          }
          <button
          className="inline-flex w-full items-center justify-center bg-[#C70039] px-6 py-3 text-white text-lg uppercase font-medium tracking-wide rounded-sm"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;