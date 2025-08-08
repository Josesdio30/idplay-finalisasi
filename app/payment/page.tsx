"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Ringkasan Pembayaran (Smaller Card) */}
        <Card className="bg-neutral-100 p-4 rounded-xl shadow-md max-w-xs max-h-fit">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pembayaran</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp500.000</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>Rp50.000</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>Rp450.000</span>
            </div>
          </div>
          <Button className="w-full mt-4 bg-green-700 text-white">Check out</Button>
          <p className="text-center text-sm text-muted-foreground mt-1">Bayar 10 Bulan, Dapat 12 Bulan</p>

          {/* Promo Code */}
          <div className="mt-4 border-t pt-2">
            <p className="mb-1 text-sm font-medium">Promo code</p>
            <div className="flex gap-2">
              <Input placeholder="Enter code" className="bg-neutral-200" />
              <Button className="bg-green-700 text-white">Apply</Button>
            </div>
          </div>
        </Card>

        {/* Right: Metode Pembayaran */}
        <Card className="bg-white p-6 rounded-xl shadow-md w-full border-0">
          <h2 className="text-lg font-semibold mb-6">Metode Pembayaran</h2>

          {/* Metode Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Button className="w-full border border-green-600 bg-orange-100 text-green-700 font-medium justify-center">
              📦 Pay with card
            </Button>
            <Button className="w-full bg-neutral-200 text-gray-700 justify-center">
              ⚙️ Checkout with PayLater
            </Button>
            <Button className="w-full bg-neutral-200 text-gray-700 justify-center">
               Checkout with Apple Pay
            </Button>
          </div>

          {/* Card Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <Input placeholder="Card number*" className="bg-neutral-100" />
            <Input placeholder="Expiration*" className="bg-neutral-100" />
            <Input placeholder="CVV*" className="bg-neutral-100" />
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="billing" />
            <label htmlFor="billing" className="text-sm text-gray-700">
              Use shipping address as billing address
            </label>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="First name*" className="bg-neutral-100" />
            <Input placeholder="Last name*" className="bg-neutral-100" />
          </div>
          <Input placeholder="name@example.com" className="bg-neutral-100 mb-3" />
          <Input placeholder="Address*" className="bg-neutral-100 mb-3" />
          <Input placeholder="Add address line" className="bg-neutral-100 mb-3 text-orange-600 font-medium" />

          {/* City + Zip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <Input placeholder="City*" className="bg-neutral-100" />
            <Input placeholder="Zip code*" className="bg-neutral-100" />
          </div>

          <Input placeholder="State / Province*" className="bg-neutral-100 mb-3" />
          <Input placeholder="Country*" className="bg-neutral-100" />
        </Card>
      </div>
    </div>
  );
}