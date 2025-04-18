"use client";
import React, { useState, useEffect } from "react";
import InputComponent from "../../SharedComponents/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllProducts } from "@/redux/features/stepper/campaign-stepper";
import toast from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const ExistingProducts = ({
  setSelectedProducts,
  selectedProducts,
  setVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((store) => store.campaign);
  const dispatch = useDispatch();
  const auth = useAuth();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getAllProducts(auth));
      if (response.status === 200) {
        toast.success("Product fetched successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = () => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(data.id)
        ? prevSelected.filter((id) => id !== data.id)
        : [...prevSelected, data.id]
    );
  };

  useEffect(() => {
    if (auth) {
      fetchProducts();
    }
  }, [auth]);
  return (
    <div className="mt-6 text-color">
      <InputComponent placeholder="Search product title" />
      {loading ? (
        <Skeleton
          baseColor="#E6E7EB"
          highlightColor="#f0f0f0"
          count={4}
          height={100}
        />
      ) : (
        <section className="space-y-4 mt-8">
          {products.map((data) => {
            const isSelected = selectedProducts.includes(data.id);
            return (
              <div
                key={data.id}
                className={` ${
                  isSelected
                    ? "border border-primary rounded p-1 flex gap-4 py-2"
                    : "flex gap-4 py-2"
                } `}
              >
                <div className="w-4/12">
                  {data.productImages.map((img) => (
                    <img
                      key={img.id}
                      className="h-24 w-full object-cover rounded"
                      src={img.url}
                      alt=""
                    />
                  ))}
                </div>
                <div className="w-8/12 space-y-2">
                  <p className="text-sm font-bold">{data.name}</p>
                  <p className="text-xs">{data.description}</p>
                  <button
                    onClick={() =>
                      setSelectedProducts((prevSelected) =>
                        prevSelected.includes(data.id)
                          ? prevSelected.filter((id) => id !== data.id)
                          : [...prevSelected, data.id]
                      )
                    }
                    className={`border border-primary ${
                      isSelected ? "text-red" : "text-color"
                    } rounded text-xs px-3 py-2`}
                  >
                    {isSelected ? "Remove Product" : "Select Product"}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
      <div className="flex justify-end my-2">
        {selectedProducts && (
          <button onClick={() => setVisible(false)} className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-light rounded px-4 py-2">
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default ExistingProducts;
