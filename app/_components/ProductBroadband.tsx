import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const ProductBroadband = () => {
  const navigate = useRouter();

  const broadbandPlans = [
    {
      id: 1,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 2,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    },
    {
      id: 3,
      title: 'IDPlay',
      subtitle: '12 Months 25 MBp/S',
      description: 'Lorem Ipsum Dolor Sit Amet'
    }
  ];

  const BroadbandCard = ({ plan }: { plan: (typeof broadbandPlans)[0] }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-black border border-orange-500">
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-4 border-orange-500 pb-2">
        Broadband Facts
      </h3>

      <div className="">
        <div>
          <h4 className="font-bold">{plan.title}</h4>
          <p className="text-sm font-semibold">{plan.subtitle}</p>
          <p className="text-sm mt-1">{plan.description}</p>
        </div>

        <div>
          <div className="flex w-full h-[2px] bg-orange-500 mt-4 mb-2"></div>
          <h4 className="font-semibold text-gray-800">Monthly Charges</h4>
          <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>

          <p>Lorem Ipsum Dolor Sit Amet:</p>
          <div className="pl-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Lorem Ipsum</span>
              <span>12 Months</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Lorem Ipsum</span>
              <span>Rp 1.740.000</span>
            </div>
          </div>
          <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Additional Charges & Terms</h4>
          <div className="pl-2">
            <p className="text-sm font-medium">Provider Monthly Fees</p>
            <div className="pl-2">
              <p className="text-sm text-gray-600">Lorem Ipsum</p>
              <p className="text-sm text-gray-600">Lorem Ipsum</p>
            </div>
            <p className="text-sm font-medium mt-3">One-time Purchase Fees</p>
            <p className="text-sm font-medium mt-3">Early Termination Fees</p>
            <p className="text-sm font-medium mt-3">Government Taxes</p>
          </div>
        </div>

        <div>
          <div className="flex w-full h-[2px] bg-orange-500 mt-4 mb-2"></div>
          <h4 className="font-semibold text-gray-800">Discounts & Bundles</h4>
          <div className="flex w-full h-[2px] bg-orange-500 mb-4 mt-2"></div>

          <div className="pl-2">
            <p className="text-sm font-medium">Speeds Provided with Plans</p>
            <div className="pl-2">
              <p className="text-sm text-gray-600">Lorem Ipsum</p>
              <p className="text-sm text-gray-600">Lorem Ipsum</p>
            </div>
            <p className="text-sm font-medium mt-3">One-time Purchase Fees</p>
            <p className="text-sm font-medium mt-3">Early Termination Fees</p>
            <p className="text-sm font-medium mt-3">Government Taxes</p>
          </div>
          <div className="flex w-full h-[2px] bg-orange-500 my-4"></div>
          <div className="pl-2">
            <p className="text-sm font-medium">Customer Support</p>
            <div className="pl-2">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-sm text-gray-600">Website</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            navigate.push('/payment');
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span>Subscribe</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000
            })
          ]}
          opts={{
            align: 'start',
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {broadbandPlans.map((plan) => (
              <CarouselItem
                key={plan.id}
                className="pl-2 md:pl-4 basis-full"
              >
                <BroadbandCard plan={plan} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
        {broadbandPlans.map((plan) => (
          <BroadbandCard
            key={plan.id}
            plan={plan}
          />
        ))}
      </div>
    </>
  );
};

export default ProductBroadband;
