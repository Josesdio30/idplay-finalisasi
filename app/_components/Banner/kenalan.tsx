import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  question: React.ReactNode;
  answer: string;
  category: 'intro' | 'technology' | 'gaming' | 'family' | 'home' | 'easy-setup';
  icon: (className?: string) => React.ReactNode;
}

interface IProps {
  setShowBanner: (show: boolean) => void;
  questions: Question[];
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question | null) => void;
  setActiveTab: (tab: 'kenalan' | 'kecepatan' | 'default') => void;
}

const KenalanBanner = ({
  setShowBanner,
  questions,
  selectedQuestion,
  setSelectedQuestion,
  setActiveTab
}: IProps) => {
  const navigate = useRouter();
  return (
    <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
      <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 z-10 h-full">
          <button
            className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
            onClick={() => {
              setSelectedQuestion(null);
              setActiveTab('default');
            }}
          >
            <X className="w-8 lg:w-12 h-8 lg:h-12 text-orange-500" />
          </button>
          <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-start-2 space-y-6 px-4 lg:px-[100px] py-6 lg:py-24">
            {!selectedQuestion && (
              <div className="">
                <h4 className="text-4xl lg:text-[90px] lg:leading-[141%] tracking-[-3%] font-bold text-orange-500">
                  Apa itu
                </h4>
                <div className="flex items-center gap-2 mt-4 lg:mt-0">
                  <Image
                    src="/imgs/logo-idplay.png"
                    width={221}
                    height={76}
                    alt="IDPlay Logo"
                    className="w-[150px] h-[46px] lg:w-[221px] lg:h-[76px] object-contain"
                  />
                  <h3 className="text-4xl lg:text-[76px] lg:leading-[59px] tracking-[-3%] font-bold text-orange-500">
                    ?
                  </h3>
                </div>
                <p className="font-light mt-5">Klik ikon untuk info lebih lanjut.</p>
              </div>
            )}
            {selectedQuestion && (
              <div className="space-y-3 lg:space-y-5">
                <h4 className="text-lg lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-orange-500">
                  Apa itu <span className="text-orange-800">IDPlay?</span>
                </h4>
                <p className="text-base lg:text-xl font-bold leading-[141%] tracking-[-4%] text-black">
                  {selectedQuestion?.question}
                </p>
                <div>
                  <p className="text-lg leading-[141%] tracking-[-4%]">
                    {selectedQuestion?.answer}
                  </p>
                  {selectedQuestion?.category === 'technology' && (
                    <p className="text-[10px] lg:text-xs leading-normal text-black font-extralight mt-4">
                      ⓘ Tersedia di area tertentu. Bergantung pada cakupan jaringan. Kecepatan dapat
                      bervariasi dan tidak dijamin. Kecepatan maksimum per perangkat kabel hingga
                      4,7 Gbps.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Add the right side for image/people */}
          <div className="row-start-1 col-start-1 lg:row-start-1 lg:col-start-1 relative z-10 h-full flex justify-center items-center px-4 lg:px-[100px] py-6 lg:py-24">
            <div className="flex flex-col justify-center lg:justify-center items-center gap-2">
              <p className="text-center text-lg font-semibold">Klik untuk melihat jawaban</p>
              <div className="grid grid-cols-3 gap-4">
                {questions.map((e) => (
                  <button
                    key={e.id}
                    className={cn(
                      'relative aspect-square flex items-center justify-center p-3.5 rounded-lg w-20 lg:w-32 h-20 lg:h-32 cursor-pointer',
                      selectedQuestion?.id === e.id
                        ? 'bg-orange-500 text-orange-800'
                        : 'bg-white text-orange-500'
                    )}
                    onClick={() => setSelectedQuestion(e)}
                  >
                    {e.icon('w-full h-full')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      {!selectedQuestion && (
        <div className="hidden lg:block absolute bottom-0 right-0 w-full h-auto z-0">
          {/* Grid pattern */}
          <Image
            src="/imgs/pertanyaan-background-hero.svg"
            width={1000}
            height={1000}
            alt=" "
            className="w-full h-auto object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default KenalanBanner;
