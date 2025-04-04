import PageContent from "./PageContent";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

export default function ContactPage() {
	const [state, handleSubmit] = useForm("movekkdr");

	return (
		<PageContent fixedSize>
			<div className="size-full px-2 sm:px-10 flex flex-col justify-between gap-5 text-slate-300">
				<form
					onSubmit={handleSubmit}
					className="max-h-[80%] w-full flex flex-col gap-5"
				>
					<input
						id="email"
						type="email"
						name="email"
						placeholder="Your email"
						className="h-14 p-4 rounded-lg border border-black/40 placeholder:text-slate-400 focus-visible:outline"
						required
					/>
					<ValidationError prefix="Email" field="email" errors={state.errors} />
					<textarea
						id="message"
						name="message"
						placeholder="Your message"
						className="h-52 min-h-14 p-4 rounded-lg border border-black/40 placeholder:text-slate-400 focus-visible:outline"
						required
					/>
					<ValidationError
						prefix="Message"
						field="message"
						errors={state.errors}
					/>
					<button
						type="submit"
						disabled={state.submitting}
						className="rounded-lg py-1 bg-cyan-600/60 cursor-pointer transition hover:bg-cyan-600/80"
					>
						Send
					</button>
					{state.succeeded && (
						<span className="mx-auto">Thanks for getting in touch!</span>
					)}
				</form>
				<div className="flex justify-evenly mb-10">
					<a
						href="https://github.com/micoo227"
						target="_blank"
						className="flex flex-col items-center gap-1"
					>
						<FaGithub className="size-10" />
						<span className="underline">GitHub</span>
					</a>
					<a
						href="https://www.linkedin.com/in/michael-r-589237245/"
						target="_blank"
						className="flex flex-col items-center gap-1"
					>
						<FaLinkedin className="size-10" />
						<span className="underline">LinkedIn</span>
					</a>
				</div>
			</div>
		</PageContent>
	);
}
