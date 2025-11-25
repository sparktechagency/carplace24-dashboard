"use client";

import { Share2, MapPin, Star } from "lucide-react";
import { CAR_DETAILS } from "./carData";
import CarImageGallery from "./CarImageGallery";

const CarDetails = () => {
  return (
    <section className="py-8">
      <div className="flex flex-col gap-6">
        <CarImageGallery
          images={CAR_DETAILS.images}
          title={CAR_DETAILS.title}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              {CAR_DETAILS.title}
            </h1>
            <p className="text-gray-600 mt-1">{CAR_DETAILS.subtitle}</p>

            <div className="mt-3 flex items-end gap-3">
              <span className="text-2xl font-bold">
                ${CAR_DETAILS.price.current.toLocaleString()}
              </span>
              <span className="text-red-500 line-through">
                ${CAR_DETAILS.price.original.toLocaleString()}
              </span>
              <span className="text-blue-600 text-sm">
                {CAR_DETAILS.price.monthly}
              </span>
            </div>
          </div>

          <div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={CAR_DETAILS.dealer.logo}
                  alt="dealer"
                  className="h-10 w-10 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {CAR_DETAILS.dealer.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {CAR_DETAILS.dealer.type}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={
                        "h-4 w-4" +
                        (i < Math.round(CAR_DETAILS.dealer.rating)
                          ? " text-yellow-500"
                          : " text-gray-300")
                      }
                      fill={
                        i < Math.round(CAR_DETAILS.dealer.rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span>({CAR_DETAILS.dealer.reviews})</span>
              </div>
              <div className="flex justify-between">
                <div className="flex mt-2 items-center gap-1">
                  <MapPin className="h-4 w-4" /> {CAR_DETAILS.dealer.address}
                </div>
                <a
                  href="#"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4" /> Share Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
