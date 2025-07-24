"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  nextStep,
  updateFormData,
} from "@/redux/features/stepper/influencer-stepper";
import InputComponent from "@/app/Components/SharedComponents/InputComponent";
import ButtonComponent from "@/app/Components/SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ReactCountryFlag } from "react-country-flag";
import { countryPhoneData } from "@/app/Components/Onboarding/Brand/brand-details/countryPhoneData";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import countries from "country-list";
import { useLocation } from "@/app/layout";
import { Country, State, City } from 'country-state-city';
const countryData = countries.getData();
import { usStates,ukCitiesJson,ukCountiesJson,ukCountryParts } from "@/assets/utils/locations";

const Address = () => {
  const influencerData = useSelector(
    (store) => store.influencerStepper.influencerData
  );
  const dispatch = useDispatch();
  const { location } = useLocation();
  const [details, setDetails] = useState({
    influencerAddressLine1: influencerData.influencerAddressLine1 || undefined,
    influencerAddressLine2: influencerData.influencerAddressLine2 || undefined,
    influencerCity: influencerData.influencerCity || undefined,
    influencerState: influencerData.influencerState || undefined, // <-- Add this
    influencerCountry: influencerData.influencerCountry || { name: "", code: "" },
    influencerZipCode: influencerData.influencerZipCode || undefined,
    influencerPhoneNumber: influencerData.influencerPhoneNumber || { code: "", number: "" },
    gender: influencerData.gender || undefined,
    dateOfBirth: influencerData.dateOfBirth || undefined,
  });
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countryData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const countryDropdownRef = useRef(null);
  const [phoneError, setPhoneError] = useState("");

  // Dynamic dropdown state
  const selectedCountryCode = details.influencerCountry?.code || "";
  const [selectedCityName, setSelectedCityName] = useState(details.influencerCity || "");
  const [selectedCountyCode, setSelectedCountyCode] = useState(details.influencerState || "");

  // Get all countries
  const countriesList = Country.getAllCountries();

  // For UK: counties and cities within county
  const ukCounties = selectedCountryCode === 'GB' ? State.getStatesOfCountry('GB') : [];
  const ukCities = (selectedCountryCode === 'GB' && selectedCountyCode)
    ? City.getCitiesOfState('GB', selectedCountyCode)
    : [];

  // For other countries: cities
  const otherCities = (selectedCountryCode && selectedCountryCode !== 'GB')
    ? City.getCitiesOfCountry(selectedCountryCode)
    : [];

 

  const [selectedUkCountry, setSelectedUkCountry] = useState(details.influencerUkCountry || "");
  const [selectedCounty, setSelectedCounty] = useState(details.influencerState || "");
  const [selectedCity, setSelectedCity] = useState(details.influencerCity || "");

  
  const [selectedUsState, setSelectedUsState] = useState(details.influencerState || "");

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofill logic: also autofill influencerState if UK and county present
  useEffect(() => {
    if (location && !hasAutoFilled) {
      setDetails((prevDetails) => {
        if (
          !prevDetails.influencerAddressLine1 &&
          !prevDetails.influencerCity &&
          !prevDetails.influencerCountry.name &&
          !prevDetails.influencerZipCode
        ) {
          const countryCode = location.countryCode || "";
          setSelectedCityName(location.city || "");
          if (countryCode === 'GB' && location.stateCode) {
            setSelectedCountyCode(location.stateCode);
          }
          return {
            ...prevDetails,
            influencerAddressLine1: location.addressLine1 || "",
            influencerAddressLine2: location.addressLine2 || "",
            influencerCity: location.city || "",
            influencerState: location.stateCode || undefined,
            influencerCountry: {
              name: location.country || "",
              code: countryCode,
            },
            influencerZipCode: location.zipCode || "",
          };
        }
        return prevDetails;
      });
      setHasAutoFilled(true);
    }
  }, [location, hasAutoFilled]);

  // When country changes, update phone code automatically
  useEffect(() => {
    if (selectedCountryCode) {
      const phoneData = countryPhoneData.find(item => item.code === selectedCountryCode);
      const newCode = phoneData?.dial_code || '+1';
      if (details.influencerPhoneNumber.code !== newCode) {
        const newDetails = {
          ...details,
          influencerPhoneNumber: {
            ...details.influencerPhoneNumber,
            code: newCode,
          },
        };
        setDetails(newDetails);
        dispatch(updateFormData(newDetails));
      }
    }
  }, [selectedCountryCode, details.influencerPhoneNumber, dispatch]);

  const handleCountrySearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredCountries(
      countryData.filter((country) =>
        country.name.toLowerCase().includes(searchTerm)
      )
    );
  };

  const fetchLocationData = async (countryCode) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?country=${countryCode}&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        setDetails((prev) => ({
          ...prev,
          influencerCity: result.city || prev.influencerCity,
          influencerZipCode: result.postcode || prev.influencerZipCode,
        }));
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleCountrySelect = async (country) => {
    const phoneData = countryPhoneData.find(
      (item) => item.code === country.code
    );

    setIsLoadingLocation(true);
    toast.loading("Detecting location details...", { id: "location-loading" });

    setDetails({
      ...details,
      influencerCountry: { name: country.name, code: country.code },
      influencerPhoneNumber: {
        ...details.influencerPhoneNumber,
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

  // When country changes, update phone code if it doesn't match
  useEffect(() => {
    if (details.influencerCountry && details.influencerCountry.code) {
      const phoneData = countryPhoneData.find(
        (item) => item.code === details.influencerCountry.code
      );
      if (
        phoneData &&
        details.influencerPhoneNumber.code !== phoneData.dial_code
      ) {
        setDetails((prev) => ({
          ...prev,
          influencerPhoneNumber: {
            ...prev.influencerPhoneNumber,
            code: phoneData.dial_code,
          },
        }));
      }
    }
  }, [details.influencerCountry]);

  const handleNext = () => {
    const missingFields = [];
    if (!details.influencerAddressLine1) missingFields.push("Address Line 1");
    if (selectedCountryCode === 'GB' && !details.influencerState) missingFields.push("County");
    if (!details.influencerCity) missingFields.push("City");
    if (!details.influencerCountry.name) missingFields.push("Country");
    if (!details.influencerZipCode) missingFields.push("Zip code");
    if (!details.influencerPhoneNumber.number)
      missingFields.push("Phone number");
    if (!details.influencerPhoneNumber.code) missingFields.push("Phone country code");
    if (!details.gender) missingFields.push("Gender");
    if (!details.dateOfBirth) missingFields.push("Date of Birth");

    if (missingFields.length > 0) {
      toast.error(`Please fill: ${missingFields.join(", ")}`);
      return;
    }

    const { length, regex } = getPhoneFormat(details.influencerPhoneNumber.code);
    if (details.influencerPhoneNumber.number.length !== length || !regex.test(details.influencerPhoneNumber.number)) {
      toast.error(`Phone number must be exactly ${length} digits and match the format for this country.`);
      return;
    }

    // Normalize influencerPhoneNumber to only have code and number
    let normalizedPhone = details.influencerPhoneNumber;
    if (
      typeof normalizedPhone !== "object" ||
      Array.isArray(normalizedPhone) ||
      !("code" in normalizedPhone) ||
      !("number" in normalizedPhone)
    ) {
      normalizedPhone = { code: "", number: "" };
    } else {
      normalizedPhone = {
        code: normalizedPhone.code,
        number: normalizedPhone.number,
      };
    }

    try {
      dispatch(
        updateFormData({
          ...details,
          influencerPhoneNumber: normalizedPhone,
        })
      );
      dispatch(nextStep());
    } catch (error) {
      console.error("Dispatch error:", error);
      toast.error("Failed to save data");
    }
  };

  // Replace CountryCodeDropdown with a code-only dropdown and add phone validation logic
  const phoneFormats = {
    '+254': { length: 9, regex: /^([17][0-9]{8})$/ }, // Kenya: 9 digits, starts with 1 or 7
    '+1': { length: 10, regex: /^[2-9][0-9]{9}$/ }, // US/Canada: 10 digits
    '+44': { length: 10, regex: /^[1-9][0-9]{9}$/ }, // UK: 10 digits (simplified)
    // Add more as needed
  };

  const getPhoneFormat = (code) => phoneFormats[code] || { length: 10, regex: /^\d+$/ };

  const CountryCodeDropdown = ({ value, onChange }) => (
    <Select
      showSearch
      value={value}
      onChange={onChange}
      style={{ width: 100, height: 40 }}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option.value.toLowerCase().includes(input.toLowerCase())
      }
      dropdownStyle={{ zIndex: 2000 }}
      size="large"
      className="h-12"
    >
      {countryPhoneData.map((country) => (
        <Select.Option
          key={`${country.code}-${country.dial_code}`}
          value={country.dial_code}
          label={country.dial_code}
        >
          {country.dial_code}
        </Select.Option>
      ))}
    </Select>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-color">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-xl border border-input p-6 sm:p-8"
      >
        {/* Form Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Address Details
          </h1>
          <p className="text-gray-500">
            Your details will not be publicly available except for Brands with
            whom you work with. Otherwise, the city and country will be used for
            matching purposes.
          </p>
        </div>

        <div className="space-y-6">
          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-input">
              Address Information
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <InputComponent
                  value={details.influencerAddressLine1}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      influencerAddressLine1: e.target.value,
                    })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Street address, P.O. box, company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <InputComponent
                  value={details.influencerAddressLine2}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      influencerAddressLine2: e.target.value,
                    })
                  }
                  className="w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select
                    showSearch
                    value={selectedCountryCode || undefined}
                    onChange={value => {
                      setSelectedCityName("");
                      setSelectedCountyCode("");
                      const countryObj = countriesList.find(c => c.isoCode === value);
                      const newDetails = {
                        ...details,
                        influencerCountry: { name: countryObj?.name || "", code: value },
                        influencerCity: "",
                        influencerState: undefined,
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
                          influencerUkCountry: value,
                          influencerState: "",
                          influencerCity: "",
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
                          influencerState: value,
                          influencerCity: "",
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
                          influencerCity: value,
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
                {/* Non-UK: City Dropdown */}
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
                          influencerCity: value,
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
                      {otherCities.map((item, idx) => {
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
                          influencerState: value,
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

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    {/* Country Code Display (auto) */}
                    <input
                      value={details.influencerPhoneNumber.code || '+1'}
                      disabled
                      style={{ width: 80, background: '#f5f7f7', color: '#333' }}
                      className="rounded border border-input px-4 py-2 text-sm"
                    />
                    <InputComponent
                      value={details.influencerPhoneNumber.number}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, "");
                        const { length, regex } = getPhoneFormat(details.influencerPhoneNumber.code);
                        let error = "";
                        if (digitsOnly.length > length) {
                          error = `Phone number should be exactly ${length} digits for this country.`;
                        } else if (digitsOnly && !regex.test(digitsOnly)) {
                          error = `Invalid phone number format for this country.`;
                        }
                        setPhoneError(error);
                        const newDetails = {
                          ...details,
                          influencerPhoneNumber: {
                            ...details.influencerPhoneNumber,
                            number: digitsOnly,
                          },
                        };
                        setDetails(newDetails);
                        dispatch(updateFormData(newDetails));
                      }}
                      placeholder={
                        details.influencerPhoneNumber.code === '+254'
                          ? '716743291'
                          : details.influencerPhoneNumber.code === '+1'
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <Select
                    placeholder="Select gender"
                    className="w-full"
                    value={details.gender || undefined}
                    onChange={(value) =>
                      setDetails({ ...details, gender: value })
                    }
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Of Birth <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    className="w-full"
                    placeholder="Select date of birth"
                    value={
                      details.dateOfBirth ? dayjs(details.dateOfBirth) : null
                    }
                    onChange={(date, dateString) => {
                      setDetails({ ...details, dateOfBirth: dateString });
                    }}
                    format="YYYY-MM-DD"
                    disabledDate={(current) => {
                      // Disable future dates
                      return current && current > dayjs().endOf("day");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <ButtonComponent
              onClick={handleNext}
              label="Continue"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-medium rounded-lg shadow-sm"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Address;
