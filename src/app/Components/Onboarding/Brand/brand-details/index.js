"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import TextAreaComponent from "@/app/Components/SharedComponents/TextAreaComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { ReactCountryFlag } from "react-country-flag";
import countries from "country-list";
import { countryPhoneData } from "./countryPhoneData";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from '@/app/layout';
import { Select, Modal, Input } from "antd";
import { Country, State, City } from 'country-state-city';
const countryData = countries.getData();
import { usStates, ukCitiesJson, ukCountiesJson, ukCountryParts } from "@/assets/utils/locations";

const BrandDetails = () => {
  const formData = useSelector((store) => store.stepper.formData);
  const dispatch = useDispatch();
  const { location } = useLocation();
  const [details, setDetails] = useState({
    brandWebsite: formData.brandWebsite || undefined,
    legalCompanyName: formData.legalCompanyName || undefined,
    country: formData.country || { name: "", code: "" },
    phoneNumber: formData.phoneNumber || { code: "", number: "" },
    city: formData.city || undefined,
    address: formData.address || undefined,
    zipCode: formData.zipCode || undefined,
    brandName: formData.brandName || undefined,
    brandDescription: formData.brandDescription || undefined,
    brandUkCountry: formData.brandUkCountry || "",
    brandState: formData.brandState || "",
  });
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isPhoneCodeOpen, setIsPhoneCodeOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [filteredPhoneCodes, setFilteredPhoneCodes] =
    useState(countryPhoneData);
  const [isPhoneCodeModalOpen, setIsPhoneCodeModalOpen] = useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = useState("");

  // Dynamic dropdown state
  const selectedCountryCode = details.country?.code || "";
  const [selectedCityName, setSelectedCityName] = useState(details.city || "");
  const [selectedUkCountry, setSelectedUkCountry] = useState(details.brandUkCountry || "");
  const [selectedCounty, setSelectedCounty] = useState(details.brandState || "");
  const [selectedCity, setSelectedCity] = useState(details.city || "");
  const [selectedUsState, setSelectedUsState] = useState(details.brandState || "");

  // Get all countries and cities (no states)
  const countriesList = Country.getAllCountries();
  let dropdownList = [];
  let dropdownType = 'city';
  if (selectedCountryCode === 'US') {
    dropdownList = State.getStatesOfCountry('US');
    dropdownType = 'state';
  } else if (selectedCountryCode === 'GB') {
    dropdownList = State.getStatesOfCountry('GB');
    dropdownType = 'county';
  } else {
    dropdownList = selectedCountryCode ? City.getCitiesOfCountry(selectedCountryCode) : [];
    dropdownType = 'city';
  }

  const countryDropdownRef = useRef(null);
  const phoneCodeDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(setCurrentStep(0));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
      if (
        phoneCodeDropdownRef.current &&
        !phoneCodeDropdownRef.current.contains(event.target)
      ) {
        setIsPhoneCodeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (location && !hasAutoFilled) {
      setDetails((prev) => {
        if (
          !prev.address &&
          !prev.city &&
          !prev.country.name &&
          !prev.zipCode
        ) {
          const countryCode = location.countryCode || "";
          setSelectedCityName(location.city || "");

          return {
            ...prev,
            address: location.addressLine1 || "",
            city: location.city || "",
            country: {
              name: location.country || "",
              code: countryCode,
            },
            zipCode: location.zipCode || "",
          };
        }
        return prev;
      });
      setHasAutoFilled(true);
    }
  }, [location, hasAutoFilled]);

  // When country changes, update phoneNumber.code automatically
  useEffect(() => {
    if (selectedCountryCode) {
      const phoneData = countryPhoneData.find(item => item.code === selectedCountryCode);
      const newCode = phoneData?.dial_code || '+1';
      if (details.phoneNumber.code !== newCode) {
        const newDetails = {
          ...details,
          phoneNumber: {
            ...details.phoneNumber,
            code: newCode,
          },
        };
        setDetails(newDetails);
        dispatch(updateFormData(newDetails));
      }
    }
  }, [selectedCountryCode, details.phoneNumber, dispatch]);

  const handleCountrySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredCountries(
      countryData.filter((country) =>
        country.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const fetchLocationData = async (countryCode) => {
    setIsLoadingLocation(true);
    try {
      // First try with more specific query
      let response = await fetch(
        `https://nominatim.openstreetmap.org/search?country=${countryCode}&format=json&addressdetails=1&limit=1&accept-language=en`
      );
      let data = await response.json();

      // If no results, try a more general query
      if (!data || data.length === 0) {
        response = await fetch(
          `https://nominatim.openstreetmap.org/search?country=${countryCode}&format=json&featuretype=settlement&limit=1&accept-language=en`
        );
        data = await response.json();
      }

      if (data && data.length > 0) {
        const location = data[0];
        setDetails((prev) => ({
          ...prev,
          city:
            location.address.city ||
            location.address.town ||
            location.address.village ||
            location.address.county ||
            prev.city,
          address: location.address.road
            ? `${location.address.road}${
                location.address.house_number
                  ? " " + location.address.house_number
                  : ""
              }`
            : prev.address,
          zipCode: location.address.postcode || prev.zipCode,
        }));

        // Show success message only if we actually got data
        if (
          location.address.city ||
          location.address.town ||
          location.address.state
        ) {
          toast.success("Location details auto-filled");
        }
      } else {
        toast(
          "Couldn't auto-fill all location details. Please enter manually.",
          {
            icon: "ℹ️",
          }
        );
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      toast.error("Could not auto-fill location details");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Add phone validation logic and code-only dropdown
  const phoneFormats = {
    '+254': { length: 9, regex: /^([17][0-9]{8})$/ }, // Kenya: 9 digits, starts with 1 or 7
    '+1': { length: 10, regex: /^[2-9][0-9]{9}$/ }, // US/Canada: 10 digits
    '+44': { length: 10, regex: /^[1-9][0-9]{9}$/ }, // UK: 10 digits (simplified)
    // Add more as needed
  };
  const getPhoneFormat = (code) => phoneFormats[code] || { length: 10, regex: /^\d+$/ };

  const [phoneError, setPhoneError] = useState("");

  const CountryCodeDropdown = ({ value, onChange }) => (
    <Select
      showSearch
      value={value}
      onChange={onChange}
      style={{ width: 260, height: 40 }}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      dropdownStyle={{ zIndex: 2000 }}
      size="large"
      className="h-12"
    >
      {countryPhoneData.map((country) => (
        <Select.Option
          key={`${country.code}-${country.dial_code}`}
          value={country.dial_code}
          label={`${country.name} ${country.dial_code}`}
        >
          <span className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode={country.code}
              svg
              style={{ width: 22, height: 18 }}
              className="rounded-sm"
            />
            <span className="flex-1 truncate">{country.name}</span>
            <span className="text-gray-500 ml-2">({country.dial_code})</span>
          </span>
        </Select.Option>
      ))}
    </Select>
  );

  const handleCountrySelect = async (country) => {
    const phoneData = countryPhoneData.find(
      (item) => item.code === country.code
    );

    setIsLoadingLocation(true);
    toast.loading("Detecting location details...", { id: "location-loading" });

    setDetails({
      ...details,
      country: { name: country.name, code: country.code },
      phoneNumber: {
        ...details.phoneNumber,
        code: phoneData?.dial_code || "+1",
      },
    });
    setIsCountryOpen(false);

    try {
      await fetchLocationData(country.code);
    } finally {
      toast.dismiss("location-loading");
    }
  };

  // Filtered phone codes for modal search
  const filteredPhoneCodesModal = countryPhoneData.filter((country) => {
    const search = phoneCodeSearch.toLowerCase();
    return (
      country.name.toLowerCase().includes(search) ||
      country.dial_code.toLowerCase().includes(search) ||
      country.code.toLowerCase().includes(search)
    );
  });

  const handleNext = (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!details.brandWebsite || details.brandWebsite === "https://") missingFields.push("Website");
    if (!details.legalCompanyName) missingFields.push("Legal Company Name");
    if (!details.brandName) missingFields.push("Brand Name");
    if (!details.country.name) missingFields.push("Country");
    // if (!details.state) missingFields.push("State");
    // if (!details.city) missingFields.push("City");
    if (!details.address) missingFields.push("Address");
    // if (!details.zipCode) missingFields.push("Zip Code");
    if (!details.brandDescription) missingFields.push("Brand Description");
    if (!details.phoneNumber.code) missingFields.push("Phone Country Code");

    if (missingFields.length > 0) {
      toast.error(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    const { length, regex } = getPhoneFormat(details.phoneNumber.code);
    if (details.phoneNumber.number.length !== length || !regex.test(details.phoneNumber.number)) {
      toast.error(`Phone number must be exactly ${length} digits and match the format for this country.`);
      return;
    }

    dispatch(updateFormData(details));
    dispatch(nextStep());
  };

  const descriptionLength = details.brandDescription?.length || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl border border-input p-6 sm:p-8"
      >
        {/* Form Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tell Us About Your Brand
          </h1>
          <p className="text-gray-500">
            Help us create the perfect influencer matches for you
          </p>
        </div>

        <form className="space-y-6">
          {/* Brand Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Brand Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.brandWebsite}
                  onChange={(e) => {
                    const url = e.target.value;
                    setDetails({ ...details, brandWebsite: url });
                  }}
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Legal Company Name <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.legalCompanyName}
                  onChange={(e) =>
                    setDetails({ ...details, legalCompanyName: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.brandName}
                  onChange={(e) =>
                    setDetails({ ...details, brandName: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Company Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Company Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Select */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <Select
                  showSearch
                  value={selectedCountryCode || undefined}
                  onChange={value => {
                    setSelectedCityName("");
                    const countryObj = countriesList.find(c => c.isoCode === value);
                    const newDetails = {
                      ...details,
                      country: { name: countryObj?.name || "", code: value },
                      city: "",
                    };
                    setDetails(newDetails);
                    dispatch(updateFormData(newDetails));
                  }}
                  style={{ width: "100%" }}
                  placeholder="Select Country"
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option.label || '').toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {countriesList.map(country => (
                    <Select.Option key={country.isoCode} value={country.isoCode} label={country.name}>
                      <span className="flex items-center gap-2">
                        <ReactCountryFlag countryCode={country.isoCode} svg style={{ width: 22, height: 18 }} className="rounded-sm" />
                        <span>{country.name}</span>
                      </span>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {/* UK: Country within UK Dropdown */}
              {selectedCountryCode === 'GB' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country within UK <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedUkCountry || undefined}
                    onChange={value => {
                      setSelectedUkCountry(value);
                      setSelectedCounty("");
                      setSelectedCity("");
                      const newDetails = {
                        ...details,
                        brandUkCountry: value,
                        brandState: "",
                        city: "",
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select England, Scotland, Wales, or Northern Ireland"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option.label || '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {ukCountryParts.map(part => (
                      <Select.Option key={part.value} value={part.value} label={part.label}>
                        {part.label}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              {/* UK: County Dropdown */}
              {selectedCountryCode === 'GB' && selectedUkCountry && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    County <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedCounty || undefined}
                    onChange={value => {
                      setSelectedCounty(value);
                      setSelectedCity("");
                      const newDetails = {
                        ...details,
                        brandState: value,
                        city: "",
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select County"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option.label || '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {(ukCountiesJson[selectedUkCountry] || []).map(county => (
                      <Select.Option key={county} value={county} label={county}>
                        {county}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              {/* UK: City Dropdown */}
              {selectedCountryCode === 'GB' && selectedUkCountry && selectedCounty && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedCity || undefined}
                    onChange={value => {
                      setSelectedCity(value);
                      const newDetails = {
                        ...details,
                        city: value,
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select City"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option.label || '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {(ukCitiesJson[selectedUkCountry] || []).map(city => (
                      <Select.Option key={city} value={city} label={city}>
                        {city}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              {/* US: State Dropdown */}
              {selectedCountryCode === 'US' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedUsState || undefined}
                    onChange={value => {
                      setSelectedUsState(value);
                      const newDetails = {
                        ...details,
                        brandState: value,
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    style={{ width: "100%" }}
                    placeholder="Select State"
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option.label || '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {usStates.map(state => (
                      <Select.Option key={state} value={state} label={state}>
                        {state}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              {/* Non-UK/US: City Dropdown */}
              {selectedCountryCode !== 'GB' && selectedCountryCode !== 'US' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedCityName || undefined}
                    onChange={value => {
                      setSelectedCityName(value);
                      const newDetails = {
                        ...details,
                        city: value,
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    style={{ width: "100%" }}
                    placeholder={`Select City`}
                    disabled={!selectedCountryCode}
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option.label || '').toLowerCase().includes(input.toLowerCase())
                    }
                  >
                    {(selectedCountryCode ? City.getCitiesOfCountry(selectedCountryCode) : []).map((item, idx) => {
                      let key = item.name + (item.latitude ? `-${item.latitude}-${item.longitude}` : `-${idx}`);
                      let value = item.name;
                      let label = item.name;
                      return (
                        <Select.Option key={key} value={value} label={label}>
                          {label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              )}

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 items-center">
                  {/* Country Code Display (auto) */}
                  <Input
                    value={details.phoneNumber.code || '+1'}
                    disabled
                    style={{ width: 80, background: '#f5f7f7', color: '#333' }}
                  />
                  <InputComponent
                    value={details.phoneNumber.number}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      const { length, regex } = getPhoneFormat(details.phoneNumber.code);
                      let error = "";
                      if (digitsOnly.length > length) {
                        error = `Phone number should be exactly ${length} digits for this country.`;
                      } else if (digitsOnly && !regex.test(digitsOnly)) {
                        error = `Invalid phone number format for this country.`;
                      }
                      setPhoneError(error);
                      const newDetails = {
                        ...details,
                        phoneNumber: {
                          ...details.phoneNumber,
                          number: digitsOnly,
                        },
                      };
                      setDetails(newDetails);
                      dispatch(updateFormData(newDetails));
                    }}
                    placeholder={
                      details.phoneNumber.code === '+254'
                        ? '716743291'
                        : details.phoneNumber.code === '+1'
                        ? '4155552671'
                        : 'Phone number'
                    }
                    className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-10"
                  />
                </div>
                {phoneError && (
                  <div className="text-red text-xs mt-1">{phoneError}</div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.address}
                  onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.zipCode}
                  onChange={(e) =>
                    setDetails({ ...details, zipCode: e.target.value })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Brand Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What does your brand offer? (Please keep it brief){" "}
              <span className="text-red-500">*</span>
            </label>
            <TextAreaComponent
              value={details.brandDescription}
              onChange={(e) =>
                setDetails({ ...details, brandDescription: e.target.value })
              }
              className="w-full min-h-[120px] focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />

            {details.brandDescription && (
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
                    style={{ width: `${Math.min(descriptionLength, 100)}%` }}
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
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <ButtonComponent
              onClick={handleNext}
              label="Continue"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-lg shadow-sm"
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BrandDetails;
