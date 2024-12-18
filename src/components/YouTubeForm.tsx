import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
	username: string;
	email: string;
	channel: string;
	social: {
		facebook: string;
		twitter: string;
	};
	phoneNumbers: string[];
	phNumbers: {
		number: string;
	}[];
	age: number;
	dob: Date;
};

export default function YouTubeForm() {
	const { register, control, handleSubmit, formState, getValues, reset } =
		useForm<FormValues>({
			defaultValues: {
				username: "",
				email: "",
				channel: "",
				social: {
					facebook: "",
					twitter: "",
				},
				phoneNumbers: ["", ""],
				phNumbers: [{ number: "" }],
				age: 0,
				dob: new Date(),
			},
			mode: "all"
		});
	const { errors, isDirty, isValid, isSubmitted } = formState;
	// console.log("isDirty-", isDirty, "isValid-", isValid);

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	const { fields, append, remove } = useFieldArray({
		name: "phNumbers",
		control,
	});

	useEffect(() => {
		if (isSubmitted) {
			reset()
		}
	}, [isSubmitted, reset])

	// useEffect(() => {
	// 	const subscription = watch((value) => {
	// 		console.log(value);

	// 		return () => subscription.unsubscribe();
	// 	});
	// }, [watch]);

	const handleGetValues = () => {
		console.log(getValues("username"));
	};

	const onError = (errors: FieldErrors<FormValues>) => {
		console.log("ERRORS",errors);
	};

	renderCount++;
	return (
		<div>
			<h1>YouTube Form {renderCount / 2}</h1>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				{/* username */}
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: "Username is required",
						})}
					/>
					<p className="error">{errors.username?.message}</p>
				</div>

				{/* email */}
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value:
									/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: "Email is not valid",
							},
							validate: {
								notAdmin: (fieldValue) => {
									return (
										fieldValue !== "admin@example.com" ||
										"Enter a different email address"
									);
								},
								blackListedDomain: (fieldValue) => {
									return (
										!fieldValue.endsWith("baddomain.com") ||
										"This domain is not supported"
									);
								},
								
							},
						})}
					/>
					<p className="error">{errors.email?.message}</p>
				</div>

				{/* channel */}
				<div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", {
							required: "Channel name is required",
						})}
					/>
					<p className="error">{errors.channel?.message}</p>
				</div>

				{/* Facebook */}
				<div className="form-control">
					<label htmlFor="facebook">Facebook</label>
					<input
						type="text"
						id="facebook"
						{...register("social.facebook", {
							required: "Enter your fb username",
						})}
					/>
					<p className="error">{errors.social?.facebook?.message}</p>
				</div>

				{/* Twitter */}
				<div className="form-control">
					<label htmlFor="twitter">Twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter", {
							required: "Enter your Twitter username",
						})}
					/>
					<p className="error">{errors.social?.twitter?.message}</p>
				</div>

				{/* Primary phone number */}
				<div className="form-control">
					<label htmlFor="primary-phone">Primary Phone Number</label>
					<input
						type="text"
						id="primary-phone"
						{...register("phoneNumbers.0", {
							required: "Phone number should not be empty",
						})}
					/>
				</div>

				{/* Secondary phone number */}
				<div className="form-control">
					<label htmlFor="secondary-phone">Secondary Phone Number</label>
					<input
						type="text"
						id="secondary-phone"
						{...register("phoneNumbers.1")}
					/>
				</div>

				{/* List of phone numbers */}
				<div>
					<label>List of Phone Numbers</label>
					<div>
						{fields.map((field, index) => (
							<div className="form-control" key={field.id}>
								<input type="text" {...register(`phNumbers.${index}.number`)} />
								{index > 0 && (
									<button type="button" onClick={() => remove(index)}>
										Remove
									</button>
								)}
							</div>
						))}
						<button type="button" onClick={() => append({ number: "" })}>
							Add Phone Number
						</button>
					</div>
				</div>

				{/* Numeric */}
				<div className="form-control">
					<label htmlFor="age">Age</label>
					<input
						type="number"
						id="age"
						{...register("age", {
							valueAsNumber: true,
							required: {
								value: true,
								message: "Age is required",
							},
						})}
					/>
					<p className="error">{errors.age?.message}</p>
				</div>

				{/* Date of birth */}
				<div className="form-control">
					<label htmlFor="dob">Date of Birth</label>
					<input
						type="date"
						id="dob"
						{...register("dob", {
							valueAsDate: true,
							required: {
								value: true,
								message: "Date of birth is required",
							},
						})}
					/>
					<p className="error">{errors.dob?.message}</p>
				</div>

				<button disabled={!isDirty || !isValid}>Submit</button>
				<button type="button" onClick={handleGetValues}>
					Get Values
				</button>
			</form>
			<DevTool control={control} />
		</div>
	);
}

/**
 * 	defaultValues: async () => {
 * 
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/users/1"
			);

			const data = await response.json();
			return {
				username: data.name,
				email: data.email,
				channel: data.website,
			};
		},
 */
