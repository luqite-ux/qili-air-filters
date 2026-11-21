import { AirflowStory } from '@/components/home/airflow-story'
import { SectionHeading } from '@/components/layout/section-heading'
import { Reveal } from '@/components/motion/reveal'
import type { HomeContent } from '@/lib/content/home'

export function AirflowSection({ layers }: { layers: HomeContent['airflowLayers'] }) {
  return (
    <section aria-labelledby="airflow-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="lab-grid absolute inset-0" />
      <div className="container-x relative">
        <SectionHeading eyebrow="How layered filtration works" title={<span id="airflow-title">Air moves through stages, each finer than the last</span>}>
          Coarse dust is caught first so finer media stays effective. Select a stage to see what it holds back.
        </SectionHeading>
        <Reveal variant="scale" className="mt-12">
          <AirflowStory layers={layers} />
        </Reveal>
      </div>
    </section>
  )
}
