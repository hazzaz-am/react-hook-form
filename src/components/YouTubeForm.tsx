import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	username: string;
	email: string;
	channel: string;
};

export default function YouTubeForm() {
	const { register, control, handleSubmit, formState } = useForm<FormValues>();
	const { errors } = formState;

	const onSubmit = (data: FormValues) => {
		console.log(data);
	};

	return (
		<div>
			<h1>YouTube Form</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
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
										!fieldValue.endsWith("baddomain.com") || "This domain is not supported"
									)
								}
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

				<button>Submit</button>
			</form>
			<DevTool control={control} />
		</div>
	);
}
