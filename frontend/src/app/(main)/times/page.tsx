import Time from '@/components/Time';

export default function Times() {
	return (
		<div className="flex flex-col items-center h-fit w-5/6 max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl">
			<div className="flex flex-col items-start gap-10">
				<h1 className="text-3xl font-bold">Times</h1>
				<div className="flex flex-col gap-8">
					<Time />
					<Time />
					<Time />
				</div>
			</div>
		</div>
	);
}
