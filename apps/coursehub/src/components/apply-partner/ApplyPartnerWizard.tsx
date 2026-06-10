'use client';

import React, { useState } from 'react';
import { PartnerApplicationState } from './types';
import Step1BasicInfo from './Step1BasicInfo';
import Step2Location from './Step2Location';
import Step3Features from './Step3Features';
import Step4Review from './Step4Review';
import SuccessScreen from './SuccessScreen';
import { submitPartnerApplication } from '../../actions/partner';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

const INITIAL_STATE: PartnerApplicationState = {
  name: '',
  description: '',
  location: '',
  amenities: [],
};

const TOTAL_STEPS = 4;

export default function ApplyPartnerWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PartnerApplicationState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (partial: Partial<PartnerApplicationState>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    const result = await submitPartnerApplication(data);
    
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || 'Failed to submit application.');
    }
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return <SuccessScreen />;
  }

  const isNextDisabled = () => {
    if (step === 1 && (!data.name || !data.description)) return true;
    if (step === 2 && !data.location) return true;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="text-sm font-bold text-gray-500">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-2xl border border-red-100 dark:border-red-500/20 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Form Steps */}
      <div className="min-h-[400px]">
        {step === 1 && <Step1BasicInfo data={data} updateData={updateData} />}
        {step === 2 && <Step2Location data={data} updateData={updateData} />}
        {step === 3 && <Step3Features data={data} updateData={updateData} />}
        {step === 4 && <Step4Review data={data} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100 dark:border-white/5">
        <button
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            step === 1
              ? 'opacity-0 pointer-events-none'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            Continue <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
