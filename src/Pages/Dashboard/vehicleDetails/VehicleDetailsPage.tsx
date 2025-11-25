import CarDetails from "./CarDetails";
import SellerMapSection from "./SellerMapSection";
import VehicleDetailsTabs from "./VehicleDetailsTabs";

const VehicleDetailsPage = () => {
  return (
    <div className=" bg-white rounded-2xl">
      <div className="container mx-auto px-4">
        <CarDetails />
        <VehicleDetailsTabs />
        <SellerMapSection />
        {/* <RelatedCars />  */}
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
