import { Link } from 'react-router-dom';
import type { Vehicle } from '@/types/vehicle';
import { formatPrice } from '@/utils/formatters';

interface VehicleCardProps {
    vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
    const fuelIcon = vehicle.specs.fuel === 'Electric' ? 'ev_station' : 'local_gas_station';

    return (
        <div className="group bg-white border border-[#212121]/10 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-[#f7f7f7]">
                <img
                    src={vehicle.images[0] || vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                    {vehicle.available ? (
                        <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest flex items-center">
                            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                            Available
                        </span>
                    ) : (
                        <span className="bg-[#212121] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                            Unavailable
                        </span>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-4 md:p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-[#212121]">{vehicle.name}</h3>
                </div>

                {/* Specs */}
                <div className="flex items-center space-x-4 mb-6 text-[#212121]/40">
                    <div className="flex items-center space-x-1">
                        <span className="material-icons text-sm">event_seat</span>
                        <span className="text-xs font-bold">{vehicle.specs.seats}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="material-icons text-sm">settings_input_component</span>
                        <span className="text-xs font-bold">{vehicle.specs.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="material-icons text-sm">{fuelIcon}</span>
                        <span className="text-xs font-bold">{vehicle.specs.fuel}</span>
                    </div>
                </div>

                {/* Price + CTA */}
                <div className="pt-4 border-t border-[#212121]/5 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-[#212121]/40 uppercase">From</div>
                        <div className="text-xl font-bold text-[#212121]">
                            {formatPrice(vehicle.pricePerDay)}
                            <span className="text-xs font-medium text-[#212121]/40">/day</span>
                        </div>
                    </div>
                    <Link
                        to={`/vehicles/${vehicle.id}`}
                        className="bg-[#212121] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded hover:bg-[#212121]/90 transition-colors no-underline"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
