import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: number;
  question: string;
  icon: React.ReactNode;
  options: string[];
}

interface QuizAnswers {
  [questionId: number]: string;
}

interface IProps {
  setShowBanner: (show: boolean) => void;
  startedQuiz: boolean;
  setStartedQuiz: (started: boolean) => void;
  currentQuizQuestion: number;
  setCurrentQuizQuestion: (question: number) => void;
  quizAnswers: QuizAnswers;
  setQuizAnswers: (answers: QuizAnswers | ((prev: QuizAnswers) => QuizAnswers)) => void;
  showQuizResult: boolean;
  setShowQuizResult: (show: boolean) => void;
  quizQuestions: QuizQuestion[];
  setActiveTab: (tab: 'kenalan' | 'kecepatan' | 'default') => void;
  handleQuizAnswer: (answer: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
  getRecommendedSpeed: () => { speed: string; price: string; description: string };
}

const KecepatanBanner = ({
  setShowBanner,
  startedQuiz,
  setStartedQuiz,
  currentQuizQuestion,
  setCurrentQuizQuestion,
  quizAnswers,
  setQuizAnswers,
  showQuizResult,
  setShowQuizResult,
  quizQuestions,
  setActiveTab,
  handleQuizAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  resetQuiz,
  getRecommendedSpeed
}: IProps) => {
  return (
    <>
      {!startedQuiz && (
        <div className="bg-gradient-to-b from-[#B0DEC8] to-[#00934C] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
          <div className="bg-gradient-to-b from-[#B0DEC8] to-[#00934C] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
            <div className="relative flex justify-end z-10 h-full">
              {startedQuiz && (
                <button
                  className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
                  onClick={() => {
                    setActiveTab('default');
                    setStartedQuiz(false);
                    resetQuiz();
                  }}
                >
                  <X className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
                </button>
              )}
              <div className="flex items-center justify-end space-y-6 px-4 lg:px-6 lg:basis-2/3 py-6 lg:py-24 text-right h-full">
                <div className="">
                  <h3 className="text-2xl lg:text-4xl lg:leading-[59px] tracking-[3%] font-bold text-white">
                    Kecepatan berapa yang cocok untuk Anda?
                  </h3>
                  <p className="text-base lg:text-3xl mt-5 text-white font-extralight lg:leading-[59px] lg:tracking-[3%]">
                    Jawablah pertanyaan berikut untuk <br /> mengetahui paket Fiber mana yang
                    terbaik <br />
                    untuk rumah Anda.
                  </p>
                  <p className="text-sm font-light mt-4 text-white">
                    Ketersediaan terbatas di area tertentu.
                  </p>
                  <Button
                    className="bg-white text-green-700 hover:bg-green-100 mt-4"
                    onClick={() => setStartedQuiz(true)}
                  >
                    Ikuti Kuisnya!
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Background decorative elements */}
          <div className="hidden lg:block absolute bottom-0 left-0 w-full h-auto z-0">
            {/* Grid pattern */}
            <Image
              src="/imgs/house.png"
              width={1000}
              height={1000}
              alt=" "
              className="w-full max-w-[764px] h-auto object-contain"
            />
          </div>
        </div>
      )}
      {startedQuiz && (
        <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
          <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl h-[700px]">
            <div className="relative grid grid-cols-1 lg:grid-cols-3 lg:items-center gap-8 z-10 h-full">
              {currentQuizQuestion > 0 && !showQuizResult && (
                <button
                  className="absolute left-6 lg:left-6 top-6 lg:top-6 cursor-pointer z-20"
                  onClick={goToPreviousQuestion}
                >
                  <ChevronLeft className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
                </button>
              )}
              <button
                className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
                onClick={() => {
                  setActiveTab('default');
                  setStartedQuiz(false);
                  setCurrentQuizQuestion(0);
                  setQuizAnswers({});
                  setShowQuizResult(false);
                  resetQuiz();
                }}
              >
                <X className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
              </button>

              {!showQuizResult && (
                <>
                  {/* Left side - Quiz Question */}
                  <div className="row-start-2 col-start-1 lg:col-span-2 lg:row-start-1 lg:col-start-1 space-y-6 px-4 lg:px-[100px] py-6 lg:py-24">
                    {/* Progress indicator */}
                    <div className="mb-8">
                      <div
                        className="grid gap-2 mb-4"
                        style={{
                          gridTemplateColumns: `repeat(${quizQuestions.length}, 1fr)`
                        }}
                      >
                        {quizQuestions.map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              'h-2 flex-1 rounded',
                              index <= currentQuizQuestion ? 'bg-green-600' : 'bg-white/50'
                            )}
                          />
                        ))}
                      </div>
                      <h3 className="text-lg lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-700">
                        Pertanyaan {currentQuizQuestion + 1}/5
                      </h3>
                    </div>

                    {/* Question */}
                    <div className="space-y-6">
                      <p className="text-base lg:text-2xl leading-relaxed text-black font-medium">
                        {quizQuestions[currentQuizQuestion].question}
                      </p>

                      {/* Answer options */}
                      <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                        // style={{
                        //   gridTemplateColumns: `repeat(${quizQuestions[currentQuizQuestion].options.length}, 1fr)`
                        // }}
                      >
                        {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            className={cn(
                              'w-full px-6 py-3 rounded-full border-2 text-left text-xs lg:text-sm transition-all cursor-pointer',
                              quizAnswers[quizQuestions[currentQuizQuestion].id] === option
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-white text-black border-white hover:border-green-600'
                            )}
                            onClick={() => {
                              handleQuizAnswer(option);
                              goToNextQuestion();
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Icon */}
                  <div className="row-start-1 col-start-1 lg:row-start-1 lg:col-start-3 relative z-10 h-full flex justify-center items-center px-4 lg:px-[100px] py-6 lg:py-24">
                    <div className="flex justify-center items-center">
                      {quizQuestions[currentQuizQuestion].icon}
                    </div>
                  </div>
                </>
              )}

              {/* Quiz Result */}
              {showQuizResult && (
                <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-span-2 lg:col-start-1 space-y-6 px-4 lg:px-[100px] py-6 lg:py-24">
                  {/* Header with rocket icon */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl lg:text-4xl">🚀</div>
                      <h3 className="text-xl lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-800">
                        Hasil Anda Sudah Siap!
                      </h3>
                    </div>
                    <p className="text-base lg:text-lg text-gray-700 font-medium">
                      Berdasarkan hasil kuis tersebut, kami sarankan:
                    </p>
                  </div>

                  {/* Recommendation description */}
                  <div className="text-left space-y-6">
                    <p className="text-base lg:text-lg leading-relaxed text-gray-700">
                      {getRecommendedSpeed().description}
                    </p>

                    {/* Package recommendation */}
                    <div className="bg-green-800 rounded-xl p-4 text-white flex items-start justify-between">
                      <div>
                        <div className="text-xl lg:text-4xl font-bold mb-2">
                          {getRecommendedSpeed().speed}
                        </div>
                        <div className="text-base lg:text-xl font-medium">
                          {getRecommendedSpeed().price}
                        </div>
                      </div>
                      <button
                        className="text-white font-medium transition-colors flex items-center gap-2 cursor-pointer"
                        onClick={() => setShowBanner(true)}
                      >
                        Lihat Detail
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KecepatanBanner;
