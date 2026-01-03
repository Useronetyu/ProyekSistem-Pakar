import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in react-leaflet
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destinations = [
  {
    id: "H01",
    name: "Pagelaran Gamelan Bangsal Sri Menganti",
    lat: -7.8042,
    lng: 110.3644,
  },
  {
    id: "H02",
    name: "Museum Keraton Yogyakarta",
    lat: -7.8055,
    lng: 110.363,
  },
  {
    id: "H03",
    name: "Latihan Gamelan Abdi Dalem",
    lat: -7.806,
    lng: 110.365,
  },
  {
    id: "H04",
    name: "Sanggar Belajar Gamelan",
    lat: -7.8075,
    lng: 110.3625,
  },
  {
    id: "H05",
    name: "Tempat Perawatan & Konservasi",
    lat: -7.805,
    lng: 110.366,
  },
];

const kratonCenter: [number, number] = [-7.80528, 110.3642];

const Peta = () => {
  const openGoogleMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-hero">
          <div className="container px-4">
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Peta Lokasi
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Lokasi Wisata Gamelan
              </h1>
              <p className="text-muted-foreground">
                Temukan lokasi 5 destinasi wisata gamelan di sekitar Keraton
                Yogyakarta
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 md:py-12">
          <div className="container px-4">
            <div className="rounded-xl overflow-hidden border border-border shadow-elevated">
              <MapContainer
                center={kratonCenter}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: "500px", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {destinations.map((dest) => (
                  <Marker
                    key={dest.id}
                    position={[dest.lat, dest.lng]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                          {dest.id}
                        </span>
                        <h3 className="font-semibold text-foreground mb-3">
                          {dest.name}
                        </h3>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() =>
                            openGoogleMaps(dest.lat, dest.lng, dest.name)
                          }
                        >
                          <ExternalLink className="h-3 w-3" />
                          Buka di Google Maps
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {dest.id.replace("H0", "")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {dest.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Peta;
