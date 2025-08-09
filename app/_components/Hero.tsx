'use client';

import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Gamepad,
  Gauge,
  Info,
  Laptop,
  MapPin,
  Monitor,
  Network,
  Phone,
  Router,
  Smartphone,
  Wifi,
  X
} from 'lucide-react';
import Image from 'next/image';
import { FaPhone, FaWrench } from 'react-icons/fa';
import { MdEmail, MdFamilyRestroom, MdSpeed } from 'react-icons/md';
import BannerModal from './BannerModal';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FaHouseSignal } from 'react-icons/fa6';

interface Question {
  id: string;
  question: React.ReactNode; // Ubah dari string ke React.ReactNode
  answer: string;
  category: 'intro' | 'technology' | 'gaming' | 'family' | 'home' | 'easy-setup';
  icon: (className?: string) => React.ReactNode;
}

const questions: Question[] = [
  {
    id: '1',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> adalah solusi internet masa depan dengan
        teknologi serat optik tercanggih.
      </>
    ),
    answer:
      'Ratusan helai serat kaca ultra-tipis yang dikemas rapat, menghantarkan data menggunakan pulsa cahaya berkecepatan tinggi menghadirkan koneksi yang lebih cepat, stabil, dan andal untuk kebutuhanAnda.',
    category: 'intro',
    icon: (className?: string) => <Router className={cn(className)} />
  },
  {
    id: '2',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> internet super cepat dengan teknologi serat
        optik.
      </>
    ),
    answer:
      'Menggunakan ratusan serat kaca ultra-tipis yang dibundel dan menghantarkan data melalui pulsa cahaya, IDPlay Fiber menghadirkan koneksi dengan kecepatan tinggi dan stabilitas maksimal.',
    category: 'technology',
    icon: (className?: string) => <Gauge className={cn(className)} />
  },
  {
    id: '3',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> adalah internet super cepat yang bikin
        pengalaman gaming jadi lebih menyenangkan.
      </>
    ),
    answer:
      'Dengan ratusan serat kaca ultra-tipis yang dibundel dan menghantarkan data lewat pulsa cahaya, kamu bisa main game online tanpa lag, tanpa delay—langsung responsif dan stabil!',
    category: 'gaming',
    icon: (className?: string) => <Gamepad className={cn(className)} />
  },
  {
    id: '4',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> adalah untuk seluruh keluarga
      </>
    ),
    answer:
      'Dibangun dengan ratusan serat kaca ultra-tipis yang dibundel bersama dan menghantarkan data lewat pulsa cahaya, IDPlay Fiber menghadirkan internet cepat dan stabil untuk seluruh anggota keluarga — dari belajar online, bekerja dari rumah, hingga streaming hiburan tanpa gangguan.',
    category: 'family',
    icon: (className?: string) => <MdFamilyRestroom className={cn(className)} />
  },
  {
    id: '5',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> adalah paling diandalkan untuk rumah Anda
      </>
    ),
    answer:
      'Dengan teknologi serat optik berisi ratusan serat kaca ultra tipis yang dibundel dan menghantarkan data menggunakan pulsa cahaya, IDPlay Fiber memberikan koneksi internet cepat dan stabil yang bisa diandalkan setiap saat.',
    category: 'home',
    icon: (className?: string) => <FaHouseSignal className={cn(className)} />
  },
  {
    id: '6',
    question: (
      <>
        <span className="text-orange-800">IDPlay</span> adalah Koneksi cepat, setup gampang
      </>
    ),
    answer:
      'Ditenagai oleh teknologi serat optik dengan ratusan serat kaca ultra-tipis yang menghantarkan data melalui pulsa cahaya, IDPlay Fiber menawarkan koneksi cepat dan stabil yang mudah dipasang dan dikelola—langsung aktif tanpa ribet.',
    category: 'easy-setup',
    icon: (className?: string) => <FaWrench className={cn(className)} />
  }
] as const;

// Tambahkan interface untuk quiz
interface QuizQuestion {
  id: number;
  question: string;
  icon: React.ReactNode;
  options: string[];
}

interface QuizAnswers {
  [questionId: number]: string;
}

