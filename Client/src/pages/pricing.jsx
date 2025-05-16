import React, { useState, useEffect } from "react";
import PlanSelection from "../components/pricing/PlanSelection";
import SignupForm from "../components/pricing/SignupForm";
import axios from "axios";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planPrice, setPlanPrice] = useState(0);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_email: "",
    company_address: "",
    phone_number: "",
    website_url: "",
    business_description: "",
    plan_id: "",
    billing_cycle: "monthly",
    start_date: new Date().toISOString(),
    end_date: "",
    amount: "",
  });

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [plans, setPlans] = useState([]);

  const imageUrls = [
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1534469650761-fce6cc26ac0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/get-all-plan"
        );
        const fetchedPlans = response.data;

        const plansWithImages = fetchedPlans.map((plan, index) => ({
          ...plan,
          image: imageUrls[index] || "",
          features: Object.values(plan.features),
        }));

        setPlans(plansWithImages);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    console.log("Selected plan name:", planName); // Log selected plan name

    const selectedPlanData = plans.find((p) => p.name === planName);
    console.log("Selected Plan Data:", selectedPlanData); // Check if selectedPlanData is correct

    if (selectedPlanData) {
      const amount =
        billingCycle === "monthly"
          ? selectedPlanData.monthly_price
          : selectedPlanData.yearly_price;

      const endDate = new Date();
      endDate.setMonth(
        endDate.getMonth() + (billingCycle === "monthly" ? 1 : 12)
      );

      // Set form data carefully
      setFormData((prev) => {
        const updatedData = {
          ...prev, // Keep previous state
          plan_id: selectedPlanData.plan_id, // Use plan_id from selectedPlanData
          amount: amount,
          end_date: endDate.toISOString(),
        };

        console.log("Updated formData after plan selection:", updatedData); // Check if plan_id is being set
        return updatedData; // Return updated state
      });
      setPlanPrice(amount);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating field: ${name} to ${value}`); // Check if this logs every change
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log("Updated formData:", updatedData); // Log updated formData
      return updatedData;
    });
  };

  const handleBillingCycleChange = (newCycle) => {
    setBillingCycle(newCycle);
    const selectedPlanData = plans.find((p) => p.name === selectedPlan);
    if (selectedPlanData) {
      const amount =
        newCycle === "monthly"
          ? selectedPlanData.monthly_price
          : selectedPlanData.yearly_price;

      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + (newCycle === "monthly" ? 1 : 12));

      setFormData((prev) => ({
        ...prev,
        billing_cycle: newCycle,
        amount: amount,
        end_date: endDate.toISOString(),
      }));
      setPlanPrice(amount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every((field) => field);
    if (!allFieldsFilled) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Form data submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/subscriptions/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Subscription created successfully:", response.data);
      alert("Subscription created successfully!");
    } catch (error) {
      console.error("Error creating subscription:", error);
      alert("An error occurred while creating the subscription.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <header className="w-full py-6 mb-8 bg-[#060640] text-white flex justify-center">
        <h1 className="text-4xl font-bold">Our Pricing Plans</h1>
      </header>
      <main className="flex flex-col items-center px-4 w-full max-w-6xl">
        <PlanSelection
          plans={plans}
          selectedPlan={selectedPlan}
          onSelectPlan={handlePlanSelect}
          billingCycle={billingCycle}
          setBillingCycle={handleBillingCycleChange}
        />

        {selectedPlan && (
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            selectedPlan={selectedPlan}
            planPrice={planPrice}
            billingCycle={billingCycle}
          />
        )}
      </main>
      <footer className="w-full py-4 bg-[#060640] text-white flex justify-center mt-auto">
        <p className="text-sm">Welcome to be with us</p>
      </footer>
    </div>
  );
};

export default PricingPage;
