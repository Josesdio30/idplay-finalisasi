'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type UserLocation = {
  lat: number;
  lng: number;
};

type PlacePrediction = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
};

type Product = {
  product_code: string;
  name: string;
  price: number;
};

const mapContainerStyle = {
  width: '100%',
  height: '380px',
  borderRadius: '12px'
};

export default function EntriProspekPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, user } = useAuth();
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isProductLoading, setIsProductLoading] = useState(false);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [ktp, setKtp] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ['places']
  });

  // Auth guard: redirect to login when not authenticated
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login?redirect=/entri-prospek');
    }
  }, [isLoading, isLoggedIn, router]);

  useEffect(() => {
    if (isLoaded && window.google) {
      const dummy = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummy);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCurrentLocation(coords);
      },
      () => {
        // Default ke Jakarta jika gagal
        setCurrentLocation({ lat: -6.200000, lng: 106.816666 });
      }
    );
  }, []);

  useEffect(() => {
    if (zipCode.length >= 5) {
      const fetchProducts = async () => {
        setIsProductLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/common/products?offset=1&list_per_page=10&customer_type=Retail&product_type=NORMAL&zip_code=${zipCode}`
          );
          const data = await response.json();
          if (response.ok && data?.data) {
            setProducts(
              data.data.map((item: any) => ({
                product_code: item.Product_Code,
                name: item.Product_Name,
                price: item.Price
              }))
            );
          } else {
            setProducts([]);
          }
        } catch (error) {
          setProducts([]);
        } finally {
          setIsProductLoading(false);
        }
      };
      fetchProducts();
    } else {
      setProducts([]);
      setSelectedProduct('');
    }
  }, [zipCode]);

  const searchPlaces = useCallback(
    async (query: string) => {
      if (!query.trim() || !isLoaded || !window.google) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      const autocomplete = new google.maps.places.AutocompleteService();
      const request = {
        input: query,
        componentRestrictions: { country: 'id' },
        types: ['establishment', 'geocode']
      } as google.maps.places.AutocompletionRequest;
      autocomplete.getPlacePredictions(request, (predictions, status) => {
        setIsSearching(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions as unknown as PlacePrediction[]);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      });
    },
    [isLoaded]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => searchPlaces(value), 300);
    },
    [searchPlaces]
  );

  const extractPostalCode = (place: google.maps.places.PlaceResult): string => {
    const comps = place.address_components || [];
    for (const c of comps) {
      if (c.types.includes('postal_code')) return c.long_name;
    }
    return '';
  };

  const handleSuggestionSelect = useCallback((suggestion: PlacePrediction) => {
    if (!placesServiceRef.current) return;
    setSearchValue(suggestion.description);
    setShowSuggestions(false);
    setIsSearching(true);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: suggestion.place_id,
      fields: ['geometry', 'formatted_address', 'name', 'address_components']
    };
    placesServiceRef.current.getDetails(request, (place, status) => {
      setIsSearching(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        if (place.geometry && place.geometry.location) {
          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          setCurrentLocation(coords);
          const addr = place.formatted_address || place.name || suggestion.description;
          setSelectedAddress(addr);
          setAddress(addr);
          setZipCode(extractPostalCode(place));
        }
      }
    });
  }, []);

  const MapComponent = useMemo(() => {
    if (!currentLocation || !isLoaded) return (
      <div className="w-full h-[380px] rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Memuat peta...</p>
      </div>
    );
    return (
      <div className="w-full rounded-lg overflow-hidden border border-gray-200">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          options={{ zoomControl: true, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      </div>
    );
  }, [currentLocation, isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLocation || !selectedProduct) return;
    setSubmitting(true);
    try {
      const selectedProductData = products.find((p) => p.product_code === selectedProduct);
      const payload = {
        zip_code: zipCode || '',
        provider_id: '150001170',
        fullname,
        email,
        address,
        phone,
        latitude: String(currentLocation.lat),
        longitude: String(currentLocation.lng),
        ktp: ktp || '',
        services: selectedProductData?.name || '',
        harga: String(selectedProductData?.price || ''),
        product_code: selectedProduct,
        referral_code: referralCode || ''
      };

      const token = user?.token || localStorage.getItem('token') || '';
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}subscription/retail/entri-prospek`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload)
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        alert(data?.error?.message || 'Gagal mengirim data');
      } else {
        alert('Pengajuan prospek berhasil dikirim');
        setFullname('');
        setEmail('');
        setAddress('');
        setPhone('');
        setKtp('');
        setSelectedProduct('');
        setReferralCode('');
      }
    } catch (err) {
      alert('Terjadi kesalahan tak terduga');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold text-orange-600">Entri Prospek Retail</h1>
        <p className="text-gray-600 mt-1">Pilih lokasi Anda pada peta lalu isi data prospek.</p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Cari alamat atau lokasi..."
                  className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
                )}
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[60] max-h-60 overflow-y-auto">
                  {suggestions.map((s) => (
                    <div
                      key={s.place_id}
                      onClick={() => handleSuggestionSelect(s)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                    >
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{s.structured_formatting.main_text}</p>
                        <p className="text-xs text-gray-500 truncate">{s.structured_formatting.secondary_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Ketik alamat untuk mencari lokasi.</p>
            </div>
            {MapComponent}
            <div className="space-y-1">
              {selectedAddress && (
                <p className="text-sm text-gray-700"><span className="font-medium">Alamat dipilih:</span> {selectedAddress}</p>
              )}
              {currentLocation && (
                <p className="text-xs text-gray-500">Koordinat: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <Input value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Nama lengkap" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Whatsapp</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor Whatsapp" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat pemasangan" required />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="15111" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produk</label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                  disabled={!zipCode || isProductLoading || products.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isProductLoading ? "Memuat produk..." : "Pilih produk"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-[50] max-h-60 overflow-y-auto">
                    {products.map((product) => (
                      <SelectItem
                        key={product.product_code}
                        value={product.product_code}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KTP</label>
              <Input value={ktp} onChange={(e) => setKtp(e.target.value)} placeholder="Nomor KTP" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kode Referral (opsional)</label>
              <Input
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Kode referral (6 digit alpha-numeric)"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              disabled={submitting || !currentLocation || !selectedProduct || !ktp}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</span>
              ) : (
                'Berlangganan'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}