"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Package, Wrench, Users, AlertTriangle, StickyNote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { tutorialSections } from "@/lib/hardware-tutorials";
import Link from "next/link";

type TutorialProgress = {
  [tutorialId: string]: {
    completedSteps: number;
    totalSteps: number;
    currentStep: number;
  };
};

type PartWithOptionalUrl = {
  name: string;
  quantity: number;
  url?: string;
};

type ScrewWithOptionalUrl = {
  name: string;
  quantity: number;
  url?: string;
};

export default function TutorialStep() {
  const params = useParams();
  const router = useRouter();
  const tutorialId = params.tutorialId as string;
  const stepId = parseInt(params.stepId as string);
  const [tutorialProgress, setTutorialProgress] = useState<TutorialProgress>({});
  const [isStepCompleted, setIsStepCompleted] = useState(false);

  const tutorial = tutorialSections[tutorialId as keyof typeof tutorialSections];
  const step = tutorial?.steps[stepId];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("osl-tutorial-progress");
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setTutorialProgress(progress);
      setIsStepCompleted(progress[tutorialId]?.completedSteps > stepId);
    }
  }, [tutorialId, stepId]);

  useEffect(() => {
    // Save progress to localStorage whenever it changes
    if (Object.keys(tutorialProgress).length > 0) {
      localStorage.setItem("osl-tutorial-progress", JSON.stringify(tutorialProgress));
    }
  }, [tutorialProgress]);

  const markStepCompleted = () => {
    setTutorialProgress(prev => ({
      ...prev,
      [tutorialId]: {
        ...prev[tutorialId],
        completedSteps: Math.max(prev[tutorialId]?.completedSteps || 0, stepId + 1),
        currentStep: Math.min(stepId + 1, tutorial.steps.length - 1),
        totalSteps: tutorial.steps.length,
      }
    }));
    setIsStepCompleted(true);
  };

  const navigateToStep = (newStepId: number) => {
    router.push(`/hardware/tutorials/${tutorialId}/${newStepId}`);
  };

  if (!tutorial || !step) {
    return (
      <div className="min-h-screen pt-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Step Not Found</h1>
          <Link
            href="/hardware/tutorials"
            className="bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors"
          >
            Back to Tutorials
          </Link>
        </div>
      </div>
    );
  }

  const progress = tutorialProgress[tutorialId];
  const progressPercentage = progress ? Math.round(((stepId + 1) / progress.totalSteps) * 100) : 0;

  return (
    <div className="min-h-screen pt-12">
      <PageHero 
        title={
          <>
            {tutorial.title}{" "}
            <span className="font-bold italic">Step {stepId + 1}</span>
          </>
        }
        description={step.title}
        className="pb-8"
      />

      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href={`/hardware/tutorials/${tutorialId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {tutorial.title}
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Step {stepId + 1} of {tutorial.steps.length}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[var(--light-green)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Video Section */}
          {step.videoUrl && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Video Tutorial</h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={step.videoUrl}
                  title={`${step.title} Video Tutorial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Parts Required */}
            {step.partsRequired.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-medium text-gray-900">Parts Required</h2>
                </div>
                <div className="space-y-3">
                  {step.partsRequired.map((part, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{part.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {part.quantity}</p>
                      </div>
                      {(part as PartWithOptionalUrl).url && (
                        <Link
                          href={(part as PartWithOptionalUrl).url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 p-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools Required */}
            {step.toolsRequired.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-medium text-gray-900">Tools Required</h2>
                </div>
                <div className="space-y-2">
                  {step.toolsRequired.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-900">{typeof tool === 'string' ? tool : tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screws Required */}
            {step.screwsRequired.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-gray-600" />
                  <h2 className="text-xl font-medium text-gray-900">Screws Required</h2>
                </div>
                <div className="space-y-3">
                  {step.screwsRequired.map((screw, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{screw.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {screw.quantity}</p>
                      </div>
                      {(screw as ScrewWithOptionalUrl).url && (
                        <Link
                          href={(screw as ScrewWithOptionalUrl).url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 p-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-medium text-gray-900">Instructions</h2>
            </div>
            <div className="space-y-4">
              {step.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-[var(--light-green)] text-black rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <p className="text-gray-900 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {step.notes && step.notes.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <div className="flex items-center gap-2 mb-4">
                <StickyNote className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl font-medium text-amber-900">Important Notes</h2>
              </div>
              <div className="space-y-3">
                {step.notes.map((note, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-900 leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              {stepId > 0 && (
                <button
                  onClick={() => navigateToStep(stepId - 1)}
                  className="flex items-center gap-2 text-black border border-black hover:bg-[var(--light-blue)] hover:text-black rounded-lg px-6 py-3 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {!isStepCompleted ? (
                <button
                  onClick={markStepCompleted}
                  className="flex items-center gap-2 bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Complete
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[var(--light-green)]">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Completed</span>
                </div>
              )}

              {stepId < tutorial.steps.length - 1 && (
                <button
                  onClick={() => navigateToStep(stepId + 1)}
                  className="flex items-center gap-2 bg-[var(--light-green)] text-black border hover:bg-[var(--light-blue)] rounded-lg px-6 py-3 font-medium transition-colors"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 