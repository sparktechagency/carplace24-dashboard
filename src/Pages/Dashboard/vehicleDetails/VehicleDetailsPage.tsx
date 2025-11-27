import { useParams } from "react-router-dom";
import CarDetails from "./CarDetails";
import SellerMapSection from "./SellerMapSection";
import VehicleDetailsTabs from "./VehicleDetailsTabs";
import { useGetCarsByIdQuery } from "@/redux/apiSlices/carSlice";
import { Spin } from "antd";
import { getImageUrl } from "@/utils/getImageUrl";
import { Gauge, Fuel, Cog, Car } from "lucide-react";

const VehicleDetailsPage = () => {
  const { id } = useParams();

  const { data: getCarsData, isLoading } = useGetCarsByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const car = getCarsData?.data || {};

  const images = (car?.basicInformation?.productImage || []).map(
    (src: string) => getImageUrl(src)
  );
  const title = car?.basicInformation?.vehicleName || "";
  const subtitle = [
    car?.basicInformation?.BodyType,
    car?.basicInformation?.condition,
  ]
    .filter(Boolean)
    .join(" • ");
  const price = {
    original: Number(car?.basicInformation?.RegularPrice) || 0,
    current: Number(car?.basicInformation?.OfferPrice) || 0,
    monthly: String(car?.basicInformation?.leasingRate || ""),
  };
  const dealer = {
    name: car?.createdBy?.name || "",
    type: "Seller",
    logo: "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop",
    rating: 4.5,
    reviews: 300,
    address: car?.location?.address || "",
  };
  const summary = [
    { label: String(car?.basicInformation?.year || ""), icon: Car },
    { label: String(car?.technicalInformation?.fuelType || ""), icon: Fuel },
    {
      label: String(car?.technicalInformation?.performance || ""),
      icon: Gauge,
    },
    { label: `${car?.basicInformation?.miles ?? ""} km`, icon: Gauge },
    { label: String(car?.technicalInformation?.transmission || ""), icon: Cog },
    {
      label: String(car?.energyAndEnvironment?.fuelConsumption || ""),
      icon: Fuel,
    },
    { label: String(car?.technicalInformation?.driveType || ""), icon: Car },
    { label: String(car?.basicInformation?.condition || ""), icon: Car },
  ];
  const basicInformation = [
    { name: "S.No", value: `#${car?._id || ""}` },
    { name: "Name", value: car?.basicInformation?.vehicleName || "" },
    { name: "Model", value: String(car?.basicInformation?.model || "") },
    { name: "Brand", value: String(car?.basicInformation?.brand || "") },
    {
      name: "MFK Warranty",
      value: String(car?.basicInformation?.MfkWarranty || ""),
    },
    {
      name: "Accident Vehicle",
      value: String(car?.basicInformation?.AccidentVehicle || ""),
    },
    { name: "Body type", value: String(car?.basicInformation?.BodyType || "") },
  ];
  const technicalInformation = [
    {
      name: "Fuel type",
      value: String(car?.technicalInformation?.fuelType || ""),
    },
    {
      name: "Transmission",
      value: String(car?.technicalInformation?.transmission || ""),
    },
    {
      name: "Performance",
      value: String(car?.technicalInformation?.performance || ""),
    },
    {
      name: "Drive type",
      value: String(car?.technicalInformation?.driveType || ""),
    },
    {
      name: "Engine displacement",
      value: String(car?.technicalInformation?.engineDisplacement || ""),
    },
    {
      name: "Cylinders",
      value: String(car?.technicalInformation?.cylinders || ""),
    },
  ];
  const colorInformation = [
    {
      name: "Exterior colour",
      value: (car?.colour?.exterior || []).join(", "),
    },
    {
      name: "Interior Colour",
      value: (car?.colour?.interior || []).join(", "),
    },
  ];
  const electricHybridSpecific = [
    { name: "Range", value: String(car?.electricHybrid?.rangeKm || "") },
    {
      name: "Battery capacity",
      value: String(car?.electricHybrid?.batteryCapacityKWh || ""),
    },
    {
      name: "Towing capacity",
      value: String(car?.electricHybrid?.towingCapacity || ""),
    },
    {
      name: "Total weight",
      value: String(car?.electricHybrid?.totalWeight || ""),
    },
    {
      name: "Curb weight",
      value: String(car?.electricHybrid?.curbWeight || ""),
    },
  ];
  const equipment = Object.entries(car?.equipment || {}).map(([key, val]) => ({
    name: key,
    value: val ? "Yes" : "No",
  }));
  const extras = Object.entries(car?.extras || {}).map(([key, val]) => ({
    name: key,
    value: String(val || ""),
  }));
  const seatsAndDoors = [
    { name: "Seats", value: String(car?.seatsAndDoors?.seats || "") },
    { name: "Doors", value: String(car?.seatsAndDoors?.doors || "") },
  ];
  const fuelConsumption = [
    {
      name: "Fuel Consumption",
      value: String(car?.energyAndEnvironment?.fuelConsumption || ""),
    },
    {
      name: "Co emissions",
      value: String(car?.energyAndEnvironment?.coEmissions || ""),
    },
    {
      name: "Energy efficiency class",
      value: String(car?.energyAndEnvironment?.energyEfficiencyClass || ""),
    },
  ];
  const euroStandard = [
    { name: "Fuel type", value: String(car?.euroStandard?.fuelType || "") },
    {
      name: "Transmission",
      value: String(car?.euroStandard?.transmission || ""),
    },
  ];
  const description = String(car?.description || "");

  const details = {
    id: car?._id,
    title,
    subtitle,
    price,
    images,
    dealer,
    summary,
    basicInformation,
    technicalInformation,
    colorInformation,
    electricHybridSpecific,
    equipment,
    extras,
    seatsAndDoors,
    fuelConsumption,
    euroStandard,
    description,
  };

  return (
    <div className=" bg-white rounded-2xl">
      <div className="container mx-auto px-4">
        <CarDetails details={details} />
        <VehicleDetailsTabs details={details} />
        <SellerMapSection seller={car?.location?.coordinates} />
        {/* <RelatedCars />  */}
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
