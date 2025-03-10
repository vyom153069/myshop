import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	//Getting token and user information from localStorage of client's browser
	const { token, user } = isAuthenticated();

	const goBackButton = () => {
		return (
			<div>
				<Link className="btn btn-info rounded" to="/admin/dashboard">
					Admin Home
				</Link>
			</div>
		);
	};

	//Sets data in the states according to the input fields
	const handleChange = (event) => {
		setName(event.target.value);
		setError(false);
		setSuccess(false);
	};

	//Submits the addCategoryForm form and gets the response from the backend
	const formSubmit = (event) => {
		event.preventDefault();
		setError("");
		setSuccess(false);

		//Backend request fired
		createCategory(user._id, token, { name })
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setSuccess(true);
					setError("");
					setName("");
				}
			})
			.catch((err) => console.log("Error in formSubmit!", err));
	};

	//Signup success message popup
	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Collection Created Successfuly</h4>;
		}
	};

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="text-danger">
					<h4>Collection Creation Failed!</h4>
					<p>{error}</p>
				</div>
			);
		}
	};

	//Create Category form component
	const addCategoryForm = () => {
		return (
			<form>
				<div className="form-group">
					<label className="lead">Enter Category Name</label>
					<input
						type="text"
						className="form-control my-3"
						autoFocus
						placeholder="For Ex. Summer"
						onChange={handleChange}
						value={name}
						required
					/>
					<button onClick={formSubmit} className="btn btn-info">
						Create Category
					</button>
				</div>
			</form>
		);
	};

	return (
		<Base
			title="Add Product Category"
			description="Create a new product category for TShirts"
			className="container bg-white rounded p-4"
		>
			<div className="row rounded">
				<div className="col-md-2">{goBackButton()}</div>
				<div className="col-md-8 my-3">
					{addCategoryForm()}
					{successMessage()}
					{errorMessage()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
