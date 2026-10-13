/*
  RESULT<T, E>: A GENERIC TYPE FOR "THIS CAN FAIL"

  `throw` is invisible in a function's type: `function load(): Progress`
  says nothing about the three ways loading can go wrong. A Result puts the
  failure IN the return type, so the caller can't forget to handle it:

      const result = parseStoredProgress(raw)
      result.value          // ✗ compile error: might be the error case
      if (result.ok) result.value   // ✓ narrowed to the success case

  It is a discriminated union on `ok` (true | false), the same pattern as
  Lesson's `kind`.

  T and E are TYPE PARAMETERS: placeholders filled in at each use, e.g.
  Result<CourseOutline, OutlineError> or Result<ProgressState, LoadProblem>.
  One definition, any success type, any error type.
*/
export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value })
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error })

// `never` above means "this side can't happen": ok() returns a Result whose
// error type is empty, which TypeScript can widen to any Result<T, E>.
