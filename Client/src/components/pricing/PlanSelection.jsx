import React from "react";
import { FaCheck, FaStar } from "react-icons/fa";

const PlanSelection = ({
  plans,
  selectedPlan,
  onSelectPlan,
  billingCycle,
  setBillingCycle,
}) => {
  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <span
          className={`mr-2 text-sm ${
            billingCycle === "monthly"
              ? "text-[#060640] font-bold"
              : "text-[#515161]"
          }`}
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={billingCycle === "yearly"}
            onChange={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#060640]"></div>
        </label>
        <span
          className={`ml-2 text-sm ${
            billingCycle === "yearly"
              ? "text-[#060640] font-bold"
              : "text-[#515161]"
          }`}
        >
          Yearly (Save 20%)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.plan_id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              plan.popular ? "border-2 border-[#060640] scale-105" : ""
            }`}
          >
            <div className="h-40 overflow-hidden">
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 relative">
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-[#060640] text-white text-xs font-bold py-1 px-3 rounded-full flex items-center">
                  <FaStar className="mr-1" /> Most Popular
                </div>
              )}
              <h2 className="text-[#060640] text-2xl font-bold mb-2">
                {plan.name}
              </h2>
              <p className="text-[#515161] text-sm mb-4">{plan.description}</p>
              <p className="text-4xl font-bold mb-4 text-[#060640]">
                $
                {billingCycle === "monthly"
                  ? plan.monthly_price
                  : plan.yearly_price}
                <span className="text-base font-normal text-[#515161] ml-1">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </p>
              <ul className="text-[#515161] text-sm mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FaCheck className="text-[#060640] mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full bg-[#060640] text-white py-2 px-4 rounded-lg text-sm font-bold transition-all duration-300 hover:bg-opacity-90 ${
                  selectedPlan === plan.name ? "ring-2 ring-[#FADED9]" : ""
                }`}
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanSelection;
