import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	// Do not rename the login function below as "handleSubmit" because it is a reserved name in react-hook-form. Though the purpose of this function is to handle the form submission. Here we will pass this login function to the handleSubmit method of react-hook-form where handleSubmit is wroking as a wrapper function to handle the form submission.
	// The handleSubmit function will call the login function with the form data.
	// The login function will then call the authService.login method to authenticate the user.
	// If the authentication is successful, it will dispatch the authLogin action with the session data
	// and navigate to the home page.
	const login = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				dispatch(authLogin(session));
				navigate("/");
			} else {
				setError("Login failed. Please check your credentials.");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}
				<form onSubmit={handleSubmit(login)} className="mt-8">
					<div className="space-y-5">
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
											value
										) ||
										"Email address must be a valid address",
								},
							})}
						/>
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full">
							Sign in
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
