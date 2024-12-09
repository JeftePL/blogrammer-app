import { useState, useCallback } from 'react'

type FormValues = Record<string, string>
type FormErrors = Record<string, string>
type ValidateFunction = (values: FormValues) => FormErrors

export default function useForm({
	initialValues,
	validate,
	onChange,
}: {
	initialValues: FormValues
	validate: ValidateFunction
	onChange: () => void
}) {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState<FormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target
			setValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}))
			onChange()
		},
		[onChange],
	)

	const handleSubmit = useCallback(
		(onSubmit: () => Promise<void>) => {
			return async (event: React.FormEvent<HTMLFormElement>) => {
				event.preventDefault()
				setIsSubmitting(true)
				const validationErrors = validate(values)
				setErrors(validationErrors)
				if (Object.keys(validationErrors).length === 0) {
					await onSubmit()
				}
				setIsSubmitting(false)
			}
		},
		[validate, values],
	)

	const reset = useCallback(() => {
		setValues(initialValues)
		setErrors({})
	}, [initialValues])

	return {
		values,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
		reset,
	}
}
