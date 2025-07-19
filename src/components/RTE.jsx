import MDEditor from "@uiw/react-md-editor";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
	return (
		<div className="w-full">
			{label && <label className="inline-block mb-1 pl-1">{label}</label>}
			<Controller
				name={name || "content"}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { onChange, value } }) => (
					<div className="border border-gray-300 rounded-md shadow-sm">
						<MDEditor
							value={value}
							onChange={onChange}
							height={500}
							preview="edit"
							className="!bg-white"
						/>
					</div>
				)}
			/>
		</div>
	);
}