// Data quiz
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Berapa banyak orang di rumah tangga Anda yang saat ini menggunakan internet?',
    icon: <MdFamilyRestroom className="w-40 h-40 text-green-600" />,
    options: ['1-5', '6-8', '9+']
  },
  {
    id: 2,
    question: 'Berapa banyak perangkat di rumah Anda?',
    icon: (
      <div className="flex flex-col items-center justify-center gap-6">
        <Monitor className="w-24 h-24 text-green-600" />,
        <div className="flex items-center justify-center gap-6">
          <Smartphone className="w-24 h-24 text-green-600" />,
          <Gamepad className="w-24 h-24 text-green-600" />
        </div>
      </div>
    ),
    options: ['1-5', '6-10', '10+']
  },
  {
    id: 3,
    question:
      'Pernyataan mana yang paling menggambarkan aktivitas streaming dan media sosial rumah tangga Anda?',
    icon: (
      <div className="flex flex-col items-center justify-center gap-6">
        <Laptop className="w-24 h-24 text-green-600" />,
        <Phone className="w-24 h-24 text-green-600" />,
        <Monitor className="w-24 h-24 text-green-600" />
      </div>
    ),
    options: [
      'Pencarian dan penayangan ringan',
      'Cukup rutin menonton serial dan aktif di media sosial',
      'Sering melakukan binge-watching dan membuat konten secara aktif'
    ]
  },
  {
    id: 4,
    question: 'Pernyataan mana yang paling menggambarkan gaya bermain game di rumah Anda?',
    icon: <Gamepad className="w-24 h-24 text-green-600" />,
    options: ['Tidak Bermain Game', 'Sangat Sering Bermain Game', 'Bermain Game Adalah Hobi Saya']
  },
  {
    id: 5,
    question:
      'Pernyataan mana yang paling menggambarkan situasi bekerja dari rumah atau sekolah daring di rumah tangga Anda?',
    icon: <Monitor className="w-24 h-24 text-green-600" />,
    options: [
      'Jarang digunakan untuk bekerja atau sekolah daring',
      'Digunakan secara berkala untuk tugas atau rapat online',
      'Digunakan setiap hari untuk kegiatan kerja atau belajar penuh waktu'
    ]
  }
];

