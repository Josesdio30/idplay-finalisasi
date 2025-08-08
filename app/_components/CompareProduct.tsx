import { Box, Check, Image, X } from 'lucide-react';

const CompareProduct = () => {
  return (
    <section className="w-full py-14 text-black">
      <div className="container mx-auto">
        <div className="mb-12">
          <div className="relative text-center">
            <div className="absolute -left-5 -top-3 space-y-1"></div>
            <h3 className="text-xl lg:text-3xl md:text-4xl md:leading-[181%] tracking-[-4%] font-semibold">
              Masih belum yakin?
            </h3>
            <p className="text-sm lg:text-base mt-2">
              Apa yang Membuat IDPlay Unggul? Cari Tahu Di Sini.
            </p>
          </div>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative flex gap-2 overflow-x-scroll">
          <div className="flex-1 grid grid-rows-12 min-w-max">
            <div className="row-span-7 px-6 py-4 pb-3 flex items-start flex-col justify-end">
              <p className="font-bold">Product comparison</p>
            </div>
            <div className="px-6 py-4">Feature text goes here</div>
            <div className="px-6 py-4">Feature text goes here</div>
            <div className="px-6 py-4">Feature text goes here</div>
            <div className="px-6 py-4">Feature text goes here</div>
            <div className="px-6 py-4">Feature text goes here</div>
          </div>
          <div className="grid grid-rows-12 lg:basis-1/4 bg-orange-100">
            <div className="row-span-7 flex items-center flex-col justify-end pb-3">
              <div className="w-[244px] h-[244px] relative flex items-center justify-center gap-2">
                <Image className="w-7 h-7" /> Logo
              </div>
              <Box className="w-6 h-6" />
              <h3 className="text-base font-bold mt-1">Company Name</h3>
              <p className="text-sm font-light mt-2">Lorem ipsum dolor sit.</p>
            </div>
            <div className="px-6 py-4 text-center font-medium">Unlimited</div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-rows-12 lg:basis-1/4">
            <div className="row-span-7 flex items-center flex-col justify-end pb-3">
              <div className="w-[244px] h-[244px] relative flex items-center justify-center gap-2">
                <Image className="w-7 h-7" /> Logo
              </div>
              <Box className="w-6 h-6" />
              <h3 className="text-base font-bold mt-1">Company Name</h3>
              <p className="text-sm font-light mt-2">Lorem ipsum dolor sit.</p>
            </div>
            <div className="px-6 py-4 text-center font-medium">25</div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <X className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-rows-12 lg:basis-1/4">
            <div className="row-span-7 flex items-center flex-col justify-end pb-3">
              <div className="w-[244px] h-[244px] relative flex items-center justify-center gap-2">
                <Image className="w-7 h-7" /> Logo
              </div>
              <Box className="w-6 h-6" />
              <h3 className="text-base font-bold mt-1">Company Name</h3>
              <p className="text-sm font-light mt-2">Lorem ipsum dolor sit.</p>
            </div>
            <div className="px-6 py-4 text-center font-medium">10</div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <Check className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <X className="w-4 h-4" />
            </div>
            <div className="px-6 py-4 flex justify-center items-center">
              <X className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareProduct;
