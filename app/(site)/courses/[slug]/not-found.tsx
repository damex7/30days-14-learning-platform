import { NotFoundPanel } from '@/components/states/not-found-panel'

// Shown when getCourseOutline() returns null and the page calls notFound().
export default function CourseNotFound() {
  return <NotFoundPanel title="Course not found">We couldn’t find that course. It may have been renamed or removed.</NotFoundPanel>
}
