'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { MapPin, Trash2, MousePointer2, Info } from 'lucide-react';

interface PropertyMapProps {
  onAreaCalculated: (areaSqm: number) => void;
  onAddressResolved: (address: string) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ onAreaCalculated, onAddressResolved }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const initRef = useRef(false);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [measuredArea, setMeasuredArea] = useState<number>(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onAreaCalculatedRef = useRef(onAreaCalculated);
  const onAddressResolvedRef = useRef(onAddressResolved);
  useEffect(() => { onAreaCalculatedRef.current = onAreaCalculated; }, [onAreaCalculated]);
  useEffect(() => { onAddressResolvedRef.current = onAddressResolved; }, [onAddressResolved]);

  const clearPolygon = useCallback(() => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    setMeasuredArea(0);
    onAreaCalculatedRef.current(0);
  }, []);

  const startDrawing = useCallback(() => {
    clearPolygon();
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
      setIsDrawing(true);
    }
  }, [clearPolygon]);

  const geocodeAddress = useCallback(async (addr: string) => {
    if (!mapInstanceRef.current) return;
    const geocoder = new google.maps.Geocoder();
    try {
      const result = await geocoder.geocode({ address: addr + ', UK' });
      if (result.results && result.results.length > 0) {
        const location = result.results[0].geometry.location;
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(20);
        onAddressResolvedRef.current(result.results[0].formatted_address);
      }
    } catch (err: unknown) {
      console.error('Geocode error:', err);
    }
  }, []);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
      setMapError('Google Maps API key is required. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.');
      return;
    }

    // Use the new functional API (v2)
    setOptions({
      key: apiKey,
      v: 'weekly',
      libraries: ['drawing', 'geometry', 'places', 'marker'],
    });

    const initMap = async () => {
      try {
        const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
        await importLibrary('drawing');
        await importLibrary('geometry');
        await importLibrary('places');

        if (!mapRef.current) return;

        const defaultCenter = { lat: 52.5709, lng: -1.8243 };

        const map = new Map(mapRef.current, {
          center: defaultCenter,
          zoom: 18,
          mapTypeId: 'satellite',
          tilt: 0,
          mapId: 'power-pulse-map',
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
        });

        mapInstanceRef.current = map;

        // Drawing manager
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: null,
          drawingControl: false,
          polygonOptions: {
            fillColor: '#2563eb',
            fillOpacity: 0.3,
            strokeColor: '#2563eb',
            strokeWeight: 3,
            editable: true,
            draggable: true,
          },
        });

        drawingManager.setMap(map);
        drawingManagerRef.current = drawingManager;

        // When polygon is completed
        google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon: google.maps.Polygon) => {
          if (polygonRef.current) {
            polygonRef.current.setMap(null);
          }
          polygonRef.current = polygon;
          drawingManager.setDrawingMode(null);
          setIsDrawing(false);

          const calcArea = () => {
            const path = polygon.getPath().getArray();
            if (path.length >= 3) {
              const areaSqm = google.maps.geometry.spherical.computeArea(path);
              const rounded = Math.round(areaSqm * 100) / 100;
              setMeasuredArea(rounded);
              onAreaCalculatedRef.current(rounded);
            }
          };

          calcArea();

          const pathObj = polygon.getPath();
          google.maps.event.addListener(pathObj, 'set_at', calcArea);
          google.maps.event.addListener(pathObj, 'insert_at', calcArea);
        });

        // Places autocomplete on search input
        if (searchBoxRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(searchBoxRef.current, {
            componentRestrictions: { country: 'gb' },
            fields: ['geometry', 'formatted_address'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
              map.setCenter(place.geometry.location);
              map.setZoom(20);

              if (place.formatted_address) {
                setSearchValue(place.formatted_address);
                onAddressResolvedRef.current(place.formatted_address);
              }
            }
          });
        }

        setIsMapLoaded(true);
      } catch (err: unknown) {
        console.error('Google Maps loading error:', err);
        setMapError('Failed to load Google Maps. Please check your API key and enabled APIs.');
      }
    };

    initMap();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      geocodeAddress(searchValue.trim());
    }
  };

  const price = (measuredArea * 3.5).toFixed(2);

  if (mapError) {
    return (
      <div className="bg-slate-100 rounded-3xl p-8 border-2 border-dashed border-slate-300 text-center">
        <MapPin size={48} className="text-slate-300 mx-auto mb-4" />
        <h4 className="font-bold text-slate-900 mb-2">Satellite Map Unavailable</h4>
        <p className="text-slate-500 text-sm mb-4">{mapError}</p>
        <p className="text-slate-400 text-xs">
          Get a free API key at{' '}
          <a href="https://console.cloud.google.com/apis" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Google Cloud Console
          </a>
          {' '}&mdash; enable Maps JavaScript API, Drawing, Geometry, and Places APIs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={searchBoxRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter your address to find your property..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all whitespace-nowrap"
        >
          Find Property
        </button>
      </form>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
        <div ref={mapRef} className="w-full h-[450px] bg-slate-200" />

        {/* Drawing Controls Overlay */}
        {isMapLoaded && (
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              type="button"
              onClick={startDrawing}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
                isDrawing
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-slate-700 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <MousePointer2 size={16} />
              {isDrawing ? 'Click to draw...' : 'Draw Area'}
            </button>
            {measuredArea > 0 && (
              <button
                type="button"
                onClick={clearPolygon}
                className="flex items-center gap-2 bg-white text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-red-50 transition-all"
              >
                <Trash2 size={16} />
                Clear
              </button>
            )}
          </div>
        )}

        {/* Area & Price Overlay */}
        {measuredArea > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-sm text-white p-4 rounded-2xl flex items-center justify-between z-10">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Measured Area</div>
              <div className="text-2xl font-bold">{measuredArea.toFixed(1)} m&sup2;</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-400 font-bold uppercase tracking-wider">Jet Wash Price</div>
              <div className="text-2xl font-bold text-blue-400">&pound;{price}</div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-slate-600">
          <p className="font-bold text-slate-700 mb-1">How to measure your area:</p>
          <ol className="list-decimal list-inside space-y-1 text-xs">
            <li>Enter your address above &mdash; the map will zoom to your property</li>
            <li>Click <strong>&quot;Draw Area&quot;</strong> then click around the area you want cleaned</li>
            <li>Click each corner of the driveway or patio to trace its outline</li>
            <li>Double-click to finish &mdash; the area and price appear instantly</li>
            <li>Drag the blue dots to adjust the shape if needed</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
