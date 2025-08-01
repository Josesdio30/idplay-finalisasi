'use client';

import Image from "next/image";
import Promosi from "@/app/_components/Promosi";
import PaketInternet from "@/app/_components/PaketInternet";
import KeunggulanLayanan from "@/app/_components/KeunggulanLayanan";
import CaraBerlangganan from "@/app/_components/CaraBerlangganan";
import TestimoniPelanggan from "@/app/_components/TestimoniPelanggan";
import FAQ from "@/app/_components/FAQ";
import { FaSearch, FaBars, FaTimes, FaLaptop, FaPhone, FaWifi, FaTachometerAlt, FaGamepad, FaUsers, FaHome, FaWrench } from "react-icons/fa";
import { Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'speed' | 'help' | 'quiz'>('speed');

  // Icons for the "What is Fiber" tab
  const fiberIcons = [
    { icon: <svg width="40" height="40" viewBox="0 0 40 40"><g stroke="#0099e5" strokeWidth="2" fill="none"><path d="M10 30V15a10 10 0 0 1 20 0v15"/><circle cx="20" cy="10" r="2" fill="#0099e5"/></g></svg>, label: "Fiber" },
    { icon: <FaTachometerAlt className="w-8 h-8 text-blue-500" />, label: "Speed" },
    { icon: <FaGamepad className="w-8 h-8 text-blue-500" />, label: "Gaming" },
    { icon: <FaUsers className="w-8 h-8 text-blue-500" />, label: "Family" },
    { icon: <FaHome className="w-8 h-8 text-blue-500" />, label: "Smart Home" },
    { icon: <FaWrench className="w-8 h-8 text-blue-500" />, label: "Support" },
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Banner/Card Section */}
      <section className="flex justify-center items-center py-10">
        <div className="relative w-full max-w-5xl rounded-3xl shadow-xl bg-[#e6f6fc] flex flex-col overflow-hidden">
          {/* Close Button for State 2 */}
          {activeTab === 'help' && (
            <button 
              onClick={() => setActiveTab('speed')}
              className="absolute top-4 right-4 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
            >
              <FaTimes className="w-4 h-4 text-white" />
            </button>
          )}

          {/* Main Content Switcher */}
          {activeTab === 'speed' ? (
            // Default State - Speed & Coverage
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Left: Text */}
              <div className="flex-1 p-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-orange-600 leading-tight mb-4">
                  Kecepatan Tinggi<br />Jangkauan Luas
                </h1>
                <p className="text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight mb-6">
                  Wi-Fi Cepat dan Handal yang<br />Bisa Kamu Andalkan
                </p>
                
                {/* Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaWifi className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">Instalasi Gratis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-medium text-gray-800">Layanan Nasional</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2L2 8v10h16V8l-8-6z"/>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-gray-800">100% Fiber Optic</span>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-6">
                  Pilih lokasi kamu sekarang! Tentukan
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>Subscribe Now</span>
                  </button>
                  <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-orange-50 transition-colors">
                    <FaPhone className="w-5 h-5" />
                    <span>Call Center</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-orange-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Yuk, kenalan sama IDPlay!</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Kecepatan mana yang cocok untukmu?</span>
                  </div>
                </div>
              </div>

              {/* Right: Illustration */}
              <div className="flex-1 flex items-center justify-center relative bg-transparent">
                {/* Curved Lines Background */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    <path d="M0 200 Q100 50 200 150 T400 100" stroke="#FE5E00" strokeWidth="8" fill="none" opacity="0.3"/>
                    <path d="M0 250 Q150 100 300 200 T400 150" stroke="#FE5E00" strokeWidth="6" fill="none" opacity="0.2"/>
                    <path d="M0 180 Q200 80 400 120" stroke="#10B981" strokeWidth="4" fill="none" opacity="0.3"/>
                  </svg>
                </div>
                
                {/* People Illustration */}
                <div className="relative z-10 flex items-center justify-center space-x-6">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl">👩</div>
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl">👨</div>
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl">👩</div>
                </div>
                
                {/* Smartphones */}
                <div className="relative z-10 flex items-center justify-center space-x-8 mt-4">
                  <div className="w-12 h-20 bg-black rounded-lg flex items-center justify-center text-white text-xs">📱</div>
                  <div className="w-12 h-20 bg-black rounded-lg flex items-center justify-center text-white text-xs">📱</div>
                  <div className="w-12 h-20 bg-black rounded-lg flex items-center justify-center text-white text-xs">📱</div>
                </div>
              </div>
            </div>
          ) : activeTab === 'help' ? (
            // State 2 - Help/Assistance
            <div className="flex flex-col lg:flex-row items-stretch bg-gradient-to-br from-orange-50 to-peach-50">
              {/* Left: Text */}
              <div className="flex-1 p-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-orange-600 leading-tight mb-4">
                  Apapun Masalahnya,<br />
                  <span className="text-orange-600">id</span><span className="text-green-600">PI</span><span className="text-orange-600">Ay</span> Hadir untuk Membantu
                </h1>
                <p className="text-xl text-gray-800 leading-tight">
                  Wi-Fi Cepat dan Handal yang Bisa Kamu Andalkan
                </p>
              </div>

              {/* Right: Icon Grid */}
              <div className="flex-1 p-10 flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="w-20 h-20 bg-orange-500 rounded-lg flex flex-col items-center justify-center text-white">
                      <div className="text-xs font-bold mb-1">FULLHD 1080p</div>
                      <div className="text-xs font-bold mb-1">UNLIMITED</div>
                      <div className="text-xs">∞</div>
                      <div className="text-lg">🎮</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">*Klik Icon untuk Melihat</p>
              </div>
            </div>
          ) : (
            // State 3 - Speed Quiz
            <div className="flex flex-col lg:flex-row items-stretch bg-green-100">
              {/* Left: House Illustration */}
              <div className="flex-1 p-10 flex items-center justify-center">
                <div className="relative w-64 h-80">
                  {/* House Structure */}
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg">
                    {/* Top Floor */}
                    <div className="absolute top-4 left-4 right-4 h-24 bg-gray-200 rounded"></div>
                    {/* Ground Floor */}
                    <div className="absolute top-32 left-4 right-4 h-32 bg-gray-100 rounded"></div>
                    {/* Basement */}
                    <div className="absolute bottom-4 left-4 right-4 h-16 bg-gray-300 rounded"></div>
                    
                    {/* WiFi Icons */}
                    <div className="absolute top-8 left-8 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-8 right-8 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-36 left-8 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute top-36 right-8 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="flex-1 p-10 flex flex-col justify-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Kecepatan berapa yang cocok untuk Anda?
                </h1>
                <p className="text-xl mb-8">
                  Jawablah pertanyaan berikut untuk mengetahui paket Fiber mana yang terbaik untuk rumah Anda.
                </p>
                <p className="text-xs text-right mb-6">
                  Ketersediaan terbatas di area tertentu.
                </p>
                <button className="bg-green-400 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Ikuti Kuisnya!
                </button>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex w-full">
            <Button
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold transition-colors ${activeTab === 'help' ? 'bg-orange-500 text-white' : 'bg-[#e6f6fc] text-gray-800 hover:bg-orange-50'}`}
              onClick={() => setActiveTab('help')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Yuk, kenalan sama IDPlay!
            </Button>
            <Button
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-lg font-semibold transition-colors ${activeTab === 'quiz' ? 'bg-green-500 text-white' : 'bg-[#e6f6fc] text-gray-800 hover:bg-green-50'}`}
              onClick={() => setActiveTab('quiz')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Kecepatan mana yang cocok untukmu?
            </Button>
          </div>
        </div>
      </section>

      {/* Location Check Section */}
      <section className="w-full py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border-2 border-orange-500 rounded-[30px] p-6 md:p-8 relative overflow-hidden bg-white">
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between relative z-10">
              
              {/* Kiri: Teks + Input */}
              <div className="md:w-1/2 w-full">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-orange-600 mb-4">
                  Cek area kamu sekarang untuk mulai langganan!
                </h2>

                <div className="flex items-center gap-2 sm:gap-4 flex-wrap border-2 border-orange-400 rounded-full px-4 py-2 bg-white w-full">
                  {/* Input Provinsi */}
                  <div className="flex items-center gap-2">
                    <MapPin className="text-orange-500 w-4 h-4" />
                    <span className="text-gray-400 text-sm">Pilih Provinsi</span>
                  </div>

                  <span className="text-gray-300">|</span>

                  {/* Input Kota */}
                  <div className="flex items-center gap-2">
                    <MapPin className="text-orange-500 w-4 h-4" />
                    <span className="text-gray-400 text-sm">Pilih Kota</span>
                  </div>

                  <span className="text-gray-300">|</span>

                  {/* Tombol Search */}
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-orange-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition">
                    <FaSearch className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Kanan: Gambar Dekorasi */}
              <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center md:justify-end">
                <img
                  src="/imgs/location-decoration.png" // Ganti dengan path gambar kamu
                  alt="Dekorasi Lokasi"
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Our Services Section */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Our Services?</h2>
          <p className="text-center text-gray-500 text-lg mb-10">Fast, reliable internet with the latest technology.<br />Stable connection for all your digital needs.</p>
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* For Home */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
              <img src="/imgs/card1.jpg" alt="For Home" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FE5E00] to-[#FE5E00]/0" />
              <div className="relative z-10 p-6 text-white">
                <div className="text-2xl font-bold mb-2">For Home</div>
                <div className="text-base font-light mb-2">"As a home internet provider, fast and stable connectivity is key to your family's comfort and productivity."</div>
              </div>
            </div>
            {/* For Business */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
              <img src="/imgs/card2.jpg" alt="For Business" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <div className="text-2xl font-bold mb-2">For Business</div>
                <div className="text-base font-light mb-2">Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.</div>
              </div>
            </div>
            {/* Add-Ons */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
              <img src="/imgs/card3.jpg" alt="Add-Ons" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/60 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <div className="text-2xl font-bold mb-2">Add-Ons</div>
                <div className="text-base font-light mb-2">Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Subscription Section */}
        <section className="w-full py-14" style={{ backgroundColor: '#FFEFE6' }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Mulai Berlangganan</h2>
            <p className="text-center text-gray-600 text-lg mb-8">
              Harga Jelas, Tanpa Biaya Tersembunyi.<br />
              Pilih paket yang sesuai dengan kebutuhan.<br />
              Tanpa biaya tambahan, tanpa kejutan—hanya harga jujur untuk layanan yang andal.
            </p>

            {/* Toggle Month/Year */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-md">
                <button className="px-6 py-2 rounded-md bg-orange-500 text-white font-semibold">Bulan</button>
                <button className="px-6 py-2 rounded-md text-orange-500 font-semibold">Tahun</button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-orange-500 text-white p-6 text-center">
                    <div className="text-3xl font-bold">700/Mbps</div>
                  </div>
                  <div className="p-6">
                    <div className="text-2xl font-bold text-gray-800 mb-2">Rp.1.700.000/Tahun</div>
                    <div className="flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-xl font-semibold text-gray-700 mb-2">Rp.350.000/Bulan</div>
                    <p className="text-sm text-gray-500 text-center">Mau langganan setahun? Bisa dicicil, kok!</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Broadband Facts Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-orange-500 pb-2">Broadband Facts</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">IDPlay</h4>
                      <p className="text-sm text-gray-600">12 Months 25 MBp/S</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum Dolor Sit Amet</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Monthly Charges</h4>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Lorem Ipsum Dolor Sit Amet:</span>
                        <span>12 Months</span>
                      </div>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span></span>
                        <span>Rp 1.740.000</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Additional Charges & Terms</h4>
                      <p className="text-sm text-gray-600">Provider Monthly Fees</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      <p className="text-sm text-gray-600">One-time Purchase Fees</p>
                      <p className="text-sm text-gray-600">Early Termination Fees</p>
                      <p className="text-sm text-gray-600">Government Taxes</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Discounts & Bundles</h4>
                      <p className="text-sm text-gray-600">Speeds Provided with Plans</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                      <p className="text-sm text-gray-600">Lorem Ipsum</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Customer Support</h4>
                      <p className="text-sm text-gray-600">Phone:</p>
                      <p className="text-sm text-gray-600">Website:</p>
                    </div>
                    
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                      </svg>
                      <span>Subscribe</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Our Services Section */}
        <section className="w-full py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Our Services?</h2>
            <p className="text-center text-gray-500 text-lg mb-10">Fast, reliable internet with the latest technology.<br />Stable connection for all your digital needs.</p>
            {/* Top 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* For Home */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
                <img src="/imgs/card1.jpg" alt="For Home" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FE5E00] to-[#FE5E00]/0" />
                <div className="relative z-10 p-6 text-white">
                  <div className="text-2xl font-bold mb-2">For Home</div>
                  <div className="text-base font-light mb-2">"As a home internet provider, fast and stable connectivity is key to your family's comfort and productivity."</div>
                </div>
              </div>
              {/* For Business */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
                <img src="/imgs/card2.jpg" alt="For Business" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <div className="text-2xl font-bold mb-2">For Business</div>
                  <div className="text-base font-light mb-2">Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.</div>
                </div>
              </div>
              {/* Add-Ons */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[260px] flex items-end">
                <img src="/imgs/card3.jpg" alt="Add-Ons" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/60 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <div className="text-2xl font-bold mb-2">Add-Ons</div>
                  <div className="text-base font-light mb-2">Add-ons are optional features that enhance your main service — offering more control, speed, or coverage based on your needs.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="md:px-0">
        {/* <CountingAnimation /> */}
        {/* <Promosi />
        <KeunggulanLayanan />
        <PaketInternet /> 
        <CaraBerlangganan />
        <TestimoniPelanggan /> */}
        <FAQ />
      </div>
    </div>
  );
}