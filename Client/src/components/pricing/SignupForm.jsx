import React, { useEffect, useRef } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const SignupForm = ({
  formData,
  handleChange,
  selectedPlan,
  planPrice,
  billingCycle,
}) => {
  console.log("Initial planPrice:", planPrice);

  // Create a ref to hold the latest formData
  const formDataRef = useRef(formData);

  // Update the ref whenever formData changes
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const handlePaymentSuccess = async (details) => {
    console.log("Handling payment success");
    console.log("Form data during payment success:", formDataRef.current);

    // Inspect the structure of formDataRef.current
    console.log(
      "Complete form data structure:",
      JSON.stringify(formDataRef.current, null, 2)
    );

    const isFormDataComplete = Object.entries(formDataRef.current).every(
      ([key, value]) => {
        // Log each key-value pair for debugging
        console.log(
          `Checking field: ${key}, Value: ${value}, Type: ${typeof value}`
        );

        // Check if the value is a string or a number, and trim if string
        const isValid =
          typeof value === "string"
            ? value.trim() !== ""
            : typeof value === "number";
        return isValid;
      }
    );

    if (!isFormDataComplete) {
      console.log("All form fields are required.");
      alert("Please fill in all fields before proceeding with payment.");
      return;
    }

    // Prepare subscription data using current formData
    const subscriptionData = {
      plan_id: Number(formDataRef.current.plan_id), // Ensure this is a number
      billing_cycle: billingCycle, // Should be a string (e.g., "monthly")
      start_date: new Date().toISOString(), // Set to current date
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Assuming a 30-day billing cycle
      amount: parseFloat(planPrice), // Ensure this is a float
      company_name: formDataRef.current.company_name,
      contact_email: formDataRef.current.contact_email,
      company_address: formDataRef.current.company_address,
      phone_number: formDataRef.current.phone_number,
      website_url: formDataRef.current.website_url,
      business_description: formDataRef.current.business_description,
    };

    console.log("Prepared subscription data:", subscriptionData); // Log prepared data for debugging

    // Retrieve auth token from local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No auth token found in local storage");
      alert("Authentication error. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:4000/api/subscriptions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(subscriptionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to create subscription:", errorData);
        alert(errorData.message);
        return;
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("An error occurred while creating the subscription.");
    }
  };

  const handlePaymentCancel = () => {
    console.log("Payment was canceled");
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1",
        currency: "USD",
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mb-12">
        <h2 className="text-[#060640] text-2xl font-bold mb-6">
          Sign Up for {selectedPlan}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            { name: "company_name", label: "Company Name", icon: FaBuilding },
            {
              name: "contact_email",
              label: "Contact Email",
              icon: FaEnvelope,
              type: "email",
            },
            {
              name: "company_address",
              label: "Company Address",
              icon: FaMapMarkerAlt,
            },
            { name: "phone_number", label: "Phone Number", icon: FaPhone },
            {
              name: "website_url",
              label: "Website URL",
              icon: FaGlobe,
              type: "url",
            },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-[#515161] text-sm mb-1 flex items-center"
              >
                <field.icon className="mr-2 text-xs" /> {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-[#515161] rounded-md focus:ring-1 focus:ring-[#060640] text-sm"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label
              htmlFor="business_description"
              className="block text-[#515161] text-sm mb-1 flex items-center"
            >
              <FaInfoCircle className="mr-2 text-xs" /> Description of Business
            </label>
            <textarea
              id="business_description"
              name="business_description"
              value={formData.business_description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 border border-[#515161] rounded-md focus:ring-1 focus:ring-[#060640] text-sm"
            />
          </div>
        </form>

        <div className="mt-6">
          <PayPalButtons
            createOrder={(data, actions) => {
              console.log("Creating PayPal order");
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: planPrice.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              console.log("PayPal order approved");
              const details = await actions.order.capture();
              console.log("Order details:", details);
              await handlePaymentSuccess(details);
            }}
            onCancel={handlePaymentCancel}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default SignupForm;
