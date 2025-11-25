import { useEffect, useRef, useState } from "react";

// TypeScript declarations for Google Maps API
declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

type LatLng = { lat: number; lng: number };

interface SellerMapSectionProps {
  seller?: LatLng;
  buyer?: LatLng;
  height?: number;
}

const defaultSeller: LatLng = { lat: 37.6264, lng: -77.378 }; // Mechanicsville, VA
const defaultBuyer: LatLng = { lat: 37.67067523916521, lng: -92.655622129894 }; // Richmond, VA

const SellerMapSection = ({
  seller = defaultSeller,
  buyer = defaultBuyer,
  height = 580,
}: SellerMapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
    import.meta.env.GOOGLE_MAPS_API_KEY) as string | undefined;

  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    if (!apiKey) {
      setMapError("Google Maps API key is missing");
      return;
    }

    (window as any).initGoogleMaps = () => {
      setIsLoaded(true);
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError("Failed to load Google Maps API");
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    // console.log("Initializing map...");

    if (!mapRef.current) {
      setMapError("Map container not found");
      return;
    }

    if (!window.google) {
      setMapError("Google Maps API not loaded");
      return;
    }

    try {
      // Initialize map
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: (buyer.lat + seller.lat) / 2,
          lng: (buyer.lng + seller.lng) / 2,
        },
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // console.log("Map created successfully:", map);
      googleMapRef.current = map;

      // Add seller marker
      new window.google.maps.Marker({
        position: seller,
        map: map,
        title: "Private Seller",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

      // Add buyer marker
      new window.google.maps.Marker({
        position: buyer,
        map: map,
        title: "You (Buyer)",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

      // console.log("Markers created:", { sellerMarker, buyerMarker });

      // Initialize directions service and renderer
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer(
        {
          suppressMarkers: true, // We already have custom markers
          polylineOptions: {
            strokeColor: "#4285F4",
            strokeWeight: 4,
            strokeOpacity: 0.8,
          },
        }
      );
      directionsRendererRef.current.setMap(map);

      // Calculate and display route
      calculateRoute();

      setMapError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(`Failed to initialize map: ${error}`);
    }
  };

  const calculateRoute = () => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) return;

    setRouteError(null);

    directionsServiceRef.current.route(
      {
        origin: buyer,
        destination: seller,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK" && result) {
          directionsRendererRef.current?.setDirections(result);
        } else {
          setRouteError("Could not calculate driving directions");
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  useEffect(() => {
    loadGoogleMapsScript();
    return () => {
      delete (window as any).initGoogleMaps;
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initializeMap();
    }
  }, [isLoaded, buyer, seller]);

  return (
    <>
      <div className="my-6">
        <div
          ref={mapRef}
          style={{ height: `${height}px`, width: "100%", minHeight: "400px" }}
          className="w-full rounded-xl overflow-hidden border bg-gray-100"
        />
        {mapError && (
          <div className="text-sm text-red-600 mt-2 p-2 bg-red-50 rounded">
            <strong>Map Error:</strong> {mapError}
          </div>
        )}
        {routeError && (
          <div className="text-sm text-red-600 mt-2">
            <strong>Route Error:</strong> {routeError}
          </div>
        )}
        {!isLoaded && !mapError && (
          <div className="text-sm text-muted-foreground mt-2">
            Loading Google Maps...
          </div>
        )}
        <div className="text-xs text-gray-500 mt-2">
          Debug: API Key present: {apiKey ? "Yes" : "No"}
        </div>
      </div>
    </>
  );
};

export default SellerMapSection;
