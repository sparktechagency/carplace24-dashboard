"use client";

import { useState } from "react";
import { CAR_DETAILS } from "./carData";

const VehicleDetailsTabs = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "hours" | "reviews">(
    "basic"
  );
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="py-4 min-h-[520px]">
      <div className="border-b flex gap-6 text-sm">
        <button
          className={
            "pb-3 cursor-pointer" +
            (activeTab === "basic"
              ? " border-b-2 border-primary text-primary"
              : " text-gray-600")
          }
          onClick={() => setActiveTab("basic")}
        >
          Vehicle Basic Info
        </button>
        <button
          className={
            "pb-3 cursor-pointer" +
            (activeTab === "hours"
              ? " border-b-2 border-primary text-primary"
              : " text-gray-600")
          }
          onClick={() => setActiveTab("hours")}
        >
          Opening Hours
        </button>
        <button
          className={
            "pb-3 cursor-pointer" +
            (activeTab === "reviews"
              ? " border-b-2 border-primary text-primary"
              : " text-gray-600")
          }
          onClick={() => setActiveTab("reviews")}
        >
          Sellers Review
        </button>
      </div>

      {/* Summary icons */}
      {activeTab === "basic" && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CAR_DETAILS.summary.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* All Vehicle Info */}
      {activeTab === "basic" && (
        <div className="mt-6">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 ${
              !expanded ? "h-[400px] overflow-hidden" : ""
            }`}
          >
            {/* Left Column */}
            <div>
              <h3 className="text-sm text-green-600 font-medium">
                Basic Information
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.basicInformation.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Color Information
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.colorInformation.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Equipment
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.equipment.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Extras
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.extras.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-sm text-green-600 font-medium">
                Technical Information
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.technicalInformation.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Seats & Doors
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.seatsAndDoors.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Fuel Consumption
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.fuelConsumption.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Euro Standard
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.euroStandard.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-sm text-green-600 font-medium">
                Electric & Hybrid Specific
              </h3>
              <div className="mt-3 text-sm">
                {CAR_DETAILS.electricHybridSpecific.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between border-b pb-2 mb-2"
                  >
                    <span className="text-gray-500">{row.name}</span>
                    <span className="text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!expanded && (
            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              onClick={toggleExpand}
              className="px-4 py-2 cursor-pointer bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {expanded ? "Show Less" : "Show More Information"}
            </button>
          </div>

          <h3 className="mt-6 text-sm text-green-600 font-medium">
            Description
          </h3>
          <div className="mt-3 text-sm text-gray-700">
            <p>{CAR_DETAILS.description}</p>
          </div>
        </div>
      )}

      {activeTab === "hours" && (
        <div className="mt-6 text-sm text-gray-700">
          <p>Mon–Fri: 9:00–18:00</p>
          <p>Sat: 10:00–16:00</p>
          <p>Sun: Closed</p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="mt-6 text-sm text-gray-700">
          <p>No reviews yet.</p>
        </div>
      )}
    </section>
  );
};

export default VehicleDetailsTabs;
