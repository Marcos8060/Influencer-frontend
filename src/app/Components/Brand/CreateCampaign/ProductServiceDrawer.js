"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import InputComponent from "../../SharedComponents/InputComponent";
import { useDispatch } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import ExistingProducts from "./ExistingProducts";
import { createProduct } from "@/redux/services/campaign";
import toast from "react-hot-toast";
import ProductCoverImageModal from "./productCoverImage";

export default function ProductServiceDrawer({ setSelectedProducts,selectedProducts }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    description: "",
    productManualUrl: "",
    productManualText: "",
    price: "",
    productImages: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createProduct(auth, details);

      if (response.status === 200 || response.status === 201) {
        toast.success("Product saved successfully");
        setVisible(false);
      } else {
        toast.error(response.response.data.errorMessage[0]);
      }
    } catch (error) {
      if (error.response?.data?.errorMessage) {
        toast.error(error.response.data.errorMessage[0]);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      setVisible(false);
    }
  };

  return (
    <>
      <div className="card flex justify-content-center text-color">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="md:w-5/12 w-full"
        >
          <section className="border-b border-b-input w-full flex items-center justify-center">
            <div className="flex items-center gap-8">
              <div
                className={`${
                  currentTab === 1
                    ? "text-primary p-2 font-semibold border-b-2 border-primary text-sm"
                    : "text-sm"
                } cursor-pointer flex gap-2 items-center`}
                onClick={() => setCurrentTab(1)}
              >
                <p>Add New</p>
              </div>
              <div
                className={`${
                  currentTab === 2
                    ? "text-primary p-2 font-semibold border-b-2 border-primary text-sm"
                    : "text-sm"
                } cursor-pointer flex items-center gap-2`}
                onClick={() => setCurrentTab(2)}
              >
                <p>Select Existing</p>
              </div>
            </div>
          </section>
          {currentTab === 1 && (
            <div>
              <section className="border border-input rounded p-4 mt-4">
                <div className="mb-4">
                  <h2 className="font-semibold text-xs text-center">Product | Service Image</h2>
                </div>
                <ProductCoverImageModal setDetails={setDetails} />
              </section>
              <form className="my-4">
                <div className="space-y-4">
                  {/* NAME */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Product/Service Name
                    </label>
                    <InputComponent
                      className="w-full"
                      required
                      placeholder="name"
                      name="name"
                      value={details.name}
                      onChange={(e) =>
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* DESCRIPTION */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Product/Service Description
                    </label>
                    <TextAreaComponent
                      className="w-full"
                      required
                      placeholder="description"
                      name="description"
                      value={details.description}
                      onChange={(e) =>
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* PRICE */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Price
                    </label>
                    <InputComponent
                      className="w-full"
                      required
                      placeholder="price"
                      name="price"
                      type="number"
                      value={details.price}
                      onChange={(e) =>
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* WEBSITE */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Website
                    </label>
                    <InputComponent
                      className="w-full"
                      placeholder="website"
                      required
                      name="productManualUrl"
                      value={details.productManualUrl}
                      onChange={(e) =>
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </section>
                  {/* ACCESS INSTRUCTIONS */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Access Instructions
                    </label>
                    <TextAreaComponent
                      className="w-full"
                      placeholder="instructions"
                      name="productManualText"
                      required
                      value={details.productManualText}
                      onChange={(e) =>
                        setDetails((prevDetails) => ({
                          ...prevDetails,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </section>
                  <section className="flex justify-end">
                    <div className="flex items-center gap-4">
                      <ButtonComponent
                        disabled={loading}
                        label={loading ? "Processing..." : "Save"}
                        onClick={handleSubmit}
                      />
                    </div>
                  </section>
                </div>
              </form>
            </div>
          )}
          {currentTab === 2 && <ExistingProducts setVisible={setVisible} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />}
        </Sidebar>
        <button
          onClick={() => setVisible(true)}
          className="bg-primary text-white rounded text-xs px-4 py-2 w-full"
        >
          {selectedProducts.length > 0 ? 'Select another product' : 'Select a product or service'}
        </button>
      </div>
    </>
  );
}
