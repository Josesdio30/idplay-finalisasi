'use client';
import { Gamepad, Gauge, Info, Laptop, Monitor, Phone, Router, Smartphone } from 'lucide-react';
import { FaWrench } from 'react-icons/fa';
import { MdFamilyRestroom, MdSpeed } from 'react-icons/md';
import BannerModal from './BannerModal';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FaHouseSignal } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import DefaultBanner from './Banner/default';
import KenalanBanner from './Banner/kenalan';
import KecepatanBanner from './Banner/kecepatan';

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
    icon: <MdFamilyRestroom className="w-10 lg:w-40 h-10 lg:h-40 text-green-600" />,
    options: ['1-5', '6-8', '9+']
  },
  {
    id: 2,
    question: 'Berapa banyak perangkat di rumah Anda?',
    icon: (
      <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-6">
        <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <div className="flex items-center justify-center gap-4 lg:gap-6">
          <Smartphone className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
          <Gamepad className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
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
      <div className="flex flex-row lg:lex-col items-center justify-center gap-4 lg:gap-6">
        <Laptop className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <Phone className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
        <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />
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
    icon: <Gamepad className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />,
    options: ['Tidak Bermain Game', 'Sangat Sering Bermain Game', 'Bermain Game Adalah Hobi Saya']
  },
  {
    id: 5,
    question:
      'Pernyataan mana yang paling menggambarkan situasi bekerja dari rumah atau sekolah daring di rumah tangga Anda?',
    icon: <Monitor className="w-10 lg:w-24 h-10 lg:h-24 text-green-600" />,
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

  const navigate = useRouter();

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
        {activeTab === 'default' && <DefaultBanner setShowBanner={setShowBanner} />}

        {activeTab === 'kenalan' && (
          <KenalanBanner
            setShowBanner={setShowBanner}
            questions={questions}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'kecepatan' && (
          <KecepatanBanner
            setShowBanner={setShowBanner}
            startedQuiz={startedQuiz}
            setStartedQuiz={setStartedQuiz}
            currentQuizQuestion={currentQuizQuestion}
            setCurrentQuizQuestion={setCurrentQuizQuestion}
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            showQuizResult={showQuizResult}
            setShowQuizResult={setShowQuizResult}
            quizQuestions={quizQuestions}
            setActiveTab={setActiveTab}
            handleQuizAnswer={handleQuizAnswer}
            goToNextQuestion={goToNextQuestion}
            goToPreviousQuestion={goToPreviousQuestion}
            resetQuiz={resetQuiz}
            getRecommendedSpeed={getRecommendedSpeed}
          />
        )}

        {/* Bottom notification bars */}
        <div className="absolute top-full left-3 lg:left-5 lg:right-auto right-3 flex items-center gap-1 z-20">
          <button
            className={cn(
              'bg-orange-500 text-white pl-2 lg:pl-4 pr-9 lg:pr-12 py-1.5 rounded-b-lg flex items-center gap-2 cursor-pointer',
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
            <Info className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="text-[10px] lg:text-xs font-medium text-left">
              Yuk, kenalan sama IDPlay!
            </span>
          </button>
          <button
            className={cn(
              'bg-green-600 text-white pl-2 lg:pl-4 pr-9 lg:pr-12 py-1.5 rounded-b-lg lg:ml-auto flex items-center gap-2 cursor-pointer',
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
            <MdSpeed className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="text-[10px] lg:text-xs font-medium text-left">
              Kecepatan mana yang cocok untukmu?
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