const HeroSection = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<'kenalan' | 'kecepatan' | 'default'>('default');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [startedQuiz, setStartedQuiz] = useState(false);

  // Quiz states
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Quiz functions
  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [quizQuestions[currentQuizQuestion].id]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion((prev) => prev + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuizQuestion > 0) {
      setCurrentQuizQuestion((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers({});
    setShowQuizResult(false);
  };

  const getRecommendedSpeed = () => {
    // Logic untuk menentukan kecepatan berdasarkan jawaban
    const answers = Object.values(quizAnswers);
    let score = 0;

    answers.forEach((answer) => {
      // Pertanyaan 1: Berapa banyak orang di rumah tangga yang menggunakan internet
      if (answer === '9+') {
        score += 3;
      } else if (answer === '6-8') {
        score += 2;
      } else if (answer === '1-5') {
        score += 1;
      }

      // Pertanyaan 2: Berapa banyak perangkat di rumah
      if (answer === '10+') {
        score += 3;
      } else if (answer === '6-10') {
        score += 2;
      } else if (answer === '1-5') {
        score += 1;
      }

      // Pertanyaan 3: Aktivitas streaming dan media sosial
      if (answer === 'Sering melakukan binge-watching dan membuat konten secara aktif') {
        score += 3;
      } else if (answer === 'Cukup rutin menonton serial dan aktif di media sosial') {
        score += 2;
      } else if (answer === 'Pencarian dan penayangan ringan') {
        score += 1;
      }

      // Pertanyaan 4: Gaya bermain game
      if (answer === 'Bermain Game Adalah Hobi Saya') {
        score += 3;
      } else if (answer === 'Sangat Sering Bermain Game') {
        score += 2;
      } else if (answer === 'Tidak Bermain Game') {
        score += 1;
      }

      // Pertanyaan 5: Bekerja dari rumah atau sekolah daring
      if (answer === 'Digunakan setiap hari untuk kegiatan kerja atau belajar penuh waktu') {
        score += 3;
      } else if (answer === 'Digunakan secara berkala untuk tugas atau rapat online') {
        score += 2;
      } else if (answer === 'Jarang digunakan untuk bekerja atau sekolah daring') {
        score += 1;
      }
    });

    // Berdasarkan total score (min: 5, max: 15)
    if (score >= 12) {
      return {
        speed: '700 Mbps',
        price: 'Rp.1.700.000/Tahun',
        description:
          'Anda butuh internet secepat Falcon dan setangguh Gajah. Tak ada kompromi untuk Anda yang mengincar keunggulan. Anda ingin berada di posisi terdepan — dengan kecepatan tinggi, stabilitas maksimal, dan performa tanpa batas untuk mendukung semua aktivitas Anda.'
      };
    } else if (score >= 8) {
      return {
        speed: '300 Mbps',
        price: 'Rp.900.000/Tahun',
        description:
          'Paket ideal untuk keluarga aktif dengan multiple device. Streaming 4K, gaming online, dan work from home berjalan lancar tanpa buffering. Kecepatan stabil untuk mendukung semua aktivitas digital keluarga Anda.'
      };
    } else {
      return {
        speed: '100 Mbps',
        price: 'Rp.600.000/Tahun',
        description:
          'Paket hemat untuk kebutuhan internet sehari-hari. Cocok untuk browsing, streaming HD, dan video call. Solusi ekonomis dengan kualitas terjamin untuk penggunaan ringan hingga menengah.'
      };
    }
  };

  return (
    <>
      <BannerModal
        open={showBanner}
        onOpenChange={setShowBanner}
      />
      <section className="relative container mx-auto lg:pt-14">
        {activeTab === 'default' && (
          <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-orange-200 via-orange-50 to-white relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 relative z-10">
                <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-start-1 space-y-6 px-4 lg:px-8 py-6 lg:py-14">
                  <h1 className="text-2xl lg:text-[50px] lg:leading-[59px] tracking-[-3%] font-bold text-gray-900">
                    <span className="text-orange-500">Kecepatan Tinggi</span>
                    <br />
                    <span className="text-orange-500">Jangkauan Luas</span>
                  </h1>

                  <h2 className="text-base lg:text-[38px] lg:leading-[59px] tracking-[-3%] text-gray-800 font-base">
                    Wi-Fi Cepat dan Handal yang
                    <br />
                    Bisa Kamu Andalkan
                  </h2>

                  {/* Feature badges */}
                  <div className="flex flex-col lg:flex-row gap-2 my-6">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-green-700" />
                      <span className="text-green-700 font-semibold text-base">
                        Instalasi Gratis
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-700" />
                      <span className="text-green-700 font-semibold text-base">
                        Layanan Nasional
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-green-700" />
                      <span className="text-green-700 font-semibold text-base">
                        100% Fiber Optic
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[12px] lg:leading-[59px] tracking-[-3%] text-gray-600">
                      Pilih lokasi kamu sekarang!{' '}
                      <span
                        className="font-semibold italic underline cursor-pointer hover:font-bold transition-all duration-100 ease-in-out"
                        onClick={() => setShowBanner(true)}
                      >
                        Tentukan
                      </span>
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button className="rounded-full bg-orange-500 hover:bg-orange-600 border border-orange-500 text-white px-8 py-3 font-medium transition-colors flex items-center justify-center gap-2">
                        <MdEmail className="w-4 h-4" />
                        Subscribe Now
                      </Button>

                      <Button className="rounded-full bg-white hover:bg-orange-100 text-orange-500 border border-orange-500 px-8 py-3 font-medium transition-colors flex items-center justify-center gap-2">
                        <FaPhone className="w-4 h-4" />
                        Call Center
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Add the right side for image/people */}
                <div
                  className="hidden lg:flex row-start-1 col-start-1 lg:row-start-1 lg:col-start-2 relative z-10 h-full items-end justify-end hover:scale-105 hover:drop-shadow-xl transition-transform duration-300 ease-in-out cursor-pointer"
                  onClick={() => setShowBanner(true)}
                >
                  <div className="flex justify-center lg:justify-end items-end">
                    <Image
                      src="/imgs/unsplash_J-hbGCsK204.png"
                      width={1000}
                      height={500}
                      alt="Happy people using internet"
                      // className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="hidden lg:block absolute bottom-0 right-0 w-full h-auto z-0">
              {/* Grid pattern */}
              <Image
                src="/imgs/line-background-hero.svg"
                width={1000}
                height={1000}
                alt=" "
                className="w-full h-auto opacity-55"
              />
            </div>
          </div>
        )}

        {activeTab === 'kenalan' && (
          <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#FFCDB0] relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 z-10">
                <button
                  className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
                  onClick={() => {
                    setSelectedQuestion(null);
                    setActiveTab('default');
                  }}
                >
                  <X className="w-8 lg:w-12 h-8 lg:h-12 text-orange-500" />
                </button>
                <div className="row-start-2 col-start-1 lg:row-start-1 lg:col-start-1 space-y-6 px-4 lg:px-[100px] py-6 lg:py-24">
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
                            ⓘ Tersedia di area tertentu. Bergantung pada cakupan jaringan. Kecepatan
                            dapat bervariasi dan tidak dijamin. Kecepatan maksimum per perangkat
                            kabel hingga 4,7 Gbps.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add the right side for image/people */}
                <div className="row-start-1 col-start-1 lg:row-start-1 lg:col-start-2 relative z-10 h-full flex justify-center items-center px-4 lg:px-[100px] py-6 lg:py-24">
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
        )}

        {activeTab === 'kecepatan' && (
          <>
            {!startedQuiz && (
              <div className="bg-gradient-to-b from-[#B0DEC8] to-[#00934C] relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-b from-[#B0DEC8] to-[#00934C] relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative flex justify-end z-10">
                    {startedQuiz && (
                      <button
                        className="absolute right-6 lg:right-6 top-6 lg:top-6 cursor-pointer z-20"
                        onClick={() => {
                          setSelectedQuestion(null);
                          setActiveTab('default');
                        }}
                      >
                        <X className="w-12 h-12 text-green-700" />
                      </button>
                    )}
                    <div className="space-y-6 px-4 lg:px-6 lg:basis-2/3 py-6 lg:py-24 text-right">
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
              <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-[#B0DEC8] relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative grid grid-cols-1 lg:grid-cols-3 lg:items-center gap-8 z-10">
                    {currentQuizQuestion > 0 && !showQuizResult && (
                      <button
                        className="absolute left-6 lg:left-6 top-6 lg:top-6 cursor-pointer z-20"
                        onClick={goToPreviousQuestion}
                      >
                        <ChevronLeft className="w-12 h-12 text-green-700" />
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
                      <X className="w-12 h-12 text-green-700" />
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
                            <h3 className="text-2xl lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-700">
                              Pertanyaan {currentQuizQuestion + 1}/5
                            </h3>
                          </div>

                          {/* Question */}
                          <div className="space-y-6">
                            <p className="text-lg lg:text-2xl leading-relaxed text-black font-medium">
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
                                    'w-full px-6 py-3 rounded-full border-2 text-left text-sm transition-all cursor-pointer',
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
                            <div className="text-4xl">🚀</div>
                            <h3 className="text-2xl lg:text-[40px] lg:leading-[141%] tracking-[-3%] font-bold text-green-800">
                              Hasil Anda Sudah Siap!
                            </h3>
                          </div>
                          <p className="text-lg text-gray-700 font-medium">
                            Berdasarkan hasil kuis tersebut, kami sarankan:
                          </p>
                        </div>

                        {/* Recommendation description */}
                        <div className="text-left space-y-6">
                          <p className="text-lg leading-relaxed text-gray-700">
                            {getRecommendedSpeed().description}
                          </p>

                          {/* Package recommendation */}
                          <div className="bg-green-800 rounded-xl p-4 text-white flex items-start justify-between">
                            <div>
                              <div className="text-3xl lg:text-4xl font-bold mb-2">
                                {getRecommendedSpeed().speed}
                              </div>
                              <div className="text-xl font-medium">
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
        )}

        {/* Bottom notification bars */}
        <div className="absolute top-full left-2 lg:left-5 lg:right-auto right-2 flex items-center gap-1 z-20">
          <button
            className={cn(
              'bg-orange-500 text-white pl-4 pr-12 py-1.5 rounded-b-lg flex items-center gap-2 cursor-pointer',
              activeTab === 'kenalan' && 'bg-[#FFCDB0]'
            )}
            style={{
              clipPath: 'polygon(0 0, 100% 0%, 94% 100%, 0% 100%)'
            }}
            onClick={() => {
              setActiveTab('kenalan');
              setShowBanner(false);
            }}
          >
            <Info className="w-4 h-4" />
            <span className="text-xs font-medium text-left">Yuk, kenalan sama IDPlay!</span>
          </button>
          <button
            className={cn(
              'bg-green-600 text-white pl-4 pr-12 py-1.5 rounded-b-lg ml-auto flex items-center gap-2 cursor-pointer',
              activeTab === 'kecepatan' && 'bg-[#B0DEC8]'
            )}
            style={{
              clipPath: 'polygon(0 0, 100% 0%, 94% 100%, 0% 100%)'
            }}
            onClick={() => {
              setActiveTab('kecepatan');
              setShowBanner(false);
            }}
          >
            <MdSpeed className="w-4 h-4" />
            <span className="text-xs font-medium text-left">
              Kecepatan mana yang cocok untukmu?
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
