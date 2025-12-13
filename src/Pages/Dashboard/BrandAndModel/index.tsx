import BrandSection from "./BrandSection";
import ModelSection from "./ModelSection";
import ColorSection from "./ColorSection";

const BrandAndModel = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <BrandSection />
        <ModelSection />
        <ColorSection />
      </div>
    </div>
  );
};

export default BrandAndModel;
