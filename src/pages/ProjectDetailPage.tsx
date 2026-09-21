import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Quote,
  ArrowRight
} from 'lucide-react';
import projectsData from '../data/projects.json';
import { Project } from '../types/project';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { ImageViewer } from '../components/common/ImageViewer';
import { onImageErrorWithFallback } from '../utils/imageFallback';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeViewerImage, setActiveViewerImage] = useState<number | null>(null);

  const project = projectsData.find((p) => p.slug === slug) as Project | undefined;

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl font-bold text-forest-950">Project Not Found</h2>
        <p className="text-sm text-charcoal-400 mt-2">The requested project study could not be located.</p>
        <Link
          to="/projects"
          className="mt-6 px-6 py-3 rounded-xl bg-copper-500 text-white font-bold text-xs uppercase"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.heroImage];

  return (
    <div className="pt-20 pb-28 min-h-screen bg-cream-50 text-charcoal-800">
      {/* Back Button Bar */}
      <div className="bg-forest-950/90 border-b border-cream-200/10 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-copper-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
          <span className="text-xs text-charcoal-300 font-mono hidden sm:inline">
            Project Ref: {project.id.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Hero Image Banner with Zoom Trigger */}
      <div className="relative h-[45vh] sm:h-[60vh] w-full bg-forest-950 overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover filter brightness-95"
          loading="eager"
          onError={(e) => onImageErrorWithFallback(e)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />

        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/80 text-copper-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-2">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.designStyle}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-cream-50">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-xs sm:text-sm text-cream-200/90 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-copper-400" />
                {project.location}
              </span>
              <span>•</span>
              <span className="font-mono text-copper-300 font-semibold">{project.area}</span>
              <span>•</span>
              <span>Client: {project.client}</span>
            </div>
          </div>

          <button
            onClick={() => setActiveViewerImage(0)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-glow-copper transition-all self-start sm:self-auto"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Pinch-Zoom Gallery ({galleryImages.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Narrative, Case Details, Before/After & Gallery */}
          <div className="lg:col-span-8 space-y-12">
            {/* Project Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-forest-950 mb-3">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-light">
                {project.overview}
              </p>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-cream-200">
                <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-forest-950 mb-2">
                    The Architectural Challenge
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{project.challenge}</p>
                </div>
                <div className="p-4 rounded-2xl bg-forest-900/5 border border-copper-500/20">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-copper-600 mb-2">
                    Shree Shyam Solution
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{project.solution}</p>
                </div>
              </div>
            </div>

            {/* Before / After Transformation */}
            {project.beforeImage && project.afterImage && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-copper-600">
                      Visual Comparison
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-forest-950">
                      Before & After Transformation
                    </h2>
                  </div>
                  <span className="text-xs text-charcoal-400 hidden sm:inline">
                    Drag the center handle to slide
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    beforeLabel="Before: Bare Site"
                    afterLabel="After: Handover State"
                    className="h-[320px] sm:h-[440px] w-full"
                  />
                </div>
              </div>
            )}

            {/* Photo Gallery Grid with Pinch-Zoom */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-copper-600">
                    High-Res Visuals
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-forest-950">
                    Complete Photo Gallery
                  </h2>
                </div>
                <span className="text-xs text-charcoal-400">Tap any photo to zoom</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveViewerImage(idx)}
                    className="relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`${project.title} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                      onError={(e) => onImageErrorWithFallback(e)}
                    />
                    <div className="absolute inset-0 bg-forest-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote */}
            {project.testimonial && (
              <div className="bg-forest-950 text-cream-100 rounded-3xl p-6 sm:p-8 border border-copper-500/30 relative overflow-hidden">
                <Quote className="w-12 h-12 text-copper-400/20 absolute right-6 top-6" />
                <p className="text-sm sm:text-base italic leading-relaxed text-cream-200 font-light">
                  "{project.testimonial.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {project.testimonial.avatar && (
                    <img
                      src={project.testimonial.avatar}
                      alt={project.testimonial.author}
                      className="w-10 h-10 rounded-full object-cover border-2 border-copper-400"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-sm text-cream-50">
                      {project.testimonial.author}
                    </h4>
                    <p className="text-xs text-copper-300">
                      {project.testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Project Meta Sidebar & Consultation Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft space-y-5">
              <h3 className="font-serif font-bold text-lg text-forest-950 border-b border-cream-200 pb-3">
                Project Key Specs
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Category:</span>
                  <span className="font-bold text-forest-950">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Total Area:</span>
                  <span className="font-mono font-bold text-forest-950">{project.area}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Turnaround Time:</span>
                  <span className="font-bold text-forest-950">{project.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Budget Range:</span>
                  <span className="font-mono font-bold text-copper-600">{project.budgetRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Year Completed:</span>
                  <span className="font-bold text-forest-950">{project.year}</span>
                </div>
              </div>

              {/* Materials Certified Used */}
              <div className="pt-4 border-t border-cream-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-copper-600 mb-2.5">
                  Materials Deployed:
                </h4>
                <ul className="space-y-1.5 text-xs text-charcoal-600">
                  {project.materialsUsed.map((mat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-copper-500 shrink-0 mt-0.5" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation CTA Card */}
              <div className="pt-4 border-t border-cream-200 space-y-3">
                <Link
                  to="/site-visit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-copper-500 hover:bg-copper-600 text-white text-xs font-bold uppercase tracking-wider shadow-glow-copper transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/quote"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-forest-900 text-cream-100 hover:bg-forest-800 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>Calculate Similar Estimate</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Pinch-Zoom Image Viewer */}
      {activeViewerImage !== null && (
        <ImageViewer
          isOpen={true}
          images={galleryImages}
          initialIndex={activeViewerImage}
          title={project.title}
          onClose={() => setActiveViewerImage(null)}
        />
      )}
    </div>
  );
};
