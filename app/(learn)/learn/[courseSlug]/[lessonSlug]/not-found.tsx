import { NotFoundPanel } from '@/components/states/not-found-panel'

// Rendered INSIDE the course layout, so the outline is still there to pick a real lesson.
export default function LessonNotFound() {
  return <NotFoundPanel title="Lesson not found">This course has no lesson at that address. Pick one from the course outline.</NotFoundPanel>
}
