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
import Select from "react-select";
import { currencyData } from "./currencyData";

// Helper to get user's locale currency
function getDefaultCurrency() {
  try {
    const locale = navigator.language;
    const region = locale.split("-")[1] || "US";
    // Try to find a currency for the region
    const found = currencyData.find(c => c.country && c.country.toLowerCase().includes(region.toLowerCase()));
    return found ? found.code : "USD";
  } catch {
    return "USD";
  }
}

export default function ProductServiceDrawer({
  setSelectedProducts,
  selectedProducts,
}) {
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
    productImages: [],
    currency: getDefaultCurrency(),
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    productManualUrl: "",
    productManualText: "",
    price: "",
    currency: "",
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      description: "",
      productManualUrl: "",
      productManualText: "",
      price: "",
      currency: "",
    };

    if (!details.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }

    if (!details.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!details.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(details.price)) {
      newErrors.price = "Price must be a number";
      isValid = false;
    } else {
      // Validate decimals for selected currency
      const selectedCurrency = currencyData.find(c => c.code === details.currency);
      if (selectedCurrency && selectedCurrency.decimals === 0 && details.price.includes(".")) {
        newErrors.price = `No decimals allowed for ${selectedCurrency.code}`;
        isValid = false;
      }
    }

    if (!details.productManualUrl.trim()) {
      newErrors.productManualUrl = "Website URL is required";
      isValid = false;
    } else if (!/^https?:\/\/.+\..+/.test(details.productManualUrl)) {
      newErrors.productManualUrl = "Please enter a valid URL";
      isValid = false;
    }

    if (!details.productManualText.trim()) {
      newErrors.productManualText = "Access instructions are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const response = await createProduct(auth, details);

      if (response.status === 200 || response.status === 201) {
        toast.success("Product saved successfully");
        if (response.data?.id) {
          setSelectedProducts((prev) => [...prev, response.data.id]);
        }
        setDetails({
          name: "",
          description: "",
          productManualUrl: "",
          productManualText: "",
          price: "",
          productImages: [],
          currency: getDefaultCurrency(),
        });
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
    }
  };

  const descriptionLength = details.description.length || 0;
  const manualLength = details.productManualText.length || 0;

  return (
    <>
      <div className="card flex justify-content-center text-color">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          className="md:w-4/12 w-full"
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
                  <h2 className="font-semibold text-xs text-center">
                    Product | Service Image
                  </h2>
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
                    {errors.name && (
                      <p className="text-red text-xs mt-1">{errors.name}</p>
                    )}
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
                    {details.description && (
                      <div className="mt-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              descriptionLength < 30
                                ? "bg-red"
                                : descriptionLength < 60
                                ? "bg-yellow"
                                : "bg-green"
                            }`}
                            style={{
                              width: `${Math.min(descriptionLength, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {descriptionLength < 30
                            ? "Too brief"
                            : descriptionLength < 60
                            ? "Good start"
                            : "Excellent description"}
                        </p>
                      </div>
                    )}
                    {errors.description && (
                      <p className="text-red text-xs mt-1">
                        {errors.description}
                      </p>
                    )}
                  </section>
                  {/* PRICE */}
                  <section className="">
                    <label className="text-xs font-semibold" htmlFor="">
                      Price
                    </label>
                    <div className="flex gap-1 items-center">
                      {/* Currency symbol */}
                      <span className="px-2 text-base font-semibold">
                        {currencyData.find(c => c.code === details.currency)?.symbol || "$"}
                      </span>
                      {/* Price input with formatting */}
                      <input
                        className="w-full border border-input rounded px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                        placeholder="price"
                        name="price"
                        type="text"
                        inputMode="decimal"
                        value={details.price}
                        onChange={e => {
                          // Only allow valid input for selected currency
                          const selectedCurrency = currencyData.find(c => c.code === details.currency);
                          let val = e.target.value.replace(/[^\d.]/g, "");
                          if (selectedCurrency && selectedCurrency.decimals === 0) {
                            val = val.replace(/\..*/, "");
                          }
                          setDetails(prev => ({ ...prev, price: val }));
                        }}
                        aria-label="Price"
                      />
                      {/* Currency dropdown with react-select */}
                      <div className="min-w-[160px]">
                        <Select
                          classNamePrefix="currency-select"
                          options={currencyData.map(c => ({
                            value: c.code,
                            label: `${c.symbol} ${c.code} - ${c.name}`,
                          }))}
                          value={currencyData
                            .filter(c => c.code === details.currency)
                            .map(c => ({ value: c.code, label: `${c.symbol} ${c.code} - ${c.name}` }))}
                          onChange={option => {
                            setDetails(prev => ({ ...prev, currency: option.value }));
                          }}
                          isSearchable
                          aria-label="Currency"
                        />
                      </div>
                    </div>
                    {errors.price && (
                      <p className="text-red text-xs mt-1">{errors.price}</p>
                    )}
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
                      onChange={(e) => {
                        let url = e.target.value;
                        setDetails({ ...details, productManualUrl: url });
                      }}
                      onFocus={(e) => {
                        if (e.target.value === "https://") {
                          e.target.setSelectionRange(8, 8);
                        }
                      }}
                    />
                    {errors.productManualUrl && (
                      <p className="text-red text-xs mt-1">
                        {errors.productManualUrl}
                      </p>
                    )}
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
                    {details.productManualText && (
                      <div className="mt-2">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              manualLength < 30
                                ? "bg-red"
                                : manualLength < 60
                                ? "bg-yellow"
                                : "bg-green"
                            }`}
                            style={{
                              width: `${Math.min(manualLength, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {manualLength < 30
                            ? "Too brief"
                            : manualLength < 60
                            ? "Good start"
                            : "Excellent description"}
                        </p>
                      </div>
                    )}
                    {errors.productManualText && (
                      <p className="text-red text-xs mt-1">
                        {errors.productManualText}
                      </p>
                    )}
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
          {currentTab === 2 && (
            <ExistingProducts
              setVisible={setVisible}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          )}
        </Sidebar>
        <button
          onClick={() => setVisible(true)}
          className="bg-gradient-to-r from-primary to-secondary text-white rounded text-xs px-4 py-2 w-full"
        >
          {selectedProducts.length > 0
            ? "Select another product"
            : "Select a product or service"}
        </button>
      </div>
    </>
  );
}
